"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building,
  MapPin,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Send,
  BarChart,
} from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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

interface JobCardProps {
  job: Job
  isSelected: boolean
  onSelect: () => void
  onSave: () => void
  onApply: () => void
}

export function JobCard({ job, isSelected, onSelect, onSave, onApply }: JobCardProps) {
  // Determine match score color
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 75) return "text-emerald-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Determine match score background color
  const getMatchScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 75) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? "border-primary/50 bg-primary/5 shadow-sm" : "hover:border-muted-foreground/30"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="font-normal">
            {job.type.replace("-", " ")}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1 mr-4">
          <Building className="h-3.5 w-3.5" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center gap-1 mr-4">
          <MapPin className="h-3.5 w-3.5" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{job.posted}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Match Score</span>
          <span className={`text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}>
            {job.matchScore}%
          </span>
        </div>
        <Progress
          value={job.matchScore}
          className={`h-1.5 ${getMatchScoreBgColor(job.matchScore)}`}
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {job.skills.matching.slice(0, 3).map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
          >
            {skill}
          </Badge>
        ))}
        {job.skills.matching.length > 3 && (
          <Badge variant="outline">+{job.skills.matching.length - 3} more</Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant={job.saved ? "default" : "outline"}
          size="sm"
          className="flex-1 gap-1"
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
          variant={job.applied ? "default" : "outline"}
          size="sm"
          className="flex-1 gap-1"
          disabled={job.applied}
          onClick={(e) => {
            e.stopPropagation()
            onApply()
          }}
        >
          {job.applied ? (
            <>
              <Send className="h-4 w-4" /> Applied
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Apply
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
