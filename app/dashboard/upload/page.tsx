"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { toast } from "sonner"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { FileUploader } from "./components/FileUploader"
import { AIFeaturesPanel } from "./components/AIFeaturesPanel"
import { ResumePreview } from "./components/ResumePreview"
import { AIAnalysisPanel } from "./components/AIAnalysisPanel"
import { PageHeader } from "./components/PageHeader"
import { TabNavigation } from "./components/TabNavigation"
import { useResumeUpload } from "./hooks/useResumeUpload"

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

export default function UploadResumePage() {
  const {
    activeTab,
    parsedResume,
    selectedTemplate,
    handleFileProcessed,
    handleTabChange,
    handleReset,
    handleCreateFromScratch,
    handleEnhanceWithAI,
  } = useResumeUpload()
  
  useEffect(() => {
    // Show toast notification on initial render
    toast("In development", {
      description: "This feature is currently under development",
      duration: 3000, // Will disappear after 3 seconds
    })
  }, [])

  // Prepare upload content
  const uploadContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <FileUploader 
        onFileProcessed={handleFileProcessed} 
        onTabChange={handleTabChange} 
        selectedTemplate={selectedTemplate}
      />
      
      <AIFeaturesPanel 
        onCreateFromScratch={handleCreateFromScratch} 
      />
    </motion.div>
  )

  // Prepare preview content
  const previewContent = (
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
  )

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <DashboardSidebar /> */}

      <div className="flex-1">
        {/* <DashboardHeader /> */}

        <main className="p-6">
          <PageHeader />
          
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            hasResumeData={!!parsedResume}
            uploadContent={uploadContent}
            previewContent={previewContent}
          />
        </main>
      </div>
    </div>
  )
}
