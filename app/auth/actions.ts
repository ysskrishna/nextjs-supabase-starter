"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"


export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const data = {
    email: email,
    password: password,
  }

  return await supabase.auth.signInWithPassword(data)
}

export async function signUp(email: string, password: string) {
  const supabase = await createClient()

  const data = {
    email: email,
    password: password,
  }

  return await supabase.auth.signUp(data);
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

}


export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/signin")
}