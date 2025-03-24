"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { useAuth } from "@/lib/context/auth-context"
import { toast } from "sonner"

// Import our modular components
import { useProfilePage } from "./hooks/useProfilePage"
import { PageHeader } from "./components/PageHeader"
import { ProfileTabs } from "./components/ProfileTabs"
import { ProfileSidebar } from "./components/ProfileSidebar"
import { SuccessAlert } from "./components/SuccessAlert"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const {
    activeTab,
    setActiveTab,
    isUpdating,
    successMessage,
    isFetching,
    setIsFetching,
    fetchError,
    setFetchError,
    profile,
    setProfile,
    passwordData,
    settings,
    statistics,
    setStatistics,
    handleProfileChange,
    handlePasswordChange,
    handleNotificationChange,
    handlePrivacyChange,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleSettingsSubmit
  } = useProfilePage()

  // Fetch user profile data when component loads
  useEffect(() => {
    if (isLoading) return
    
    if (!user) {
      router.push('/login')
      return
    }
    
    async function fetchUserProfile() {
      try {
        setIsFetching(true)
        
        // Use our mock API endpoint to avoid auth issues
        const response = await fetch('/api/mock-profile')
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch profile data: ${response.status} ${errorText || response.statusText}`)
        }
        
        const data = await response.json()
        
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
        
        // Update statistics if they exist in the response
        if (data.statistics) {
          setStatistics(data.statistics)
        }

        setFetchError(null)
      } catch (error) {
        console.error('Error fetching profile:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to load profile data'
        setFetchError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserProfile()
  }, [user, isLoading, router, setFetchError, setIsFetching, setProfile, setStatistics])

  // Show loading state
  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-primary">Loading your profile...</p>
              <p className="text-primary/70 text-sm mt-2">
                {isFetching ? "Fetching profile data..." : ""}
                {isLoading ? "Checking authentication..." : ""}
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  // Show error state if there was a problem fetching profile data
  if (fetchError) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="container mx-auto px-4 py-8"
            >
              <PageHeader
                title="My Profile"
                description="Manage your account settings and preferences"
                profileName={user?.name || "User"}
                profileEmail={user?.email || "user@example.com"}
              />
              
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
                <h2 className="text-destructive text-lg font-semibold mb-2">Error loading profile</h2>
                <p className="text-destructive/80 mb-4">{fetchError}</p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-destructive hover:bg-destructive/90 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => router.push("/dashboard")}
                    className="border border-destructive/20 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    )
  }

  // Default case: user authenticated and data loaded
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <PageHeader
              title="My Profile"
              description="Manage your account settings and preferences"
              profileName={profile.name}
              profileEmail={profile.email}
            />

            <SuccessAlert message={successMessage} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                <ProfileTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  profile={profile}
                  passwordData={passwordData}
                  settings={settings}
                  isUpdating={isUpdating}
                  onProfileChange={handleProfileChange}
                  onPasswordChange={handlePasswordChange}
                  onNotificationChange={handleNotificationChange}
                  onPrivacyChange={handlePrivacyChange}
                  onProfileSubmit={handleProfileSubmit}
                  onPasswordSubmit={handlePasswordSubmit}
                  onSettingsSubmit={handleSettingsSubmit}
                />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}