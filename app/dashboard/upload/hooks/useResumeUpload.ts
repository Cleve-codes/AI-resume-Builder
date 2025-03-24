"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function useResumeUpload() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("upload")
  const [parsedResume, setParsedResume] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Check for template parameter in URL on component mount
  useEffect(() => {
    const template = searchParams.get("template")
    if (template) {
      setSelectedTemplate(template)
      // If a template is selected, we can optionally auto-navigate to the preview tab
      // or show a notification that a template has been selected
    }
  }, [searchParams])

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
    // Clear the template from URL if it exists
    if (searchParams.has("template")) {
      router.push("/dashboard/upload")
    }
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
