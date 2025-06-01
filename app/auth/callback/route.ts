import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  console.log("code", code)

  if (code) {
    console.log("test inside if")
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  console.log("test redirecting to dashboard")
  // URL to redirect to after sign in process completes
  // return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
} 