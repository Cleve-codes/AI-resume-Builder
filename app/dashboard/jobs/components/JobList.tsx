"use client"

import { motion } from "framer-motion"
import { JobCard } from "./JobCard"

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

interface JobListProps {
  jobs: Job[]
  selectedJobId: number | null
  onSelectJob: (job: Job) => void
  onSaveJob: (jobId: number) => void
  onApplyJob: (jobId: number) => void
}

export function JobList({ jobs, selectedJobId, onSelectJob, onSaveJob, onApplyJob }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/20">
        <p className="text-muted-foreground mb-2">No jobs match your current filters</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search criteria or filters</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSelected={selectedJobId === job.id}
          onSelect={() => onSelectJob(job)}
          onSave={() => onSaveJob(job.id)}
          onApply={() => onApplyJob(job.id)}
        />
      ))}
    </motion.div>
  )
}
