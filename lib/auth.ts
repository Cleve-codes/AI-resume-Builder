import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Type for decoded JWT token
export interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Get the current authenticated user from the cookie token in a Route Handler
 * This works in API routes with NextRequest
 */
export function getCurrentUserFromRequest(req: NextRequest): JwtPayload | null {
  try {
    const token = req.cookies.get('auth-token')?.value;
    
    if (!token) {
      return null;
    }
    
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Get the current user in a Server Component
 * Uses the headers() API which is supported in Server Components
 */
export async function getServerSideUser(): Promise<JwtPayload | null> {
  try {
    // Get the cookie header
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';
    const cookies = parseCookies(cookieHeader);
    
    const token = cookies['auth-token'];
    if (!token) {
      return null;
    }
    
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Server component to redirect unauthenticated users
 * Use this in layout.tsx or page.tsx files
 */
export async function requireAuth() {
  const user = await getServerSideUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}

/**
 * Server component to redirect authenticated users
 * Use this to prevent authenticated users from accessing
 * pages like login or register
 */
export async function redirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const user = await getServerSideUser();
  
  if (user) {
    redirect(redirectTo);
  }
}

// Helper function to parse cookies from a cookie header string
function parseCookies(cookieHeader: string): Record<string, string> {
  const list: Record<string, string> = {};
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    const trimmedName = name?.trim();
    
    if (!trimmedName) return;
    
    const value = rest.join('=').trim();
    if (!value) return;
    
    list[trimmedName] = decodeURIComponent(value);
  });
  
  return list;
} 