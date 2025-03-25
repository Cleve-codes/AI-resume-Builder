"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"

export default function GoogleAuthButton({ 
  className = "",
  text = "Continue with Google",
  onSuccess
}: { 
  className?: string
  text?: string
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)

      // Load the Google Identity Services script
      const loadScript = () => {
        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://accounts.google.com/gsi/client'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
          document.head.appendChild(script)
        })
      }

      await loadScript()

      // Initialize Google Identity Services
      // @ts-ignore - Google Identity Services types are not included
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      // Prompt the user to select a Google account
      // @ts-ignore - Google Identity Services types are not included
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // The Google One Tap dialog was either not displayed or skipped
          console.error('Google One Tap dialog was not displayed or was skipped', notification)
          setIsLoading(false)
          toast.error("Failed to initialize Google login", {
            description: "Please try again or use email/password login"
          })
        }
      })
    } catch (error) {
      console.error('Google login error:', error)
      toast.error("Google login failed", {
        description: "Please try again or use email/password login"
      })
      setIsLoading(false)
    }
  }

  const handleCredentialResponse = async (response: any) => {
    try {
      // Decode the JWT token to get user info
      const payload = parseJwt(response.credential)
      
      // Send the Google profile data to our API
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Google authentication failed')
      }

      // Update auth context with user data
      setUser(data.user)
      
      // Show success toast
      toast.success("Successfully signed in with Google")
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess()
      } else {
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Google authentication error:', error)
      toast.error("Authentication failed", {
        description: error instanceof Error ? error.message : "Please try again or use email/password login"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className={`w-full relative ${className}`}
      onClick={handleGoogleLogin}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
      ) : (
        <>
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          {text}
        </>
      )}
    </Button>
  )
}
