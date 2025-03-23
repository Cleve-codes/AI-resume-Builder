"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"

// Import all components through the barrel export
import {
  ProfileSidebar,
  PersonalInfoForm,
  SecuritySettings, 
  NotificationSettings,
  PrivacySettings,
  BillingInformation,
  SuccessAlert
} from "../components"

// Define types for clarity
interface UserProfile {
  name: string;
  email: string;
  jobTitle: string | null;
  location: string | null;
  phone: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  bio: string | null;
  profileImage: string | null;
}

interface UserSettings {
  notifications: {
    emailUpdates: boolean;
    newTemplates: boolean;
    resumeTips: boolean;
    jobAlerts: boolean;
  };
  privacy: {
    publicProfile: boolean;
    shareAnalytics: boolean;
    allowAiImprovement: boolean;
  };
}

interface UserStatistics {
  resumesCreated: number;
  resumesExported: number;
  analysesRun: number;
  lastActive: string;
}

// Define type for debug info
interface DebugInfo {
  apiResponse?: {
    status: number;
    statusText: string;
    ok: boolean;
  };
  profileData?: Record<string, any>;
  fetchError?: string;
  renderCount?: number;
}

export default function FixedProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [isUpdating, setIsUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({})
  const renderCount = useRef(0)
  
  // Removed contentVisible state and scroll animations 
  // that could cause disappearing content issues

  // User profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    jobTitle: null,
    location: null,
    phone: null,
    websiteUrl: null,
    linkedinUrl: null,
    githubUrl: null,
    bio: null,
    profileImage: null
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // User settings state
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      emailUpdates: true,
      newTemplates: true,
      resumeTips: true,
      jobAlerts: false,
    },
    privacy: {
      publicProfile: false,
      shareAnalytics: true,
      allowAiImprovement: true,
    }
  })

  // Statistics state
  const [statistics, setStatistics] = useState<UserStatistics>({
    resumesCreated: 0,
    resumesExported: 0,
    analysesRun: 0,
    lastActive: new Date().toISOString(),
  })

  // Track renders for debugging
  useEffect(() => {
    renderCount.current += 1;
    setDebugInfo(prev => ({
      ...prev,
      renderCount: renderCount.current
    }));
    console.log(`Profile page rendered ${renderCount.current} times`);
  }, []);

  // Fetch user profile data when component loads
  useEffect(() => {
    console.log("Profile page useEffect triggered", { user, isLoading })
    
    // Only continue if we're sure about the authentication status
    if (isLoading) {
      console.log("Auth is still loading, waiting...")
      return
    }

    // Only continue if user is authenticated
    if (!user) {
      console.log("No user found, redirecting to login")
      router.push('/login')
      return
    }

    console.log("User authenticated, fetching profile data...")
    
    // For testing purposes, make it easy to switch to mock data
    const useMockData = false; // Set to true to use mock data instead of API
    
    if (useMockData) {
      console.log("Using mock profile data")
      
      // Simulate API delay to test loading states
      setTimeout(() => {
        setProfile({
          name: user.name || "Test User",
          email: user.email || "test@example.com",
          jobTitle: "Software Developer",
          location: "San Francisco, CA",
          phone: "(555) 123-4567",
          websiteUrl: "example.com",
          linkedinUrl: "linkedin.com/in/testuser",
          githubUrl: "github.com/testuser",
          bio: "This is a test biography for debugging purposes.",
          profileImage: null
        })
        
        setIsFetching(false)
      }, 1000)
      
      return
    }
    
    async function fetchUserProfile() {
      try {
        setIsFetching(true)
        
        console.log("Fetching profile data from API...")
        // Use our mock API endpoint to avoid auth issues
        const response = await fetch('/api/mock-profile')
        
        console.log("API response received:", response.status, response.statusText)
        setDebugInfo((prev) => ({ 
          ...prev, 
          apiResponse: { 
            status: response.status, 
            statusText: response.statusText,
            ok: response.ok 
          } 
        }))
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error response from profile API:', response.status, errorText)
          throw new Error(`Failed to fetch profile data: ${response.status} ${errorText || response.statusText}`)
        }
        
        const data = await response.json()
        console.log("Profile data received successfully:", data)
        setDebugInfo((prev) => ({ ...prev, profileData: data }))
        
        // Update profile state with fetched data
        setProfile({
          name: data.name || user?.name || "",
          email: data.email || user?.email || "",
          jobTitle: data.jobTitle || null,
          location: data.location || null,
          phone: data.phone || null,
          websiteUrl: data.websiteUrl || null,
          linkedinUrl: data.linkedinUrl || null,
          githubUrl: data.githubUrl || null,
          bio: data.bio || null,
          profileImage: data.profileImage || null
        })
        
        // Update settings if they exist in the response
        if (data.settings) {
          console.log("Settings data received:", data.settings)
          setSettings(data.settings)
        }
        
        // Update statistics if they exist in the response
        if (data.statistics) {
          console.log("Statistics data received:", data.statistics)
          setStatistics(data.statistics)
        }

        setFetchError(null)
      } catch (error) {
        console.error('Error fetching profile:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to load profile data'
        setFetchError(errorMessage)
        setDebugInfo((prev) => ({ ...prev, fetchError: String(error) }))
        toast.error(errorMessage)
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserProfile()
  }, [user, isLoading, router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked
      }
    }))
  }

  const handlePrivacyChange = (key: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: checked
      }
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      setSuccessMessage("Profile updated successfully")
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      // Validate that passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("New passwords don't match")
        setIsUpdating(false)
        return
      }

      const response = await fetch('/api/profile/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to change password')
      }

      setSuccessMessage("Password changed successfully")
      toast.success("Password changed successfully")
      
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to change password')
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleSettingsSubmit = async () => {
    setIsUpdating(true)

    try {
      const response = await fetch('/api/profile/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      setSuccessMessage("Settings updated successfully")
      toast.success("Settings updated successfully")
    } catch (error) {
      console.error('Error updating settings:', error)
      toast.error('Failed to update settings')
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  // Show loading state
  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
        <DashboardSidebar />
        <div className="flex-1 w-full">
          <DashboardHeader />
          <main className="p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-blue-600">Loading your profile...</p>
              <p className="text-blue-400 text-sm mt-2">
                {isFetching ? "Fetching profile data..." : ""}
                {isLoading ? "Checking authentication..." : ""}
              </p>
              {/* <p className="text-xs text-gray-500 mt-4">Render count: {renderCount.current}</p> */}
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  // Show error state if there was a problem fetching profile data
  if (fetchError) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
        <DashboardSidebar />
        <div className="flex-1 w-full">
          <DashboardHeader />
          <main className="p-4 md:p-6">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-600">My Profile</h1>
              <p className="text-gray-500">Manage your account settings and preferences</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6 mb-6">
              <h2 className="text-red-700 text-lg font-semibold mb-2">Error loading profile</h2>
              <p className="text-red-600 mb-4">{fetchError}</p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  onClick={() => router.push("/profile-test")}
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Try Profile Test Page
                </Button>
              </div>
              
              {/* Debug information */}
              <div className="mt-6 bg-gray-100 rounded p-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Debug Information</h3>
                <pre className="text-xs text-gray-600 overflow-auto max-h-40">
                  {JSON.stringify({ 
                    user: user ? { email: user.email } : null, 
                    fetchError, 
                    renderCount: renderCount.current,
                    debugInfo
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Default case: user authenticated and data loaded
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DashboardSidebar />

      <div className="flex-1 w-full">
        <DashboardHeader />

        <main className="p-4 md:p-6">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-600">My Profile</h1>
            <p className="text-gray-500">Manage your account settings and preferences</p>
            {/* <p className="text-xs text-gray-400">Render count: {renderCount.current}</p> */}
          </div>

          <SuccessAlert message={successMessage} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Profile sidebar with user info and stats */}
            <div>
              <ProfileSidebar 
                profile={{
                  name: profile.name,
                  email: profile.email,
                  jobTitle: profile.jobTitle || "",
                  location: profile.location || "",
                  profileImage: profile.profileImage || undefined,
                }} 
                statistics={statistics} 
              />
            </div>

            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 md:mb-6">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoForm
                    profile={{
                      name: profile.name,
                      email: profile.email,
                      jobTitle: profile.jobTitle || "",
                      location: profile.location || "",
                      phone: profile.phone || "",
                      websiteUrl: profile.websiteUrl || "",
                      linkedinUrl: profile.linkedinUrl || "",
                      githubUrl: profile.githubUrl || "",
                      bio: profile.bio || "",
                    }}
                    isUpdating={isUpdating}
                    onProfileChange={handleProfileChange}
                    onSubmit={handleProfileSubmit}
                  />
                </TabsContent>

                <TabsContent value="security">
                  <SecuritySettings
                    passwordData={passwordData}
                    isUpdating={isUpdating}
                    onPasswordChange={handlePasswordChange}
                    onSubmit={handlePasswordSubmit}
                  />
                </TabsContent>

                <TabsContent value="preferences">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <NotificationSettings
                      notifications={settings.notifications}
                      onNotificationChange={handleNotificationChange}
                    />
                    <PrivacySettings
                      privacy={settings.privacy}
                      onPrivacyChange={handlePrivacyChange}
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleSettingsSubmit} 
                      disabled={isUpdating}
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      {isUpdating ? "Saving..." : "Save Settings"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="billing">
                  <BillingInformation />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 