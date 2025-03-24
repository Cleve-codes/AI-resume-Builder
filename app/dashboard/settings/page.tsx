"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { AppearanceSettings } from './components/AppearanceSettings'
import { ResumeDefaultsSettings } from './components/ResumeDefaultsSettings'
import { ExportSettings } from './components/ExportSettings'
import { AISettings } from './components/AISettings'
import { LanguageSettings } from './components/LanguageSettings'
import { AccountSettings } from './components/AccountSettings'
import { useSettingsForm } from './hooks/useSettingsForm'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Settings forms
  const appearance = useSettingsForm({
    theme: "system",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
  })

  const resumeDefaults = useSettingsForm({
    defaultTemplate: 'professional',
    defaultFontFamily: 'inter',
    defaultFontSize: '11',
    defaultMargins: 'normal',
    includeHeaderByDefault: true,
    includePhotoByDefault: false
  })

  const exportSettings = useSettingsForm({
    defaultFormat: "pdf",
    defaultPaperSize: "a4",
    defaultColorMode: "color",
    optimizeForATS: true,
    includeLinksInPDF: true,
    compressionLevel: 80
  })

  const aiSettings = useSettingsForm({
    enableAiSuggestions: true,
    autoAnalyzeResume: true,
    suggestImprovements: true,
    useDataForTraining: true,
    preferredLanguageModel: 'gpt-4o'
  })

  const languageSettings = useSettingsForm({
    language: 'english',
    dateFormat: 'mm/dd/yyyy',
    timeFormat: '12h'
  })

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Settings saved successfully")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1000)
  }

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    // and then call an API to delete the account
    alert("This would delete your account after confirmation in a real app")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-blue-600">Settings</h1>
            <p className="text-gray-500">Customize your application preferences</p>
          </div>

          {successMessage && (
            <Alert className="mb-6 bg-green-50 text-green-600 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-6 bg-blue-50 p-1">
              <TabsTrigger 
                value="appearance" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger 
                value="resume" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Resume Defaults
              </TabsTrigger>
              <TabsTrigger 
                value="export" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Export
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                AI Settings
              </TabsTrigger>
              <TabsTrigger 
                value="language" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Language & Region
              </TabsTrigger>
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance">
              <AppearanceSettings
                appearance={appearance.settings}
                onAppearanceChange={appearance.handleChange}
              />
            </TabsContent>

            <TabsContent value="resume">
              <ResumeDefaultsSettings
                resumeDefaults={resumeDefaults.settings}
                onResumeDefaultsChange={resumeDefaults.handleChange}
              />
            </TabsContent>

            <TabsContent value="export">
              <ExportSettings
                exportSettings={exportSettings.settings}
                onExportSettingsChange={exportSettings.handleChange}
              />
            </TabsContent>

            <TabsContent value="ai">
              <AISettings
                aiSettings={aiSettings.settings}
                onAiSettingsChange={aiSettings.handleChange}
              />
            </TabsContent>

            <TabsContent value="language">
              <LanguageSettings
                languageSettings={languageSettings.settings}
                onLanguageSettingsChange={languageSettings.handleChange}
              />
            </TabsContent>

            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving} 
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
