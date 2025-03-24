"use client"

import { useState, useEffect } from "react"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "contract" | "remote"
  salary: string
  posted: string
  description: string
  requirements: string[]
  matchScore: number
  skills: {
    matching: string[]
    missing: string[]
  }
  saved: boolean
  applied: boolean
}

export function useJobsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("match")
  const [expandedFilters, setExpandedFilters] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    jobTypes: {
      fullTime: true,
      partTime: false,
      contract: false,
      remote: true,
    },
    matchScore: [60, 100] as number[],
    experience: "any",
    salary: "any",
    postedWithin: "any",
  })

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate loading with a timeout
        setTimeout(() => {
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
              location: "Remote",
              type: "full-time",
              salary: "$130,000 - $160,000",
              posted: "1 week ago",
              description:
                "Join our DevOps team to build and maintain our cloud infrastructure. You will be responsible for CI/CD pipelines, infrastructure as code, and monitoring systems.",
              requirements: [
                "4+ years of experience in DevOps or SRE roles",
                "Experience with AWS, Azure, or GCP",
                "Proficiency with Docker, Kubernetes, and Terraform",
                "Knowledge of CI/CD tools like Jenkins, GitHub Actions, or GitLab CI",
              ],
              matchScore: 65,
              skills: {
                matching: ["AWS", "Docker"],
                missing: ["Kubernetes", "Terraform", "Jenkins"],
              },
              saved: false,
              applied: false,
            },
          ]
          setJobs(mockJobs)
          setFilteredJobs(mockJobs)
          setSelectedJob(mockJobs[0])
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error fetching jobs:", error)
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Apply filters and search
  useEffect(() => {
    if (jobs.length === 0) return

    let result = [...jobs]

    // Filter by tab
    if (activeTab === "saved") {
      result = result.filter((job) => job.saved)
    } else if (activeTab === "applied") {
      result = result.filter((job) => job.applied)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.skills.matching.some((skill) => skill.toLowerCase().includes(query))
      )
    }

    // Filter by job types
    const selectedTypes = Object.entries(filters.jobTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => {
        if (type === "fullTime") return "full-time"
        if (type === "partTime") return "part-time"
        return type
      })

    if (selectedTypes.length > 0) {
      result = result.filter((job) => selectedTypes.includes(job.type))
    }

    // Filter by match score
    result = result.filter(
      (job) => job.matchScore >= filters.matchScore[0] && job.matchScore <= filters.matchScore[1]
    )

    // Sort results
    if (sortBy === "match") {
      result.sort((a, b) => b.matchScore - a.matchScore)
    } else if (sortBy === "recent") {
      // This is a simplified sort based on the "posted" string
      // In a real app, you would use actual dates
      const getPostingDays = (posted: string) => {
        if (posted.includes("hours")) return 0
        if (posted.includes("day")) {
          const days = parseInt(posted.split(" ")[0])
          return days
        }
        if (posted.includes("week")) {
          const weeks = parseInt(posted.split(" ")[0])
          return weeks * 7
        }
        if (posted.includes("month")) {
          const months = parseInt(posted.split(" ")[0])
          return months * 30
        }
        return 0
      }
      result.sort((a, b) => getPostingDays(a.posted) - getPostingDays(b.posted))
    } else if (sortBy === "salary") {
      // This is a simplified sort based on the upper salary range
      // In a real app, you would parse and sort by actual salary values
      const getSalaryValue = (salary: string) => {
        const upperValue = salary.split("-")[1]?.trim() || salary
        return parseInt(upperValue.replace(/\D/g, ""))
      }
      result.sort((a, b) => getSalaryValue(b.salary) - getSalaryValue(a.salary))
    }

    setFilteredJobs(result)

    // If the selected job is filtered out, select the first job in the filtered list
    if (selectedJob && !result.find((job) => job.id === selectedJob.id) && result.length > 0) {
      setSelectedJob(result[0])
    } else if (result.length === 0) {
      setSelectedJob(null)
    }
  }, [jobs, searchQuery, activeTab, sortBy, filters, selectedJob])

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  // Handle filter change
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  // Toggle expanded filters
  const handleToggleFilters = () => {
    setExpandedFilters(!expandedFilters)
  }

  // Handle job selection
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job)
  }

  // Handle save job
  const handleSaveJob = async (jobId: number) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the state
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
      setJobs(updatedJobs)
    } catch (error) {
      console.error("Error saving job:", error)
    }
  }

  // Handle apply job
  const handleApplyJob = async (jobId: number) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the state
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, applied: true } : job
      )
      setJobs(updatedJobs)
    } catch (error) {
      console.error("Error applying to job:", error)
    }
  }

  // Count saved and applied jobs
  const savedCount = jobs.filter((job) => job.saved).length
  const appliedCount = jobs.filter((job) => job.applied).length

  return {
    isLoading,
    filteredJobs,
    selectedJob,
    searchQuery,
    activeTab,
    sortBy,
    filters,
    expandedFilters,
    savedCount,
    appliedCount,
    handleSearchChange,
    handleTabChange,
    handleSortChange,
    handleFilterChange,
    handleToggleFilters,
    handleSelectJob,
    handleSaveJob,
    handleApplyJob,
  }
}
