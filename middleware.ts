import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Remove jsonwebtoken import which isn't compatible with Edge Runtime
// import { verify } from 'jsonwebtoken';

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
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  
  console.log(`[Middleware] Processing: ${pathname}, Token exists: ${!!token}`);
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Check if the path is an auth path
  const isAuthPath = authPaths.some(path => pathname === path);
  
  // Support for callback URLs for redirection after login
  const callbackUrl = searchParams.get('callbackUrl');
  
  if (isProtectedPath) {
    console.log(`[Middleware] Protected path detected: ${pathname}`);
  }
  
  if (isAuthPath) {
    console.log(`[Middleware] Auth path detected: ${pathname}`);
  }
  
  // If there's no token and the path is protected, redirect to login
  if (!token && isProtectedPath) {
    console.log('[Middleware] No token, redirecting to login');
    const url = new URL('/login', request.url);
    // Set a callback URL to redirect back after login
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // If there's a token, we'll consider it valid for middleware purposes
  // The actual verification will happen server-side in the API routes
  if (token) {
    console.log('[Middleware] Token exists (assuming valid for middleware)');
    
    // If token exists and user is on an auth page, redirect to dashboard
    // or to the callback URL if provided
    if (isAuthPath) {
      const redirectUrl = callbackUrl ? decodeURI(callbackUrl) : '/dashboard';
      console.log(`[Middleware] Redirecting authenticated user to: ${redirectUrl}`);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }
  
  console.log('[Middleware] Continuing to requested route');
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