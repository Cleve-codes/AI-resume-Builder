"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CircleCheckIcon, AlertCircleIcon, MailIcon, ArrowRightIcon, CheckCircle2Icon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, resendVerification, isLoading, user } = useAuth();
  
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  
  // Get the token and email from URL if present
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      // Auto-submit the token for verification
      handleVerifyToken(tokenFromUrl);
    }
    
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else if (user?.email) {
      setEmail(user.email);
    }
  }, [searchParams, user]);
  
  // Handle token verification
  const handleVerifyToken = async (tokenToVerify: string) => {
    try {
      setVerificationStatus("pending");
      await verifyEmail(tokenToVerify);
      setVerificationStatus("success");
      toast.success("Email verified successfully!");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to verify email");
      toast.error("Email verification failed", {
        description: error instanceof Error ? error.message : "Please try again or request a new verification link",
      });
    }
  };
  
  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      setIsResending(true);
      await resendVerification(email);
      toast.success("Verification email sent", {
        description: "Please check your inbox and spam folders",
        icon: <MailIcon className="h-5 w-5" />,
      });
    } catch (error) {
      toast.error("Failed to resend verification email", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            {verificationStatus === "success" ? (
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2Icon className="h-6 w-6 text-green-600" />
              </div>
            ) : verificationStatus === "error" ? (
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircleIcon className="h-6 w-6 text-red-600" />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MailIcon className="h-6 w-6 text-blue-600" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-xl text-center">
            {verificationStatus === "success"
              ? "Email Verified!"
              : verificationStatus === "error"
              ? "Verification Failed"
              : "Verify Your Email"}
          </CardTitle>
          
          <CardDescription className="text-center">
            {verificationStatus === "success"
              ? "Thank you for verifying your email address. You will be redirected to the dashboard."
              : verificationStatus === "error"
              ? errorMessage || "There was a problem verifying your email. Please try again or request a new verification link."
              : "Please check your inbox for the verification email. You'll need to verify your email before accessing your account."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {verificationStatus === "success" ? (
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button className="mt-2">
                  Go to Dashboard <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {token ? (
                <div className="flex justify-center">
                  {isLoading ? (
                    <Button disabled>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </Button>
                  ) : (
                    <Button onClick={() => handleVerifyToken(token)}>
                      Verify Again
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isResending}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleResendVerification}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-blue-600 transition-colors">
              Return to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}