// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import DashboardHeader from "@/components/dashboard-header"
// import DashboardSidebar from "@/components/dashboard-sidebar"
// import { useUser } from "@clerk/nextjs"
// import { toast } from "sonner"

// // Import all components through the barrel export
// import {
//   ProfileSidebar,
//   PersonalInfoForm,
//   SecuritySettings, 
//   NotificationSettings,
//   PrivacySettings,
//   BillingInformation,
//   SuccessAlert
// } from "../components"

// // Define types for clarity
// interface UserProfile {
//   name: string;
//   email: string;
//   jobTitle: string | null;
//   location: string | null;
//   phone: string | null;
//   linkedin: string | null;
//   website: string | null;
// }

// // Animation variants for staggered animations
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
// }

// export default function FixedProfilePage() {
//   const router = useRouter()
//   const { user, isLoaded } = useUser()
//   const [activeTab, setActiveTab] = useState("personal")
//   const [isUpdating, setIsUpdating] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [isMounted, setIsMounted] = useState(false)
  
//   // Initialize profile with empty values
//   const [profile, setProfile] = useState<UserProfile>({
//     name: "",
//     email: "",
//     jobTitle: null,
//     location: null,
//     phone: null,
//     linkedin: null,
//     website: null
//   })
  
//   // Simulate fetching user profile from API
//   useEffect(() => {
//     if (isLoaded && user) {
//       // In a real app, you would fetch this from your database
//       setProfile({
//         name: user.fullName || "",
//         email: user.primaryEmailAddress?.emailAddress || "",
//         jobTitle: "Software Engineer", // This would come from your database
//         location: "San Francisco, CA", // This would come from your database
//         phone: "+1 (555) 123-4567", // This would come from your database
//         linkedin: "linkedin.com/in/username", // This would come from your database
//         website: "portfolio.dev" // This would come from your database
//       })
//     }
//   }, [isLoaded, user])

//   const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setProfile((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsUpdating(true)

//     try {
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(profile)
//       })

//       if (!response.ok) {
//         throw new Error('Failed to update profile')
//       }

//       const data = await response.json()
//       setShowSuccess(true)
//       toast.success("Profile updated successfully")
//     } catch (error) {
//       console.error('Error updating profile:', error)
//       toast.error('Failed to update profile')
//     } finally {
//       setIsUpdating(false)
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setShowSuccess(false)
//       }, 3000)
//     }
//   }

//   // Show loading state
//   if (!isLoaded || !user) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
//         <DashboardSidebar />
//         <div className="flex-1 w-full">
//           <DashboardHeader />
//           <main className="p-4 md:p-6 flex items-center justify-center">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
//               <p className="text-blue-600">Loading your profile...</p>
//             </div>
//           </main>
//         </div>
//       </div>
//     )
//   }
  
//   // Default case: user authenticated and data loaded
//   return (
//     <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
//       <DashboardSidebar />

//       <div className="flex-1 w-full">
//         <DashboardHeader />

//         <main className="p-4 md:p-6">
//           <div className="mb-6 md:mb-8">
//             <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-600">My Profile</h1>
//             <p className="text-gray-500">Manage your account settings and preferences</p>
//           </div>

//           <SuccessAlert message={showSuccess} />

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
//             {/* Profile sidebar with user info and stats */}
//             <div>
//               <ProfileSidebar 
//                 profile={{
//                   name: profile.name,
//                   email: profile.email,
//                   jobTitle: profile.jobTitle || "",
//                   location: profile.location || "",
//                   profileImage: undefined,
//                 }} 
//               />
//             </div>

//             <div className="lg:col-span-3">
//               <Tabs value={activeTab} onValueChange={setActiveTab}>
//                 <TabsList className="mb-4 md:mb-6">
//                   <TabsTrigger value="personal">Personal Info</TabsTrigger>
//                   <TabsTrigger value="security">Security</TabsTrigger>
//                   <TabsTrigger value="preferences">Preferences</TabsTrigger>
//                   <TabsTrigger value="billing">Billing</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="personal">
//                   <PersonalInfoForm
//                     profile={{
//                       name: profile.name,
//                       email: profile.email,
//                       jobTitle: profile.jobTitle || "",
//                       location: profile.location || "",
//                       phone: profile.phone || "",
//                       websiteUrl: profile.website || "",
//                       linkedinUrl: profile.linkedin || "",
//                     }}
//                     isUpdating={isUpdating}
//                     onProfileChange={handleProfileChange}
//                     onSubmit={handleProfileSubmit}
//                   />
//                 </TabsContent>

//                 <TabsContent value="security">
//                   <SecuritySettings
//                     passwordData={{
//                       currentPassword: "",
//                       newPassword: "",
//                       confirmPassword: "",
//                     }}
//                     isUpdating={isUpdating}
//                     onPasswordChange={() => {}}
//                     onSubmit={() => {}}
//                   />
//                 </TabsContent>

//                 <TabsContent value="preferences">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     <NotificationSettings
//                       notifications={{
//                         emailUpdates: true,
//                         newTemplates: true,
//                         resumeTips: true,
//                         jobAlerts: false,
//                       }}
//                       onNotificationChange={() => {}}
//                     />
//                     <PrivacySettings
//                       privacy={{
//                         publicProfile: false,
//                         shareAnalytics: true,
//                         allowAiImprovement: true,
//                       }}
//                       onPrivacyChange={() => {}}
//                     />
//                   </div>
//                   <div className="mt-6 flex justify-end">
//                     <Button 
//                       onClick={() => {}} 
//                       disabled={isUpdating}
//                       className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
//                     >
//                       {isUpdating ? "Saving..." : "Save Settings"}
//                     </Button>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="billing">
//                   <BillingInformation />
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// } 