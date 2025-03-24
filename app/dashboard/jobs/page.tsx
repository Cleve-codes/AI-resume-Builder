"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Briefcase,
  Search,
  MapPin,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Filter,
  SlidersHorizontal,
  ExternalLink,
  Zap,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Send,
  BarChart,
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

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

// Job type interface
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

export default function JobMatchesPage() {
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
      setSelectedJob(mockJobs[0])
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

    // If the selected job is filtered out, select the first job in the filtered list
    if (selectedJob && !result.find((job) => job.id === selectedJob.id)) {
      setSelectedJob(result.length > 0 ? result[0] : null)
    }
  }, [jobs, searchQuery, activeTab, sortBy, filters, selectedJob])

  // Toggle job saved status
  const toggleSaveJob = (jobId: number) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)))
  }

  // Toggle job applied status
  const applyToJob = (jobId: number) => {
    setJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, applied: true } : job)))
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

  // Get match score color
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Get match score background color
  const getMatchScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
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
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" /> Resume Selection
                    </CardTitle>
                    <CardDescription>Choose which resume to match against jobs</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Select defaultValue="software-engineer">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a resume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-engineer">Software Engineer Resume</SelectItem>
                        <SelectItem value="product-manager">Product Manager Resume</SelectItem>
                        <SelectItem value="ux-designer">UX Designer Resume</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-4 p-4 bg-muted/50 rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Resume Match Score</span>
                        <span className="text-sm font-medium text-green-500">85%</span>
                      </div>
                      <Progress value={85} className="h-2 mb-2 bg-green-500" />
                      <p className="text-xs text-muted-foreground">
                        Your resume is well-optimized for software engineering positions
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Zap className="h-3 w-3" /> Optimize Resume
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <BarChart className="h-3 w-3" /> View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-primary" /> Filters
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedFilters(!expandedFilters)}
                        className="gap-1"
                      >
                        {expandedFilters ? (
                          <>
                            Less <ChevronUp className="h-3 w-3" />
                          </>
                        ) : (
                          <>
                            More <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Job Type</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="full-time"
                              checked={filters.jobTypes.fullTime}
                              onCheckedChange={(checked) => updateJobTypeFilter("fullTime", checked as boolean)}
                            />
                            <Label htmlFor="full-time">Full-time</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="part-time"
                              checked={filters.jobTypes.partTime}
                              onCheckedChange={(checked) => updateJobTypeFilter("partTime", checked as boolean)}
                            />
                            <Label htmlFor="part-time">Part-time</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="contract"
                              checked={filters.jobTypes.contract}
                              onCheckedChange={(checked) => updateJobTypeFilter("contract", checked as boolean)}
                            />
                            <Label htmlFor="contract">Contract</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remote"
                              checked={filters.jobTypes.remote}
                              onCheckedChange={(checked) => updateJobTypeFilter("remote", checked as boolean)}
                            />
                            <Label htmlFor="remote">Remote</Label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-medium">Match Score</h3>
                          <span className="text-sm">
                            {filters.matchScore[0]}% - {filters.matchScore[1]}%
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          step={5}
                          value={filters.matchScore}
                          onValueChange={(value) => updateFilter("matchScore", value)}
                          className="py-2"
                        />
                      </div>

                      {expandedFilters && (
                        <>
                          <Separator />

                          <div>
                            <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                            <Select
                              value={filters.experience}
                              onValueChange={(value) => updateFilter("experience", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any Experience</SelectItem>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="mid">Mid Level</SelectItem>
                                <SelectItem value="senior">Senior Level</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                            <Select value={filters.salary} onValueChange={(value) => updateFilter("salary", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select salary range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any Salary</SelectItem>
                                <SelectItem value="50k">$50,000+</SelectItem>
                                <SelectItem value="75k">$75,000+</SelectItem>
                                <SelectItem value="100k">$100,000+</SelectItem>
                                <SelectItem value="150k">$150,000+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Posted Within</h3>
                            <Select
                              value={filters.postedWithin}
                              onValueChange={(value) => updateFilter("postedWithin", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any Time</SelectItem>
                                <SelectItem value="day">Past 24 Hours</SelectItem>
                                <SelectItem value="week">Past Week</SelectItem>
                                <SelectItem value="month">Past Month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="easy-apply" className="text-sm font-medium">
                              Easy Apply Only
                            </Label>
                            <Switch id="easy-apply" />
                          </div>
                        </>
                      )}

                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
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
                          }}
                        >
                          Reset Filters
                        </Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 items-center">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] h-9">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">Best Match</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="salary">Highest Salary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                  <TabsList>
                    <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
                    <TabsTrigger value="saved">Saved ({jobs.filter((job) => job.saved).length})</TabsTrigger>
                    <TabsTrigger value="applied">Applied ({jobs.filter((job) => job.applied).length})</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  {filteredJobs.length === 0 ? (
                    <Card className="p-8 text-center">
                      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any jobs matching your search criteria.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveTab("all")
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
                        }}
                      >
                        Clear Filters
                      </Button>
                    </Card>
                  ) : (
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                      {filteredJobs.map((job) => (
                        <motion.div key={job.id} variants={itemVariants}>
                          <JobCard
                            job={job}
                            isSelected={selectedJob?.id === job.id}
                            onSelect={() => setSelectedJob(job)}
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

          {selectedJob && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" /> {selectedJob.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building className="h-3 w-3" /> {selectedJob.company}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedJob.saved ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={() => toggleSaveJob(selectedJob.id)}
                      >
                        {selectedJob.saved ? (
                          <>
                            <BookmarkCheck className="h-4 w-4" /> Saved
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-4 w-4" /> Save
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1"
                        disabled={selectedJob.applied}
                        onClick={() => applyToJob(selectedJob.id)}
                      >
                        {selectedJob.applied ? (
                          <>
                            <CheckCircle className="h-4 w-4" /> Applied
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" /> Apply Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Job Description</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedJob.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedJob.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Company Information</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {selectedJob.company} is a leading technology company specializing in innovative software
                          solutions. They have a diverse team of professionals working on cutting-edge projects.
                        </p>
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3 w-3" /> Visit Company Website
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-muted/50 p-4 rounded-md">
                        <h3 className="text-sm font-medium mb-3">Job Details</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm capitalize">{selectedJob.type.replace("-", " ")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedJob.salary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Posted {selectedJob.posted}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium">Match Score</h3>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(selectedJob.matchScore)} bg-${getMatchScoreBgColor(selectedJob.matchScore).replace("bg-", "")}/10`}
                          >
                            {selectedJob.matchScore}% Match
                          </div>
                        </div>
                        <Progress
                          value={selectedJob.matchScore}
                          className={`h-2 mb-4 ${getMatchScoreBgColor(selectedJob.matchScore)}`}
                        />

                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xs font-medium mb-2">Matching Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedJob.skills.matching.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" /> {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-medium mb-2">Missing Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedJob.skills.missing.map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                >
                                  <AlertCircle className="h-3 w-3 mr-1" /> {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" /> AI Insights
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">
                          This job is a strong match for your skills. Consider highlighting your experience with{" "}
                          {selectedJob.skills.matching.slice(0, 3).join(", ")} in your application.
                        </p>
                        <Button size="sm" className="w-full gap-2">
                          <Zap className="h-4 w-4" /> Tailor Resume for This Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t py-4 flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" /> View on Job Board
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1"
                    disabled={selectedJob.applied}
                    onClick={() => applyToJob(selectedJob.id)}
                  >
                    {selectedJob.applied ? (
                      <>
                        <CheckCircle className="h-4 w-4" /> Applied
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Apply Now
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

function JobsLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[400px] rounded-lg" />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Skeleton className="h-10 w-full md:w-80" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          <Skeleton className="h-10 w-[300px] mb-6" />

          <div className="space-y-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[120px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  )
}

interface JobCardProps {
  job: Job
  isSelected: boolean
  onSelect: () => void
  onSave: () => void
  onApply: () => void
}

function JobCard({ job, isSelected, onSelect, onSave, onApply }: JobCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getMatchScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer ${
        isSelected ? "border-primary/50 shadow-md" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)} bg-${getMatchScoreBgColor(job.matchScore).replace("bg-", "")}/10`}
            >
              {job.matchScore}% Match
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" /> {job.salary}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> <span className="capitalize">{job.type.replace("-", " ")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Posted {job.posted}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.matching.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-green-500/10 text-green-500 border-green-500/20 text-xs"
              >
                {skill}
              </Badge>
            ))}
            {job.skills.missing.length > 0 && (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">
                {job.skills.missing.length} missing skills
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant={job.saved ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={(e) => {
                e.stopPropagation()
                onSave()
              }}
            >
              {job.saved ? (
                <>
                  <BookmarkCheck className="h-4 w-4" /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" /> Save
                </>
              )}
            </Button>
            <Button
              size="sm"
              className="gap-1"
              disabled={job.applied}
              onClick={(e) => {
                e.stopPropagation()
                onApply()
              }}
            >
              {job.applied ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Applied
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Apply
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

