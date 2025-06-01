import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SignUpForm from "@/components/auth/sign-up-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="container relative flex items-center justify-center min-h-[80vh] px-4 py-16">
      <Button variant="ghost" size="icon" className="absolute left-4 top-4" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to home</span>
        </Link>
      </Button>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}
