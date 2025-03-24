"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { Job } from "../types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { JobDetail } from "../components/JobDetail"

export default function JobDetailsPage({ params }: { params: Promise<{ jobId: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const jobId = resolvedParams.jobId
  
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch job data based on jobId parameter
  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch this data from an API
        // For now, we'll use the mock job data from the main jobs page
        const parsedJobId = parseInt(jobId)
        
        // This is a mock function to simulate fetching a job by ID
        const mockJob = getMockJobById(parsedJobId)
        
        if (mockJob) {
          setJob(mockJob)
        } else {
          // If job is not found, go back to the jobs listing
          router.push("/dashboard/jobs")
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobDetails()
  }, [jobId, router])

  // Toggle job saved status
  const toggleSaveJob = () => {
    if (job) {
      setJob({ ...job, saved: !job.saved })
      // In a real app, you would also update this in your backend
    }
  }

  // Apply to job
  const applyToJob = () => {
    if (job) {
      setJob({ ...job, applied: true })
      // In a real app, you would also update this in your backend
    }
  }

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        className="gap-2 mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Jobs
      </Button>

      {isLoading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : job ? (
        <JobDetail 
          job={job} 
          onSave={toggleSaveJob} 
          onApply={applyToJob} 
        />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <p className="text-muted-foreground mt-2">The job you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="mt-4" 
            onClick={() => router.push("/dashboard/jobs")}
          >
            Go back to jobs
          </Button>
        </div>
      )}
    </div>
  )
}

// Mock function to simulate fetching a job by ID
function getMockJobById(jobId: number): Job | null {
  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      type: "full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      description:
        "We are seeking a Senior Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications using React, Node.js, and AWS.",
      requirements: [
        "5+ years of experience in software development",
        "Strong proficiency in JavaScript, TypeScript, React, and Node.js",
        "Experience with AWS services",
        "Bachelor's degree in Computer Science or related field",
      ],
      matchScore: 92,
      skills: {
        matching: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
        missing: ["Docker", "Kubernetes"],
      },
      saved: false,
      applied: false,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Solutions",
      location: "Remote",
      type: "full-time",
      salary: "$100,000 - $130,000",
      posted: "1 week ago",
      description:
        "Join our team as a Full Stack Developer to build and maintain web applications. You will work with both frontend and backend technologies to deliver high-quality software solutions.",
      requirements: [
        "3+ years of experience in full stack development",
        "Proficiency in JavaScript, React, and Node.js",
        "Experience with MongoDB or other NoSQL databases",
        "Good understanding of RESTful APIs",
      ],
      matchScore: 85,
      skills: {
        matching: ["JavaScript", "React", "Node.js", "MongoDB"],
        missing: ["TypeScript", "GraphQL"],
      },
      saved: true,
      applied: false,
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "User Experience Labs",
      location: "New York, NY",
      type: "remote",
      salary: "$90,000 - $120,000",
      posted: "3 days ago",
      description:
        "We're looking for a talented Frontend Engineer to join our team. You will be responsible for implementing user interfaces using modern frontend technologies.",
      requirements: [
        "3+ years of experience in frontend development",
        "Strong proficiency in JavaScript, React, and CSS",
        "Experience with state management libraries like Redux",
        "Knowledge of responsive design principles",
      ],
      matchScore: 78,
      skills: {
        matching: ["JavaScript", "React", "CSS"],
        missing: ["TypeScript", "Next.js", "Redux"],
      },
      saved: false,
      applied: false,
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Data Systems Inc.",
      location: "Austin, TX",
      type: "full-time",
      salary: "$110,000 - $140,000",
      posted: "5 days ago",
      description:
        "We are seeking a Backend Developer to design and implement server-side applications. You will work with databases, APIs, and server architectures.",
      requirements: [
        "4+ years of experience in backend development",
        "Proficiency in Node.js, Express, and MongoDB",
        "Experience with RESTful API design",
        "Knowledge of authentication and authorization protocols",
      ],
      matchScore: 70,
      skills: {
        matching: ["Node.js", "Express", "MongoDB"],
        missing: ["AWS", "Docker", "Microservices"],
      },
      saved: false,
      applied: true,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      location: "Seattle, WA",
      type: "contract",
      salary: "$130,000 - $160,000",
      posted: "1 day ago",
      description:
        "Join our team as a DevOps Engineer to build and maintain our cloud infrastructure. You will work with AWS, Docker, and CI/CD pipelines.",
      requirements: [
        "3+ years of experience in DevOps",
        "Strong knowledge of AWS services",
        "Experience with Docker and Kubernetes",
        "Familiarity with CI/CD tools like Jenkins or GitHub Actions",
      ],
      matchScore: 65,
      skills: {
        matching: ["AWS"],
        missing: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
      },
      saved: false,
      applied: false,
    },
    {
      id: 6,
      title: "React Native Developer",
      company: "Mobile Innovations",
      location: "Chicago, IL",
      type: "full-time",
      salary: "$95,000 - $125,000",
      posted: "2 weeks ago",
      description:
        "We're looking for a React Native Developer to join our mobile app development team. You will be responsible for building cross-platform mobile applications.",
      requirements: [
        "2+ years of experience with React Native",
        "Strong JavaScript skills",
        "Experience with mobile app deployment",
        "Knowledge of native modules integration",
      ],
      matchScore: 60,
      skills: {
        matching: ["JavaScript", "React"],
        missing: ["React Native", "iOS", "Android", "Mobile Development"],
      },
      saved: false,
      applied: false,
    },
  ]

  return mockJobs.find(job => job.id === jobId) || null
} 