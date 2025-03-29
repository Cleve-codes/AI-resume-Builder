"use client"

import { motion } from "framer-motion"
import { UserCircle, Shield, Bell, CreditCard, Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PersonalInfoForm } from "./PersonalInfoForm"
import { SecuritySettings } from "./SecuritySettings"
import { NotificationSettings } from "./NotificationSettings"
import { PrivacySettings } from "./PrivacySettings"
import { BillingInformation } from "./BillingInformation"
import { UserProfile, UserSettings } from "../hooks/useProfilePage"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface ProfileTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  profile: UserProfile
  passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  settings: UserSettings
  isUpdating: boolean
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNotificationChange: (key: string, checked: boolean) => void
  onPrivacyChange: (key: string, checked: boolean) => void
  onProfileSubmit: (e: React.FormEvent) => Promise<void>
  onPasswordSubmit: (e: React.FormEvent) => Promise<void>
  onSettingsSubmit: () => Promise<void>
}

export function ProfileTabs({
  activeTab,
  onTabChange,
  profile,
  passwordData,
  settings,
  isUpdating,
  onProfileChange,
  onPasswordChange,
  onNotificationChange,
  onPrivacyChange,
  onProfileSubmit,
  onPasswordSubmit,
  onSettingsSubmit
}: ProfileTabsProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full flex mb-6 justify-between h-auto rounded-md">
          <TabsTrigger 
            value="personal" 
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <UserCircle className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Personal</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <Shield className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Security</span>
          </TabsTrigger>
          <TabsTrigger 
            value="preferences"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Preferences</span>
          </TabsTrigger>
          <TabsTrigger 
            value="billing"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-200">
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
            onProfileChange={onProfileChange}
            onSubmit={onProfileSubmit}
          />
        </TabsContent>

        <TabsContent value="security" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-200">
          <SecuritySettings
            passwordData={passwordData}
            isUpdating={isUpdating}
            onPasswordChange={onPasswordChange}
            onSubmit={onPasswordSubmit}
          />
        </TabsContent>

        <TabsContent value="preferences" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <NotificationSettings
              notifications={settings.notifications}
              onNotificationChange={onNotificationChange}
            />
            <PrivacySettings
              privacy={settings.privacy}
              onPrivacyChange={onPrivacyChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              onClick={onSettingsSubmit}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-white transition-all"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-0 animate-in fade-in-50 zoom-in-95 duration-200">
          <BillingInformation />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
