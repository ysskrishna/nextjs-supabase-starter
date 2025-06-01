import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: any) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (Supabase OAuth/callback)
     * - api/auth (Supabase API auth callback)
     * - any other static/image assets
     */
    "/((?!_next/static|_next/image|favicon.ico|auth|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
