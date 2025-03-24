"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

// Import types
import { Job } from "./types"

// Import components
import { JobsLoadingState } from "./components/JobsLoadingState"
import { ResumeSelection } from "./components/ResumeSelection"
import { JobFilters } from "./components/JobFilters"
import { JobSearch } from "./components/JobSearch"
import { JobCard } from "./components/JobCard"
import { NoJobsFound } from "./components/NoJobsFound"

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function JobMatchesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("match")

  // Filter states
  const [filters, setFilters] = useState({
    jobTypes: {
      fullTime: true,
      partTime: false,
      contract: false,
      remote: true,
    },
    matchScore: [60, 100],
    locations: [],
    experience: "any",
    salary: "any",
    postedWithin: "any",
  })

  // Simulate loading jobs from API
  useEffect(() => {
    const timer = setTimeout(() => {
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

      setJobs(mockJobs)
      setFilteredJobs(mockJobs)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Apply filters and search
  useEffect(() => {
    if (jobs.length === 0) return

    let result = [...jobs]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query),
      )
    }

    // Apply tab filters
    if (activeTab === "saved") {
      result = result.filter((job) => job.saved)
    } else if (activeTab === "applied") {
      result = result.filter((job) => job.applied)
    }

    // Apply job type filters
    result = result.filter((job) => {
      if (job.type === "full-time" && !filters.jobTypes.fullTime) return false
      if (job.type === "part-time" && !filters.jobTypes.partTime) return false
      if (job.type === "contract" && !filters.jobTypes.contract) return false
      if (job.type === "remote" && !filters.jobTypes.remote) return false
      return true
    })

    // Apply match score filter
    result = result.filter((job) => job.matchScore >= filters.matchScore[0] && job.matchScore <= filters.matchScore[1])

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore
        case "recent":
          // This is a simplification - in a real app, you'd parse the dates
          return a.posted.includes("day") ? -1 : 1
        case "salary":
          // This is a simplification - in a real app, you'd parse the salary ranges
          const aMin = Number.parseInt(a.salary.split(" - ")[0].replace(/\D/g, ""))
          const bMin = Number.parseInt(b.salary.split(" - ")[0].replace(/\D/g, ""))
          return bMin - aMin
        default:
          return 0
      }
    })

    setFilteredJobs(result)
  }, [jobs, searchQuery, activeTab, sortBy, filters])

  // Toggle job saved status
  const toggleSaveJob = (jobId: number) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)))
  }

  // Toggle job applied status
  const applyToJob = (jobId: number) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, applied: true } : job)))
  }

  // Navigate to job details page
  const handleJobSelect = (jobId: number) => {
    router.push(`/dashboard/jobs/${jobId}`)
  }

  // Update filter values
  const updateFilter = (category: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  // Update job type filters
  const updateJobTypeFilter = (type: keyof typeof filters.jobTypes, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      jobTypes: {
        ...prev.jobTypes,
        [type]: checked,
      },
    }))
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      jobTypes: {
        fullTime: true,
        partTime: false,
        contract: false,
        remote: true,
      },
      matchScore: [60, 100],
      locations: [],
      experience: "any",
      salary: "any",
      postedWithin: "any",
    })
    setSearchQuery("")
    setActiveTab("all")
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Job Matches</h1>
        </div>
        <p className="text-muted-foreground">Discover job opportunities that match your skills and experience</p>
      </motion.div>

      {isLoading ? (
        <JobsLoadingState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ResumeSelection />
            <JobFilters 
              filters={filters} 
              updateFilter={updateFilter} 
              updateJobTypeFilter={updateJobTypeFilter}
              resetFilters={resetFilters}
            />
          </div>

          <div className="lg:col-span-2">
            <JobSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              jobCount={{
                all: jobs.length,
                saved: jobs.filter(job => job.saved).length,
                applied: jobs.filter(job => job.applied).length
              }}
            />

            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.length === 0 ? (
                <NoJobsFound resetFilters={resetFilters} />
              ) : (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                  {filteredJobs.map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard
                        job={job}
                        onSelect={() => handleJobSelect(job.id)}
                        onSave={() => toggleSaveJob(job.id)}
                        onApply={() => applyToJob(job.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

