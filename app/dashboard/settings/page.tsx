"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Palette, Moon, Sun, FileText, Download, Zap, Globe, Trash2, LogOut, CheckCircle, Save } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance")
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "system",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
  })

  // Resume defaults
  const [resumeDefaults, setResumeDefaults] = useState({
    defaultTemplate: "professional",
    defaultFontFamily: "inter",
    defaultFontSize: "11",
    defaultMargins: "normal",
    includeHeaderByDefault: true,
    includePhotoByDefault: false,
  })

  // Export settings
  const [exportSettings, setExportSettings] = useState({
    defaultFormat: "pdf",
    defaultPaperSize: "a4",
    defaultColorMode: "color",
    optimizeForATS: true,
    includeLinksInPDF: true,
    compressionLevel: 80,
  })

  // AI settings
  const [aiSettings, setAiSettings] = useState({
    enableAiSuggestions: true,
    autoAnalyzeResume: true,
    suggestImprovements: true,
    useDataForTraining: true,
    preferredLanguageModel: "gpt-4o",
  })

  // Language settings
  const [languageSettings, setLanguageSettings] = useState({
    language: "english",
    dateFormat: "mm/dd/yyyy",
    timeFormat: "12h",
  })

  const handleAppearanceChange = (key: string, value: any) => {
    setAppearance((prev) => ({ ...prev, [key]: value }))
  }

  const handleResumeDefaultsChange = (key: string, value: any) => {
    setResumeDefaults((prev) => ({ ...prev, [key]: value }))
  }

  const handleExportSettingsChange = (key: string, value: any) => {
    setExportSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleAiSettingsChange = (key: string, value: any) => {
    setAiSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleLanguageSettingsChange = (key: string, value: any) => {
    setLanguageSettings((prev) => ({ ...prev, [key]: value }))
  }

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
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your application preferences</p>
          </div>

          {successMessage && (
            <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="resume">Resume Defaults</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="ai">AI Settings</TabsTrigger>
              <TabsTrigger value="language">Language & Region</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" /> Appearance Settings
                  </CardTitle>
                  <CardDescription>Customize how the application looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <RadioGroup
                      value={appearance.theme}
                      onValueChange={(value) => handleAppearanceChange("theme", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center gap-1.5">
                          <Sun className="h-4 w-4" /> Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center gap-1.5">
                          <Moon className="h-4 w-4" /> Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select
                      value={appearance.fontSize}
                      onValueChange={(value) => handleAppearanceChange("fontSize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Accessibility</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduced-motion" className="text-sm font-medium">
                          Reduced Motion
                        </Label>
                        <p className="text-xs text-muted-foreground">Minimize animations throughout the application</p>
                      </div>
                      <Switch
                        id="reduced-motion"
                        checked={appearance.reducedMotion}
                        onCheckedChange={(checked) => handleAppearanceChange("reducedMotion", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="high-contrast" className="text-sm font-medium">
                          High Contrast
                        </Label>
                        <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch
                        id="high-contrast"
                        checked={appearance.highContrast}
                        onCheckedChange={(checked) => handleAppearanceChange("highContrast", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Resume Default Settings
                  </CardTitle>
                  <CardDescription>Set default options for new resumes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Default Template</Label>
                    <Select
                      value={resumeDefaults.defaultTemplate}
                      onValueChange={(value) => handleResumeDefaultsChange("defaultTemplate", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select default template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Default Font Family</Label>
                      <Select
                        value={resumeDefaults.defaultFontFamily}
                        onValueChange={(value) => handleResumeDefaultsChange("defaultFontFamily", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                          <SelectItem value="georgia">Georgia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Default Font Size</Label>
                      <Select
                        value={resumeDefaults.defaultFontSize}
                        onValueChange={(value) => handleResumeDefaultsChange("defaultFontSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10pt</SelectItem>
                          <SelectItem value="11">11pt</SelectItem>
                          <SelectItem value="12">12pt</SelectItem>
                          <SelectItem value="13">13pt</SelectItem>
                          <SelectItem value="14">14pt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Margins</Label>
                    <Select
                      value={resumeDefaults.defaultMargins}
                      onValueChange={(value) => handleResumeDefaultsChange("defaultMargins", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select default margins" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Default Sections</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="include-header" className="text-sm font-medium">
                          Include Header
                        </Label>
                        <p className="text-xs text-muted-foreground">Add a header section by default</p>
                      </div>
                      <Switch
                        id="include-header"
                        checked={resumeDefaults.includeHeaderByDefault}
                        onCheckedChange={(checked) => handleResumeDefaultsChange("includeHeaderByDefault", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="include-photo" className="text-sm font-medium">
                          Include Photo
                        </Label>
                        <p className="text-xs text-muted-foreground">Add a photo placeholder by default</p>
                      </div>
                      <Switch
                        id="include-photo"
                        checked={resumeDefaults.includePhotoByDefault}
                        onCheckedChange={(checked) => handleResumeDefaultsChange("includePhotoByDefault", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="export">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" /> Export Settings
                  </CardTitle>
                  <CardDescription>Configure how your resumes are exported</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Default Format</Label>
                      <Select
                        value={exportSettings.defaultFormat}
                        onValueChange={(value) => handleExportSettingsChange("defaultFormat", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select export format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="docx">Word (DOCX)</SelectItem>
                          <SelectItem value="txt">Plain Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Paper Size</Label>
                      <Select
                        value={exportSettings.defaultPaperSize}
                        onValueChange={(value) => handleExportSettingsChange("defaultPaperSize", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="letter">Letter (US)</SelectItem>
                          <SelectItem value="a4">A4 (International)</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Color Mode</Label>
                    <RadioGroup
                      value={exportSettings.defaultColorMode}
                      onValueChange={(value) => handleExportSettingsChange("defaultColorMode", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="color" id="color-mode-color" />
                        <Label htmlFor="color-mode-color">Color</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="grayscale" id="color-mode-grayscale" />
                        <Label htmlFor="color-mode-grayscale">Grayscale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bw" id="color-mode-bw" />
                        <Label htmlFor="color-mode-bw">Black & White</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="optimize-ats" className="text-sm font-medium">
                          Optimize for ATS
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Ensure exports are optimized for Applicant Tracking Systems
                        </p>
                      </div>
                      <Switch
                        id="optimize-ats"
                        checked={exportSettings.optimizeForATS}
                        onCheckedChange={(checked) => handleExportSettingsChange("optimizeForATS", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="include-links" className="text-sm font-medium">
                          Include Links in PDF
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Make URLs and email addresses clickable in PDF exports
                        </p>
                      </div>
                      <Switch
                        id="include-links"
                        checked={exportSettings.includeLinksInPDF}
                        onCheckedChange={(checked) => handleExportSettingsChange("includeLinksInPDF", checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="compression-level">PDF Compression Level</Label>
                      <span className="text-sm">{exportSettings.compressionLevel}%</span>
                    </div>
                    <Slider
                      id="compression-level"
                      min={0}
                      max={100}
                      step={10}
                      value={[exportSettings.compressionLevel]}
                      onValueChange={(value) => handleExportSettingsChange("compressionLevel", value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher compression reduces file size but may affect quality
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" /> AI Settings
                  </CardTitle>
                  <CardDescription>Configure AI-powered features and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-suggestions" className="text-sm font-medium">
                          AI Suggestions
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Enable AI-powered content suggestions while editing
                        </p>
                      </div>
                      <Switch
                        id="ai-suggestions"
                        checked={aiSettings.enableAiSuggestions}
                        onCheckedChange={(checked) => handleAiSettingsChange("enableAiSuggestions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-analyze" className="text-sm font-medium">
                          Auto-Analyze Resume
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically analyze resume when changes are made
                        </p>
                      </div>
                      <Switch
                        id="auto-analyze"
                        checked={aiSettings.autoAnalyzeResume}
                        onCheckedChange={(checked) => handleAiSettingsChange("autoAnalyzeResume", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="suggest-improvements" className="text-sm font-medium">
                          Suggest Improvements
                        </Label>
                        <p className="text-xs text-muted-foreground">Proactively suggest improvements to your resume</p>
                      </div>
                      <Switch
                        id="suggest-improvements"
                        checked={aiSettings.suggestImprovements}
                        onCheckedChange={(checked) => handleAiSettingsChange("suggestImprovements", checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Preferred Language Model</Label>
                    <Select
                      value={aiSettings.preferredLanguageModel}
                      onValueChange={(value) => handleAiSettingsChange("preferredLanguageModel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      More advanced models provide better suggestions but may be slower
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="use-data-training" className="text-sm font-medium">
                          Data Usage for Training
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Allow us to use anonymized data to improve our AI models
                        </p>
                      </div>
                      <Switch
                        id="use-data-training"
                        checked={aiSettings.useDataForTraining}
                        onCheckedChange={(checked) => handleAiSettingsChange("useDataForTraining", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" /> Language & Region
                  </CardTitle>
                  <CardDescription>Set your preferred language and regional formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={languageSettings.language}
                      onValueChange={(value) => handleLanguageSettingsChange("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select
                        value={languageSettings.dateFormat}
                        onValueChange={(value) => handleLanguageSettingsChange("dateFormat", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY (US)</SelectItem>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY (UK/EU)</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (ISO)</SelectItem>
                          <SelectItem value="mmmm d, yyyy">Month D, YYYY (Long)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Format</Label>
                      <Select
                        value={languageSettings.timeFormat}
                        onValueChange={(value) => handleLanguageSettingsChange("timeFormat", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>Manage your account and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Account Information</h3>
                    <div className="bg-muted/50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium">john.doe@example.com</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Account Type</p>
                          <p className="text-sm font-medium">Free Plan</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Member Since</p>
                          <p className="text-sm font-medium">November 15, 2023</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Login</p>
                          <p className="text-sm font-medium">Today at 2:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Data & Privacy</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full sm:w-auto gap-2">
                        <Download className="h-4 w-4" /> Download My Data
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Request a copy of all your personal data stored in our system
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
                    <div className="space-y-4">
                      <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Delete Account</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="destructive" onClick={handleDeleteAccount} className="gap-2">
                            <Trash2 className="h-4 w-4" /> Delete Account
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Log Out Everywhere</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                          Log out from all devices where you're currently signed in
                        </p>
                        <Button variant="outline" className="gap-2">
                          <LogOut className="h-4 w-4" /> Log Out Everywhere
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

