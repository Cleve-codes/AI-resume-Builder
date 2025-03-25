"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// This is a wrapper hook that doesn't directly use useSearchParams
// The actual URL parameter handling will be done in the component using this hook
export function useResumeUpload(initialTemplate: string | null = null) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [parsedResume, setParsedResume] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(initialTemplate)

  // Update template when passed from parent
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate)
    }
  }, [initialTemplate])
  
  // Handler for template changes from URL
  const handleTemplateFromUrl = useCallback((template: string | null) => {
    if (template) {
      setSelectedTemplate(template)
    }
  }, [])

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
    setSelectedTemplate(null)
    // Navigate to the base URL without parameters
    router.push("/dashboard/upload")
  }

  // Create resume from parsed data
  const handleCreateResume = () => {
    // In a real app, this would save the parsed resume to the database
    // and redirect to the resume editor
    router.push("/dashboard/resume/1")
  }

  // Handle create from scratch
  const handleCreateFromScratch = () => {
    // If a template was selected, pass it to the resume creation page
    if (selectedTemplate) {
      router.push(`/dashboard/resume/new?template=${encodeURIComponent(selectedTemplate)}`)
    } else {
      router.push("/dashboard/resume/new")
    }
  }

  // Handle AI enhancement
  const handleEnhanceWithAI = () => {
    // In a real app, this would call an API to enhance the resume
    alert("This would enhance the resume with AI in a real app")
  }

  return {
    activeTab,
    parsedResume,
    selectedTemplate,
    handleFileProcessed,
    handleTabChange,
    handleReset,
    handleCreateResume,
    handleCreateFromScratch,
    handleEnhanceWithAI,
  }
}
