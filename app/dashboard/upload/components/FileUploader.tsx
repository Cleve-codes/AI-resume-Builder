"use client"

import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  FileText,
  File,
  FileUp,
  X,
  Loader2,
  ArrowRight,
  AlertCircle,
  Layout,
} from "lucide-react"
import Link from "next/link"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface FileUploaderProps {
  onFileProcessed: (parsedData: any) => void
  onTabChange: (tab: string) => void
  selectedTemplate?: string | null
}

export function FileUploader({ onFileProcessed, onTabChange, selectedTemplate }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  // Handle file button click
  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Process the file
  const handleFile = (file: File) => {
    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a PDF, DOCX, or TXT file")
      setUploadStatus("error")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit")
      setUploadStatus("error")
      return
    }

    // Reset states
    setFile(file)
    setErrorMessage("")
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("processing")

          // Simulate processing delay
          setTimeout(() => {
            setUploadStatus("success")
            simulateParsedResume(file.name)
            onTabChange("preview")
          }, 1500)

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  // Simulate parsed resume data
  const simulateParsedResume = (fileName: string) => {
    // This would be replaced with actual parsing logic in a real app
    const parsedData = {
      fileName: fileName,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      summary:
        "Experienced software engineer with 5+ years of experience in full-stack development. Proficient in React, Node.js, and cloud technologies.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          location: "San Francisco, CA",
          startDate: "2021-01",
          endDate: "Present",
          description:
            "Led development of a customer-facing web application using React and Node.js. Improved application performance by 40% through code optimization.",
        },
        {
          title: "Software Engineer",
          company: "Digital Innovations",
          location: "San Jose, CA",
          startDate: "2018-06",
          endDate: "2020-12",
          description:
            "Developed and maintained RESTful APIs using Node.js and Express. Collaborated with cross-functional teams to implement new features.",
        },
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          institution: "University of California, Berkeley",
          location: "Berkeley, CA",
          startDate: "2014",
          endDate: "2018",
        },
      ],
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "AWS", "Docker"],
    }
    
    onFileProcessed(parsedData)
  }

  // Reset the form
  const handleReset = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <motion.div variants={itemVariants} className="lg:col-span-2">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" /> Upload Your Resume
          </CardTitle>
          <CardDescription>Upload your existing resume file to import your information</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {selectedTemplate && (
            <Alert className="mb-6 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-primary" />
                <div className="font-medium">Template Selected: {selectedTemplate}</div>
              </div>
              <AlertDescription className="mt-2">
                You've selected the {selectedTemplate} template. Upload your resume or create from scratch to use this template.
              </AlertDescription>
            </Alert>
          )}
          
          {uploadStatus === "idle" || uploadStatus === "error" ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">Drag & drop your resume file</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Support for PDF, DOCX, and TXT files (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleChange}
                />
                <Button onClick={onButtonClick} className="mb-2">
                  Select File
                </Button>
                <Link href="/dashboard/resume/templates" >
                <p className="text-xs text-muted-foreground">
                  or create a <Button variant="link" className="p-0 h-auto text-xs">new resume from scratch</Button>
                </p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{file?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file?.size && (file.size / 1024).toFixed(0)) || 0} KB
                    </p>
                  </div>
                </div>
                {uploadStatus !== "success" && (
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {uploadStatus === "uploading" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-1" />
                </div>
              )}

              {uploadStatus === "processing" && (
                <div className="bg-primary/5 p-3 rounded-md flex items-center gap-3">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  <span className="text-sm">Processing your resume...</span>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="bg-green-50 p-3 rounded-md flex items-center gap-3">
                  <Badge className="bg-green-500">Success</Badge>
                  <span className="text-sm">Resume uploaded successfully!</span>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={() => onTabChange("preview")}>
                    Preview <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {uploadStatus === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
