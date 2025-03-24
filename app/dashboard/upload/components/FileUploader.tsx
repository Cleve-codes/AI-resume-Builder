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
} from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface FileUploaderProps {
  onFileProcessed: (parsedData: any) => void
  onTabChange: (tab: string) => void
}

export function FileUploader({ onFileProcessed, onTabChange }: FileUploaderProps) {
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
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Drag and drop your resume file</h3>
                <p className="mb-4 text-sm text-muted-foreground max-w-md">
                  Upload your resume in PDF, DOCX, or TXT format. We'll automatically parse your
                  information.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleChange}
                />
                <Button onClick={onButtonClick} className="gap-2">
                  <FileUp className="h-4 w-4" /> Browse Files
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">Maximum file size: 5MB</p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-2 bg-primary/10 rounded-md">
                  <File className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file && (file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {uploadStatus !== "uploading" && uploadStatus !== "processing" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {uploadStatus === "uploading" && "Uploading..."}
                    {uploadStatus === "processing" && "Processing..."}
                    {uploadStatus === "success" && "Upload complete"}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>

              {uploadStatus === "processing" && (
                <div className="mt-4 flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => onTabChange("preview")} className="gap-2">
                    Preview Resume <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {uploadStatus === "error" && (
            <Alert className="mt-4 bg-destructive/10 text-destructive border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Supported File Types</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                PDF
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                DOCX
              </Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                TXT
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
