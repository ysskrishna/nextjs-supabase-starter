import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Layout } from "lucide-react"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl space-y-8 text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Next.js + Supabase Starter
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern, responsive Next.js application with authentication and beautiful UI components.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/signin">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Shield className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
          <p className="text-muted-foreground">Built-in authentication with Supabase Auth and protected routes</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Zap className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Modern Stack</h3>
          <p className="text-muted-foreground">Next.js 14, TypeScript, and Tailwind CSS for the best developer experience</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Layout className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
          <p className="text-muted-foreground">Pre-built components and responsive design for a polished look</p>
        </div>
      </div>
    </div>
  )
}
