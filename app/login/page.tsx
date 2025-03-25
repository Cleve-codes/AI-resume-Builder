"use client"

import React, { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CircleIcon, ArrowLeft, CheckCircle2Icon } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from '@/lib/context/auth-context';

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, error: authError, isLoading: authLoading, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState("")

  // Animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Check if redirected from registration or if there's a callback URL
  useEffect(() => {
    const registered = searchParams.get('registered')
    if (registered === 'true') {
      toast.success("Registration successful!", {
        description: "Please log in with your new account",
        icon: <CheckCircle2Icon className="h-5 w-5 text-green-500" />,
        duration: 5000,
      })
    }
  }, [searchParams])
  
  // Handle direct navigation to dashboard if already logged in
  useEffect(() => {
    if (user) {
      // Check if email is verified
      if (!user.emailVerified) {
        console.log('User email not verified, redirecting to verification page');
        router.push('/verify-email?email=' + encodeURIComponent(user.email));
        return;
      }
      
      console.log('User already logged in, redirecting to dashboard');
      window.location.href = '/dashboard';
    }
  }, [user, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any error when user starts typing again
    if (error) setError("")
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    try {
      await login(formData.email, formData.password)
      // Note: The auth context will now handle redirection based on email verification status
    } catch (err) {
      console.error('Login error:', err instanceof Error ? { message: err.message, stack: err.stack } : err)
      
      // Handle specific error cases
      if (err instanceof Error) {
        if (err.message.includes('not verified')) {
          setError("Email not verified. Please check your inbox or request a new verification email.")
          toast.error("Email not verified", {
            description: "Please check your inbox or request a new verification email",
            action: {
              label: "Verify Now",
              onClick: () => router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`),
            },
          })
        } else if (err.message.includes('Invalid email or password')) {
          setError("Invalid email or password. Please try again.")
          toast.error("Login failed", {
            description: "Invalid email or password. Please try again."
          })
        } else {
          setError(err.message || "Failed to login")
          toast.error("Login failed", {
            description: err.message || "An unexpected error occurred. Please try again."
          })
        }
      } else {
        setError("Failed to login. Please try again.")
        toast.error("Login failed", {
          description: "An unexpected error occurred. Please try again."
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header with back button */}
      <header className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className={`w-full max-w-md transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 justify-center">
              <div className="bg-blue-600 rounded-full p-1.5 group-hover:bg-blue-700 transition-all">
                <CircleIcon className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Resume Builder
              </span>
            </Link>
          </div>

          <Card className="border border-blue-100 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Sign in to your Resume Builder account</CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="remember" className="text-blue-600 focus:ring-blue-500" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-5 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5" 
                  disabled={authLoading}
                >
                  {authLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          {/* Social sign-in options */}
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-blue-50 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  ></path>
                </svg>
              </button>

              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <button
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -z-10 top-1/4 -left-16 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="hidden md:block absolute -z-10 bottom-1/4 -right-16 w-32 h-32 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
