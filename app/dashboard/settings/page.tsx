"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Settings, 
  CheckCircle, 
  Palette, 
  FileText, 
  Download, 
  Zap, 
  Globe, 
  Save, 
  Loader2 
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { AppearanceSettings } from './components/AppearanceSettings'
import { ResumeDefaultsSettings } from './components/ResumeDefaultsSettings'
import { ExportSettings } from './components/ExportSettings'
import { AISettings } from './components/AISettings'
import { LanguageSettings } from './components/LanguageSettings'
import { AccountSettings } from './components/AccountSettings'
import { useSettingsForm } from './hooks/useSettingsForm'

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

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  // Simulate loading data from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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

  // Show nothing before hydration is complete to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

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
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground">Customize your application preferences</p>
          </motion.div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            // Loading state is handled by the loading.tsx file
            null
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6 relative overflow-hidden">
                <motion.div
                  className="absolute h-full bg-primary/10 rounded-md"
                  layoutId="tab-highlight"
                  transition={{ type: "spring", duration: 0.5 }}
                  style={{
                    width: `calc(100% / 6)`,
                    left: `calc(${["appearance", "resume", "export", "ai", "language", "account"].indexOf(activeTab)} * (100% / 6))`,
                  }}
                />
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="resume">Resume Defaults</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
                <TabsTrigger value="ai">AI Settings</TabsTrigger>
                <TabsTrigger value="language">Language & Region</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                      <CardTitle className="flex items-center gap-2">
                        {activeTab === "appearance" && <Palette className="h-5 w-5 text-primary" />}
                        {activeTab === "resume" && <FileText className="h-5 w-5 text-primary" />}
                        {activeTab === "export" && <Download className="h-5 w-5 text-primary" />}
                        {activeTab === "ai" && <Zap className="h-5 w-5 text-primary" />}
                        {activeTab === "language" && <Globe className="h-5 w-5 text-primary" />}
                        {activeTab === "account" && <Settings className="h-5 w-5 text-primary" />}
                        {activeTab === "appearance" && "Appearance Settings"}
                        {activeTab === "resume" && "Resume Default Settings"}
                        {activeTab === "export" && "Export Settings"}
                        {activeTab === "ai" && "AI Settings"}
                        {activeTab === "language" && "Language & Region"}
                        {activeTab === "account" && "Account Management"}
                      </CardTitle>
                      <CardDescription>
                        {activeTab === "appearance" && "Customize how the application looks and feels"}
                        {activeTab === "resume" && "Set default options for new resumes"}
                        {activeTab === "export" && "Configure how your resumes are exported"}
                        {activeTab === "ai" && "Configure AI-powered features and preferences"}
                        {activeTab === "language" && "Set your preferred language and regional formats"}
                        {activeTab === "account" && "Manage your account and data"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
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
                    </CardContent>
                    <CardFooter className="border-t py-4">
                      <Button 
                        onClick={handleSaveSettings} 
                        disabled={isSaving} 
                        className="gap-2"
                      >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  )
}
