"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CircleIcon, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from '@/lib/context/auth-context'
import GoogleAuthButton from '@/components/google-auth-button'

// Define a type for the validation error format returned by Zod
type ValidationErrors = {
  [key: string]: {
    _errors?: string[];
  } | string | undefined;
};

export default function SignupPage() {
  const router = useRouter()
  const { register, isLoading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<string | ValidationErrors>("")
  
  // Animation on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any error when user starts typing again
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    try {
      await register(formData.name, formData.email, formData.password)
      
      // Show success toast - may not be visible due to redirect
      toast.success("Account created successfully!", {
        description: "You can now log in with your credentials",
      })
      
      // Redirection is handled inside the register function
      // It will redirect to /login?registered=true
    } catch (err) {
      console.error('Registration error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during registration')
      toast.error("Registration failed", {
        description: err instanceof Error ? err.message : 'Please check your information and try again',
      })
    }
  }

  // Format and display errors
  const getErrorMessage = (field: string): string | null => {
    if (!error) return null;
    if (typeof error === 'string') return null;

    if (!error[field]) return null;

    const fieldError = error[field];
    
    if (typeof fieldError === 'string') {
      return fieldError;
    }
    
    if (typeof fieldError === 'object' && fieldError && '_errors' in fieldError) {
      return fieldError._errors?.join(', ') || null;
    }
    
    return null;
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
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Start building your ATS-optimized resume today</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                  />
                  {getErrorMessage('name') && (
                    <p className="text-red-500 text-sm mt-1">{getErrorMessage('name')}</p>
                  )}
                </div>
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
                  {getErrorMessage('email') && (
                    <p className="text-red-500 text-sm mt-1">{getErrorMessage('email')}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                  />
                  {getErrorMessage('password') && (
                    <p className="text-red-500 text-sm mt-1">{getErrorMessage('password')}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-blue-100 focus:border-blue-300 focus:ring-blue-300"
                  />
                </div>

                {typeof error === 'string' && error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="terms" className="text-blue-600 focus:ring-blue-500" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-5 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5" 
                  disabled={authLoading}
                >
                  {authLoading ? "Creating account..." : "Create Account"}
                </Button>
                
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute border-t border-gray-300 w-full"></div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">or</div>
                </div>
                
                <GoogleAuthButton
                  className="py-2.5"
                  text="Sign up with Google"
                />
                <div className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
          
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