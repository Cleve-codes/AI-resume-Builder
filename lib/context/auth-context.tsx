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
}

// Define the auth context shape
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
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
          console.error(`Auth check failed with status ${res.status}`);
          
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
        setUser(data.user);
      } catch (err) {
        console.error('Failed to check authentication status:', err);
        setUser(null);
        
        // If on a protected route, redirect to login on error
        if (isProtectedRoute()) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
        setInitialCheckDone(true);
      }
    };

    if (!initialCheckDone || isProtectedRoute()) {
      checkUserLoggedIn();
    }
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
      console.error('Login error:', err);
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Instead of automatically logging in, redirect to login page
      // with a success message for better UX
      router.push('/login?registered=true');
      return data.user;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to register');
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
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, error }}>
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