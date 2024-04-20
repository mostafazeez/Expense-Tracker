import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 

const protectedRoutes = ['/dashboard','/dashboard/add-expenses','/dashboard/report']
const publicRoutes = ['/login', '/register', '/','/main']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('token')?.value
   
 const cookieInReq=req.headers.get('cookie')?.split(';');
 const token=cookieInReq[cookieInReq?.length-1].trim();

 const isTokenValid = token===`token=${cookie}`

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isTokenValid) {
    return NextResponse.redirect(new URL('/main', req.url))
  }
 
//   // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    isTokenValid &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: [ '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}