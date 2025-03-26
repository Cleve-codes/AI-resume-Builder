"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Define the user type
export interface User {
  id: string;
  email: string;
  name: string | null;
  profileImage: string | null;
  jobTitle: string | null;
  emailVerified: boolean;
}

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  error: string | null;
  setUser: (user: User | null) => void; // Added for Google Auth
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/resumes',
  '/settings',
  '/profile',
];

// List of routes that should never check auth status on load
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/about',
  '/features',
  '/pricing',
];

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current route is a protected route
  const isProtectedRoute = () => {
    if (!pathname) return false;
    return protectedRoutes.some(route => pathname.startsWith(route));
  };

  // Check if the current route is a public route
  const isPublicRoute = () => {
    if (!pathname) return false;
    return publicRoutes.some(route => pathname === route);
  };

  // Check if the user is logged in on mount, but only for relevant routes
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      // Skip auth check for public routes on initial load
      if (isPublicRoute() && !initialCheckDone) {
        console.log('Skipping auth check for public route:', pathname);
        setIsLoading(false);
        setInitialCheckDone(true);
        return;
      }

      try {
        console.log('Checking user authentication status...');
        const res = await fetch('/api/auth/me');
        console.log('Auth check response:', res.status);
        
        if (!res.ok) {
          // For 401 errors, don't log as error on non-protected routes
          if (res.status === 401 && !isProtectedRoute()) {
            console.log('User not authenticated (expected for public route)');
          } else {
            console.error(`Auth check failed with status ${res.status}`);
          }
          
          // Clear any invalid auth tokens
          if (res.status === 401) {
            console.log('Clearing invalid auth token');
            document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          }
          
          // If on a protected route and not authenticated, redirect to login
          if (isProtectedRoute()) {
            router.push('/login');
          }
          
          setUser(null);
          setIsLoading(false);
          setInitialCheckDone(true);
          return;
        }
        
        const data = await res.json();
        console.log('Auth check successful, user data received');
        
        // If user is authenticated but trying to access login/signup pages, redirect to home
        if ((pathname === '/login' || pathname === '/signup') && data.user) {
          console.log('User already authenticated, redirecting to home');
          router.push('/');
          setUser(data.user);
          setIsLoading(false);
          setInitialCheckDone(true);
          return;
        }
        
        // Check if email is verified for protected routes
        if (isProtectedRoute() && !data.user.emailVerified) {
          console.log('User email not verified, redirecting to verification page');
          router.push('/verify-email?email=' + encodeURIComponent(data.user.email));
          setUser(data.user);
          setIsLoading(false);
          setInitialCheckDone(true);
          return;
        }
        
        setUser(data.user);
      } catch (err) {
        console.error('Failed to check authentication status:', err);
        setUser(null);
        
        // Clear any invalid auth tokens
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // If on a protected route, redirect to login on error
        if (isProtectedRoute()) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
        setInitialCheckDone(true);
      }
    };

    // Always check user login status for all routes
    checkUserLoggedIn();
  
  }, [pathname, initialCheckDone, router]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Set user in state
      setUser(data.user);
      
      // Get callback URL from URL parameters if it exists
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get('callbackUrl');
      
      console.log('Login successful, redirecting to', callbackUrl || '/dashboard');
      
      // Use window.location for most reliable redirection
      const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : '/dashboard';
      
      // Force direct browser navigation for most reliable redirect
      window.location.href = redirectUrl;
      
      return data.user;
    } catch (err) {
      console.error('Login error:', err instanceof Error ? { message: err.message, name: err.name } : err);
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending registration request to API...');
      
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Registration API error:', {
          status: res.status,
          statusText: res.statusText,
          data
        });
        
        throw new Error(data.error || data.details || 'Registration failed');
      }

      console.log('Registration successful, redirecting to verification page');
      
      // Redirect to verify email page instead of login
      router.push('/verify-email?email=' + encodeURIComponent(email));
      return data.user;
    } catch (err) {
      console.error('Registration error:', err);
      
      // Enhanced error details
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
      } else if (err instanceof Response) {
        console.error('Response error:', {
          status: err.status,
          statusText: err.statusText
        });
      }
      
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification email function
  const resendVerification = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      return data;
    } catch (err) {
      console.error('Resend verification error:', err instanceof Error ? { message: err.message, name: err.name } : err);
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify email');
      }

      // If user is already logged in, update their state
      if (user) {
        setUser({
          ...user,
          emailVerified: true
        });
      }

      return data;
    } catch (err) {
      console.error('Email verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      resendVerification,
      verifyEmail,
      error,
      setUser // Expose setUser for Google Auth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 