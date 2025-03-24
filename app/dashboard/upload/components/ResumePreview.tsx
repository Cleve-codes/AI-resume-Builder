"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Trash2, Download } from "lucide-react"
import { ContactInfoSection } from "./resume-sections/ContactInfoSection"
import { SummarySection } from "./resume-sections/SummarySection"
import { ExperienceSection } from "./resume-sections/ExperienceSection"
import { EducationSection } from "./resume-sections/EducationSection"
import { SkillsSection } from "./resume-sections/SkillsSection"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface ResumePreviewProps {
  resumeData: any
  onReset: () => void
}

export function ResumePreview({ resumeData, onReset }: ResumePreviewProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF or DOCX file
    alert("This would download the resume in a real app")
  }

  return (
    <motion.div variants={itemVariants} className="lg:col-span-2">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Resume Preview
              </CardTitle>
              <CardDescription>Review and edit the extracted information</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={onReset}>
                <Trash2 className="h-3 w-3" /> Reset
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleDownload}>
                <Download className="h-3 w-3" /> Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <ContactInfoSection contactInfo={resumeData} />
            
            <Separator />
            
            <SummarySection summary={resumeData.summary} />
            
            <Separator />
            
            <ExperienceSection experiences={resumeData.experience} />
            
            <Separator />
            
            <EducationSection educations={resumeData.education} />
            
            <Separator />
            
            <SkillsSection skills={resumeData.skills} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
