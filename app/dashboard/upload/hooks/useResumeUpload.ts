"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useResumeUpload() {
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

  return {
    activeTab,
    parsedResume,
    handleFileProcessed,
    handleTabChange,
    handleReset,
    handleCreateResume,
    handleCreateFromScratch,
    handleEnhanceWithAI,
  }
}
