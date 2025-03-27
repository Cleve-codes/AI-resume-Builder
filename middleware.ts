import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhook",
  "/api/trpc",
  "/verify-email",
  "/terms",
  "/privacy",
  "/about",
  "/features",
  "/pricing",
  "/debug",
];

// Create a route matcher for public routes
const isPublicRoute = createRouteMatcher([
  ...publicRoutes.map(route => `${route}`),
  ...publicRoutes.map(route => `${route}(.*)`),
]);

// Use clerkMiddleware with afterAuth hook for custom logic
export default clerkMiddleware({
  afterAuth(auth, req) {
    // Allow public routes and authenticated users
    if (isPublicRoute(req) || auth.userId) {
      return NextResponse.next();
    }

    // Redirect unauthorized users to sign-in
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // exclude static files
    "/",                           // include root
    "/(api|trpc)(.*)",             // include api routes
  ],
};