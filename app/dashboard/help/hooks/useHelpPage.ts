"use client"

import { useState } from "react"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function useHelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("troubleshooting")
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the form data to an API
    console.log("Form submitted:", contactFormData)
    // Reset form
    setContactFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    // Show success message
    alert("Your message has been sent. We'll get back to you soon!")
  }

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    contactFormData,
    handleContactFormChange,
    handleContactFormSubmit,
  }
}
