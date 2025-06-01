"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signIn, signInWithGoogle } from "@/app/auth/actions"
import { signInSchema } from "@/lib/validations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc"

export default function SignInForm() {
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleEmailSignIn = async (values: z.infer<typeof signInSchema>) => {
    setError(null)
    try {
      setIsEmailLoading(true)
      const { error } = await signIn(values.email, values.password)

      if (error) {
        throw error
      }
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign in")
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError(null)
    try {
      const { error } = await signInWithGoogle()

      if (error) {
        throw error
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google")
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(handleEmailSignIn)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isEmailLoading || isGoogleLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={isEmailLoading || isGoogleLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isEmailLoading || isGoogleLoading}>
          {isEmailLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>

      <div className="flex items-center">
        <Separator className="flex-1" />
        <span className="mx-4 text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isEmailLoading || isGoogleLoading}>
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
} 