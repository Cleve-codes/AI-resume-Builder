import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up',
  '/sign-up/(.*)',
  '/api/webhook',
  '/api/webhook/(.*)',
  '/verify-email',
  '/verify-email/(.*)',
];

// Define admin routes that require admin privileges
const adminRoutes = [
  '/admin',
  '/admin/(.*)'
];

// Create route matchers
const isPublicRoute = createRouteMatcher(publicRoutes);
const isAdminRoute = createRouteMatcher(adminRoutes);

// Custom middleware function that builds upon Clerk's middleware
const customMiddleware = (req: NextRequest) => {
  const { userId } = req.auth;
  const path = req.nextUrl.pathname;
  
  // If the user is trying to access a protected route and is not authenticated
  if (!isPublicRoute(path) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // If the user is trying to access an admin route, check admin access
  if (isAdminRoute(path)) {
    return checkAdminAccess(req);
  }
  
  // Allow authenticated users to access protected routes
  return NextResponse.next();
};

async function checkAdminAccess(req: NextRequest) {
  const { userId } = req.auth;
  
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  try {
    // Check if user is admin
    const res = await fetch(`${req.nextUrl.origin}/api/auth/check-admin`, {
      headers: {
        'Cookie': req.headers.get('cookie') || '',
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to check admin status');
    }
    
    const { isAdmin } = await res.json();
    
    if (!isAdmin) {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    // Redirect to dashboard on any errors
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}

// Export the middleware with the custom function
export default clerkMiddleware({
  afterAuth: (auth, req) => {
    // Make auth available to the req object
    req.auth = auth;
    return customMiddleware(req);
  },
  publicRoutes
});

export const config = { 
  matcher: ['/((?!.*\\.|_next).*)', '/', '/(api|trpc)(.*)']
};