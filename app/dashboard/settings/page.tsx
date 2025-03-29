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

        <main className="p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-5 sm:mb-8"
          >
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">Customize your application preferences</p>
          </motion.div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="mb-5 sm:mb-6 bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {isLoading ? (
            // Loading state is handled by the loading.tsx file
            null
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
              <div className="relative mb-4 sm:mb-6 overflow-x-auto">
                <TabsList className="w-full flex justify-between h-auto rounded-md">
                  <TabsTrigger 
                    value="appearance" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('appearance')}
                  >
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resume" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('resume')}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">Resume</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="export" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('export')}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">Export</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('ai')}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">AI</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="language" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('language')}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">Language</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 px-0 h-auto rounded-none"
                    onClick={() => setActiveTab('account')}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:block sm:text-sm">Account</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        {activeTab === "appearance" && <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "resume" && <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "export" && <Download className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "ai" && <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "language" && <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "account" && <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                        {activeTab === "appearance" && "Appearance Settings"}
                        {activeTab === "resume" && "Resume Default Settings"}
                        {activeTab === "export" && "Export Settings"}
                        {activeTab === "ai" && "AI Settings"}
                        {activeTab === "language" && "Language & Region"}
                        {activeTab === "account" && "Account Management"}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {activeTab === "appearance" && "Customize how the application looks and feels"}
                        {activeTab === "resume" && "Set default options for new resumes"}
                        {activeTab === "export" && "Configure how your resumes are exported"}
                        {activeTab === "ai" && "Configure AI-powered features and preferences"}
                        {activeTab === "language" && "Set your preferred language and regional formats"}
                        {activeTab === "account" && "Manage your account and data"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
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
                    <CardFooter className="border-t py-3 sm:py-4">
                      <Button 
                        onClick={handleSaveSettings} 
                        disabled={isSaving} 
                        className="gap-2 text-xs sm:text-sm h-8 sm:h-9"
                      >
                        {isSaving ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : <Save className="h-3 w-3 sm:h-4 sm:w-4" />}
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
