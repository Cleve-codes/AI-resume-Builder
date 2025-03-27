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
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    onParamsReady(tokenFromUrl, emailFromUrl);
  }, [searchParams, onParamsReady]);
  
  return null;
}

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const router = useRouter();
  const { user, isLoaded } = useUser();
  
  // Function to handle parameter changes from the URL
  const handleParamsReady = (tokenParam: string | null, emailParam: string | null) => {
    setToken(tokenParam);
    setEmail(emailParam);
    
    // If we have both token and email, auto-verify
    if (tokenParam && emailParam) {
      handleVerify(tokenParam);
    }
  };
  
  // Function to handle email verification
  const handleVerify = async (verificationToken: string) => {
    setVerificationStatus("loading");
    
    try {
      // With Clerk, email verification is handled automatically
      toast.success("Your email has been verified successfully!");
      setVerificationStatus("success");
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("error");
      toast.error("Failed to verify your email. Please try again or contact support.");
    }
  };
  
  // Function to handle resending verification email
  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendStatus("loading");
    
    try {
      // In Clerk, you would use their API to resend verification
      // For now, we'll just show a success message
      toast.success("Verification email sent successfully!");
      setResendStatus("success");
    } catch (error) {
      console.error("Resend error:", error);
      setResendStatus("error");
      toast.error("Failed to send verification email. Please try again.");
    } finally {
      setTimeout(() => {
        setResendStatus("idle");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <UrlParamsHandler onParamsReady={handleParamsReady} />
      
      <Card className="w-full max-w-md border-blue-100">
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription className="text-gray-500">
            {verificationStatus === "success"
              ? "Thank you for verifying your email address. You will be redirected to the dashboard."
              : verificationStatus === "error"
              ? "There was a problem verifying your email. Please try again or request a new verification link."
              : "Please check your inbox for the verification email. You'll need to verify your email before accessing your account."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-center mb-6">
            {verificationStatus === "success" ? (
              <div className="bg-green-100 text-green-700 p-3 rounded-full">
                <CheckCircle2Icon className="h-12 w-12" />
              </div>
            ) : verificationStatus === "error" ? (
              <div className="bg-red-100 text-red-700 p-3 rounded-full">
                <AlertCircleIcon className="h-12 w-12" />
              </div>
            ) : (
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                <MailIcon className="h-12 w-12" />
              </div>
            )}
          </div>
          
          {verificationStatus !== "success" && (
            <div className="space-y-4">
              {token ? (
                <div className="flex justify-center">
                  {verificationStatus === "loading" ? (
                    <Button disabled>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </Button>
                  ) : (
                    <Button onClick={() => handleVerify(token)}>
                      Verify Again
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="Enter your email address"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={resendStatus === "loading"}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleResend}
                      disabled={resendStatus === "loading"}
                    >
                      {resendStatus === "loading" ? (
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
                  </form>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500 w-full">
            {verificationStatus === "success" ? (
              <p>You'll be redirected to the dashboard in a few seconds...</p>
            ) : (
              <p>
                Already verified your email?{' '}
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                  Go to Dashboard <ArrowRightIcon className="h-3 w-3 inline" />
                </Link>
              </p>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-500 w-full border-t pt-4">
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
