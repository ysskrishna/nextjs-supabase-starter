
import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"


export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = await createClient()

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  console.log("MIDDLWARE before getUser", supabaseResponse)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log("MIDDLWARE user", user)

  // Protected routes
  const protectedRoutes = ["/dashboard"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  console.log("MIDDLWARE isProtectedRoute", isProtectedRoute)

  if (isProtectedRoute && !user) {
    // Redirect to signin if accessing protected route without authentication
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    return NextResponse.redirect(url)
  }
  
  console.log("MIDDLWARE with user", user)
  // Redirect authenticated users away from auth pages
  if (user && (request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup" || request.nextUrl.pathname === "/")) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  console.log("MIDDLWARE not matching any of the conditions", user)

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
