"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircleIcon, MailIcon, ArrowRightIcon, CheckCircle2Icon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

// Separate component to handle URL parameters
function UrlParamsHandler({ 
  onParamsReady, 
}: { 
  onParamsReady: (token: string | null, email: string | null) => void 
}) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Extract token and email from URL
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    // Call the callback with the params
    onParamsReady(token, email);
  }, [searchParams, onParamsReady]);
  
  return null;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle URL parameters from the UrlParamsHandler
  const handleParamsReady = (receivedToken: string | null, receivedEmail: string | null) => {
    setToken(receivedToken);
    setEmail(receivedEmail);
    
    // Auto-verify if token is present
    if (receivedToken) {
      verifyEmail(receivedToken);
    }
  };

  // Check if user is already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Already signed in, redirect to dashboard
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  // Function to verify email
  const verifyEmail = async (verificationToken: string) => {
    setVerificationStatus('loading');
    setErrorMessage(null);
    
    try {
      // In a real app, this would call your API endpoint
      // await fetch('/api/auth/verify-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: verificationToken }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setVerificationStatus('success');
      
      // Redirect to sign-in after success (in a real app)
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } catch (error) {
      console.error('Error verifying email:', error);
      setVerificationStatus('error');
      setErrorMessage('Failed to verify your email. Please try again or contact support.');
    }
  };
  
  // Function to resend verification email
  const resendVerificationEmail = async (emailAddress: string) => {
    setResendStatus('loading');
    setErrorMessage(null);
    
    try {
      // In a real app, this would call your API endpoint
      // await fetch('/api/auth/resend-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: emailAddress }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setResendStatus('success');
      toast.success('Verification email sent successfully!');
    } catch (error) {
      console.error('Error resending verification email:', error);
      setResendStatus('error');
      setErrorMessage('Failed to resend verification email. Please try again or contact support.');
      toast.error('Failed to send verification email');
    }
  };
  
  // If no token or email provided, show manual verification form
  const showManualForm = !token || verificationStatus === 'error';
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            {token 
              ? 'We are verifying your email address' 
              : 'Please verify your email address to continue'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* URL Parameter Handling */}
          <Suspense fallback={<div>Loading parameters...</div>}>
            <UrlParamsHandler onParamsReady={handleParamsReady} />
          </Suspense>
          
          {/* Verification Status States */}
          {verificationStatus === 'loading' && (
            <div className="text-center py-8">
              <LoaderIcon className="h-12 w-12 mx-auto animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="text-center py-8">
              <CheckCircle2Icon className="h-12 w-12 mx-auto text-green-500" />
              <p className="mt-4 text-gray-600">Email verified successfully!</p>
              <p className="mt-2 text-gray-500">Redirecting you to sign in...</p>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="text-center py-4">
              <AlertCircleIcon className="h-12 w-12 mx-auto text-red-500" />
              <p className="mt-4 text-red-600">{errorMessage || 'Verification failed'}</p>
              <p className="mt-2 text-gray-500">Please try again or request a new verification link</p>
            </div>
          )}
          
          {/* Manual Verification Form */}
          {showManualForm && verificationStatus !== 'loading' && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  placeholder="Enter your email address" 
                  type="email" 
                  value={email || ''} 
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={resendStatus === 'loading'}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => email && resendVerificationEmail(email)}
                disabled={!email || resendStatus === 'loading'}
              >
                {resendStatus === 'loading' ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MailIcon className="mr-2 h-4 w-4" /> 
                    Resend Verification Email
                  </>
                )}
              </Button>
              
              {resendStatus === 'success' && (
                <p className="text-sm text-green-500 mt-2">
                  A new verification email has been sent. Please check your inbox.
                </p>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <Link href="/sign-in" className="text-sm text-blue-600 hover:underline flex items-center">
            Return to sign in <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
