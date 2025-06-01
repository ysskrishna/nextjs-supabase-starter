"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { signInSchema, signUpSchema } from "@/lib/validations"


export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  // Validate the form data
  const result = signInSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map(err => err.message).join(", ")
    redirect(`/signin?error=${encodeURIComponent(errors)}`)
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/signin?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  // Validate the form data
  const result = signUpSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map(err => err.message).join(", ")
    redirect(`/signup?error=${encodeURIComponent(errors)}`)
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect("/signup?error=Could not create account")
  }

  revalidatePath("/", "layout")
  redirect("/signin?message=Check your email to confirm your account")
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    redirect("/signin?error=Could not authenticate with Google")
  }

  if (data.url) {
    redirect(data.url)
  }
}


export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/signin")
}