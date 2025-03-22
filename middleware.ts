import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/resumes',
  '/profile',
  '/settings',
];

// Paths that should redirect to dashboard if user is authenticated
const authPaths = [
  '/login',
  '/signup',
  '/forgot-password',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the path is an auth path
  const isAuthPath = authPaths.some(path => pathname === path);
  
  // If there's no token and the path is protected, redirect to login
  if (!token && isProtectedPath) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // If there's a token, verify it
  if (token) {
    try {
      // Verify the token
      verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
      
      // If token is valid and user is on an auth page, redirect to dashboard
      if (isAuthPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If token verification fails, remove the invalid token
      if (isProtectedPath) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth-token');
        return response;
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Matcher for routes that should run the middleware
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (SEO files)
     */
    '/((?!api|_next|static|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}; 