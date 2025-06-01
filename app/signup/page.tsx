import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SignUpForm from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-16">
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
