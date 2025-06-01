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

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    },
  })

  if (error) {
    throw error
  }

  if (data?.url) {
    redirect(data.url)
  }

  return data
}


export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/signin")
}