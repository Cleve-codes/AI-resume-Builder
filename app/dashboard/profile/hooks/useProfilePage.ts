"use client"

import { useState } from "react"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface UserProfile {
  name: string
  email: string
  jobTitle: string | null
  location: string | null
  phone: string | null
  websiteUrl: string | null
  linkedinUrl: string | null
  githubUrl: string | null
  bio: string | null
  profileImage: string | null
}

export interface UserSettings {
  notifications: {
    emailUpdates: boolean
    newTemplates: boolean
    resumeTips: boolean
    jobAlerts: boolean
  }
  privacy: {
    publicProfile: boolean
    shareAnalytics: boolean
    allowAiImprovement: boolean
  }
}

export interface UserStatistics {
  resumesCreated: number
  resumesExported: number
  analysesRun: number
  lastActive: string
}

export function useProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isUpdating, setIsUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  
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

  const handleProfileSubmit = async (e: React.FormEvent): Promise<void> => {
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

      setSuccessMessage("Profile updated successfully")
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      // Validate that passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
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
      
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error('Error changing password:', error)
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  const handleSettingsSubmit = async (): Promise<void> => {
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
    } catch (error) {
      console.error('Error updating settings:', error)
    } finally {
      setIsUpdating(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }

  return {
    activeTab,
    setActiveTab,
    isUpdating,
    setIsUpdating,
    successMessage,
    setSuccessMessage,
    isFetching,
    setIsFetching,
    fetchError,
    setFetchError,
    profile,
    setProfile,
    passwordData,
    setPasswordData,
    settings,
    setSettings,
    statistics,
    setStatistics,
    handleProfileChange,
    handlePasswordChange,
    handleNotificationChange,
    handlePrivacyChange,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleSettingsSubmit
  }
}
