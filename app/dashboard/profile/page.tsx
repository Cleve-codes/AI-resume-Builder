"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Settings, ChevronRight } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"

// Import our modular components
import { useProfilePage } from "./hooks/useProfilePage"
import { PageHeader } from "./components/PageHeader"
import { ProfileTabs } from "./components/ProfileTabs"
import { ProfileSidebar } from "./components/ProfileSidebar"
import { SuccessAlert } from "./components/SuccessAlert"
import Link from "next/link"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

// Define user profile type to match Prisma schema fields
interface UserProfile {
  name: string;
  email: string;
  jobTitle: string | null;
  location: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  githubUrl?: string | null;
  bio?: string | null;
  profileImage: string | null; // Changed to null to match Prisma schema
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoaded } = useUser()
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
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    async function fetchUserProfile() {
      try {
        setIsFetching(true)

        // Fetch user data from Clerk without depending on current profile state
        setProfile({
          // Handle null safety with optional chaining
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          profileImage: user?.imageUrl || null,
          jobTitle: null, // Initialize with null rather than depending on current profile state
          location: null,
          phone: null,
          websiteUrl: null,
          linkedinUrl: null,
          githubUrl: null,
          bio: null,
        })

        setFetchError(null)
      } catch (error) {
        console.error('Error setting profile from Clerk user data:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to load profile data'
        setFetchError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsFetching(false)
      }
    }

    fetchUserProfile()
  }, [user, isLoaded, router, setFetchError, setIsFetching, setProfile])

  // Show loading state
  if (!isLoaded || isFetching) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        {/* <DashboardSidebar /> */}
        <div className="flex-1">
          {/* <DashboardHeader /> */}
          <main className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <p className="text-primary">Loading your profile...</p>
              <p className="text-primary/70 text-sm mt-2">
                {isFetching ? "Fetching profile data..." : ""}
                {!isLoaded ? "Checking authentication..." : ""}
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show error state if there was a problem fetching profile data
  if (fetchError) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        {/* <DashboardSidebar /> */}
        <div className="flex-1">
          {/* <DashboardHeader /> */}
          <main className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-4 py-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold">My Profile</h1>
              </div>
              <p className="text-muted-foreground mb-6">Manage your account settings and preferences</p>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
                <h2 className="text-destructive text-lg font-semibold mb-2">Error loading profile</h2>
                <p className="text-destructive/80 mb-4">{fetchError}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-destructive hover:bg-destructive/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="border border-destructive/20 text-destructive hover:bg-destructive/10 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  // Default case: user authenticated and data loaded
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <DashboardSidebar /> */}

      <div className="flex-1">
        {/* <DashboardHeader /> */}

        <main>
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="container sm:mx-auto sm:px-4 sm:py-8"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold">My Profile</h1>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Link href="/dashboard" className="flex items-center gap-1">
                  <span>Dashboard</span>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">My Profile</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SuccessAlert message={successMessage} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Profile sidebar with user info and stats */}
              <motion.div variants={itemVariants}>
                <ProfileSidebar
                  profile={{
                    name: profile.name,
                    email: profile.email,
                    jobTitle: profile.jobTitle ?? "",
                    location: profile.location ?? "",
                    // Convert null to undefined for the component
                    profileImage: profile.profileImage || undefined,
                  }}
                  statistics={statistics}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-3">
                <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
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
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}