"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export default function ResumeEditor() {
  const [contactInfo, setContactInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
  })

  const [summary, setSummary] = useState(
    "Experienced software engineer with 5+ years of experience in full-stack development. Proficient in React, Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications.",
  )

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2021-01",
      endDate: "Present",
      description:
        "Led development of a customer-facing web application using React and Node.js. Improved application performance by 40% through code optimization and implementing efficient data structures.",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Digital Innovations",
      location: "San Jose, CA",
      startDate: "2018-06",
      endDate: "2020-12",
      description:
        "Developed and maintained RESTful APIs using Node.js and Express. Collaborated with cross-functional teams to implement new features and resolve bugs.",
    },
  ])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummary(e.target.value)
  }

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const addExperience = () => {
    const newId = Math.max(0, ...experiences.map((exp) => exp.id)) + 1
    setExperiences((prev) => [
      ...prev,
      {
        id: newId,
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <Input name="name" value={contactInfo.name} onChange={handleContactChange} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input name="email" type="email" value={contactInfo.email} onChange={handleContactChange} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Phone</label>
            <Input name="phone" value={contactInfo.phone} onChange={handleContactChange} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Input name="location" value={contactInfo.location} onChange={handleContactChange} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1 block">LinkedIn</label>
            <Input name="linkedin" value={contactInfo.linkedin} onChange={handleContactChange} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Professional Summary</h3>
        <Textarea value={summary} onChange={handleSummaryChange} className="min-h-[100px]" />
        <p className="text-xs text-muted-foreground mt-2">
          A brief 2-3 sentence overview of your professional background and key strengths.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Work Experience</h3>
          <Button variant="outline" size="sm" onClick={addExperience} className="gap-1">
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="border rounded-md p-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Job Title</label>
                  <Input value={exp.title} onChange={(e) => handleExperienceChange(exp.id, "title", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Input
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Start Date</label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">End Date</label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      placeholder="Present"
                      onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Describe your responsibilities and achievements. Use bullet points for better readability.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

