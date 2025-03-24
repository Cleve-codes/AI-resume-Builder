"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { FileUploader } from "./components/FileUploader"
import { AIFeaturesPanel } from "./components/AIFeaturesPanel"
import { ResumePreview } from "./components/ResumePreview"
import { AIAnalysisPanel } from "./components/AIAnalysisPanel"

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

export default function ModularUploadResumePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [parsedResume, setParsedResume] = useState<any>(null)

  // Handle file processed
  const handleFileProcessed = (parsedData: any) => {
    setParsedResume(parsedData)
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Reset the form
  const handleReset = () => {
    setParsedResume(null)
    setActiveTab("upload")
  }

  // Create resume from parsed data
  const handleCreateResume = () => {
    // In a real app, this would save the parsed resume to the database
    // and redirect to the resume editor
    router.push("/dashboard/resume/1")
  }

  // Handle create from scratch
  const handleCreateFromScratch = () => {
    router.push("/dashboard/resume/new")
  }

  // Handle AI enhancement
  const handleEnhanceWithAI = () => {
    // In a real app, this would call an API to enhance the resume
    alert("This would enhance the resume with AI in a real app")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileUp className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Upload Resume</h1>
            </div>
            <p className="text-muted-foreground">Upload your existing resume to get started or enhance it with AI</p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upload" disabled={activeTab === "preview" && !!parsedResume}>
                Upload
              </TabsTrigger>
              <TabsTrigger value="preview" disabled={!parsedResume}>
                Preview & Edit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <FileUploader 
                  onFileProcessed={handleFileProcessed} 
                  onTabChange={handleTabChange} 
                />
                
                <AIFeaturesPanel 
                  onCreateFromScratch={handleCreateFromScratch} 
                />
              </motion.div>
            </TabsContent>

            <TabsContent value="preview">
              {parsedResume && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <ResumePreview 
                    resumeData={parsedResume} 
                    onReset={handleReset} 
                  />
                  
                  <AIAnalysisPanel 
                    onEnhanceWithAI={handleEnhanceWithAI} 
                  />
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
