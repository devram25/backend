import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
   const path  =  request.nextUrl.pathname

   const isPublic = path === "/login" || path === "/signup"

   const token  = request.cookies.get("token")?.value || ""

   if(isPublic && token){
     return NextResponse.redirect( new URL("/", request.nextUrl) )
   }
}
 
 
export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/**",
    "/login",
    "/signup"
  ]
}