"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useClerk, useAuth as useClerkAuth } from '@clerk/nextjs';
import { toast } from 'sonner';

// Define the user type (matching the old auth context)
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
  setUser: (user: User | null) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider that wraps Clerk functionality in an interface matching the old auth context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [compatUser, setCompatUser] = useState<User | null>(null);
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const { isLoaded: authIsLoaded, signOut } = useClerkAuth();
  const clerk = useClerk();
  const router = useRouter();
  
  // Transform Clerk user to compatibility user
  useEffect(() => {
    if (clerkIsLoaded && clerkUser) {
      const primaryEmail = clerkUser.primaryEmailAddress?.emailAddress;
      
      if (primaryEmail) {
        setCompatUser({
          id: clerkUser.id,
          email: primaryEmail,
          name: clerkUser.fullName,
          profileImage: clerkUser.imageUrl,
          jobTitle: null, // Clerk doesn't have this field
          emailVerified: clerkUser.primaryEmailAddress?.verification?.status === 'verified',
        });
      }
    } else if (clerkIsLoaded) {
      setCompatUser(null);
    }
  }, [clerkUser, clerkIsLoaded]);
  
  /**
   * Compatibility login function that uses Clerk
   */
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      // Use the client.signIn method from Clerk
      await clerk.client.signIn.create({
        identifier: email,
        password,
      });
      
      // Clerk handles the redirect to the success URL
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.errors?.[0]?.message || 'Failed to login');
      toast.error(err.errors?.[0]?.message || 'Failed to login');
    }
  };
  
  /**
   * Compatibility register function that uses Clerk
   */
  const register = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      // Use the client.signUp method from Clerk
      await clerk.client.signUp.create({
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        emailAddress: email,
        password,
      });
      
      // Clerk handles the redirect to the success URL and email verification
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.errors?.[0]?.message || 'Failed to register');
      toast.error(err.errors?.[0]?.message || 'Failed to register');
    }
  };
  
  /**
   * Compatibility logout function that uses Clerk
   */
  const logout = async () => {
    setError(null);
    try {
      await signOut();
      router.push('/');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.errors?.[0]?.message || 'Failed to logout');
    }
  };
  
  /**
   * Compatibility email verification function that uses Clerk
   * (Mostly a no-op as Clerk handles email verification differently)
   */
  const verifyEmail = async (token: string) => {
    // Clerk handles this differently, but we'll provide a compatibility method
    setError(null);
    toast.info('Email verification is now handled automatically');
    router.push('/dashboard');
  };
  
  /**
   * Compatibility resend verification function that uses Clerk
   * (Mostly a no-op as Clerk handles email verification differently)
   */
  const resendVerification = async (email: string) => {
    // Clerk handles this differently, but we'll provide a compatibility method
    setError(null);
    toast.info('Email verification is now handled automatically');
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: compatUser,
        isLoading: !authIsLoaded,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        error,
        setUser: setCompatUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use the auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.warn('useAuth must be used within an AuthProvider');
    // Return a minimal implementation to prevent crashes
    return {
      user: null,
      isLoading: false,
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      verifyEmail: async () => {},
      resendVerification: async () => {},
      error: null,
      setUser: () => {},
    };
  }
  return context;
} 