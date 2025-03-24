"use client"

import { motion } from "framer-motion"
import { User, Shield, Bell, CreditCard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "./PersonalInfoForm"
import { SecuritySettings } from "./SecuritySettings"
import { NotificationSettings } from "./NotificationSettings"
import { PrivacySettings } from "./PrivacySettings"
import { BillingInformation } from "./BillingInformation"
import { UserProfile, UserSettings } from "../hooks/useProfilePage"

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
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="w-full">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-6 grid grid-cols-4 md:w-auto">
          <TabsTrigger value="personal">
            <User className="mr-2 h-4 w-4 hidden md:inline" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4 hidden md:inline" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Bell className="mr-2 h-4 w-4 hidden md:inline" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4 hidden md:inline" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-0">
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

        <TabsContent value="security" className="mt-0">
          <SecuritySettings
            passwordData={passwordData}
            isUpdating={isUpdating}
            onPasswordChange={onPasswordChange}
            onSubmit={onPasswordSubmit}
          />
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
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
          <div className="mt-4 flex justify-end">
            <button
              onClick={onSettingsSubmit}
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-0">
          <BillingInformation />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
