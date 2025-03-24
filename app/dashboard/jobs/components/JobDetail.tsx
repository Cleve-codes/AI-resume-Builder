"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Zap,
  CheckCircle,
  AlertCircle,
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

interface JobDetailProps {
  job: Job
  onSave: () => void
  onApply: () => void
}

export function JobDetail({ job, onSave, onApply }: JobDetailProps) {
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
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mr-4">
                  <Building className="h-3.5 w-3.5" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1 mr-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 mr-4">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{job.posted}</span>
                </div>
                <div className="flex items-center gap-1 mr-4">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{job.type.replace("-", " ")}</span>
                </div>
              </div>
            </div>
            <Badge
              className={`${getMatchScoreBgColor(job.matchScore)} text-white border-none`}
            >
              {job.matchScore}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={job.saved ? "default" : "outline"}
                className="flex-1 gap-1"
                onClick={onSave}
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
                className="flex-1 gap-1"
                disabled={job.applied}
                onClick={onApply}
              >
                {job.applied ? (
                  <>
                    <Send className="h-4 w-4" /> Applied
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Apply Now
                  </>
                )}
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Skills Match</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Matching Skills</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.matching.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-500/10 hover:bg-green-500/20 text-green-500 border-green-500/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {job.skills.missing.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1 text-sm">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span>Skills to Develop</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.missing.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> AI Recommendation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your skills and experience, this job is a {job.matchScore >= 80 ? "strong" : "good"} match for your profile. 
                {job.matchScore < 80 && " Consider highlighting your relevant experience in your application."}
              </p>
              <Button variant="outline" className="w-full gap-2">
                <BarChart className="h-4 w-4" /> View Full Match Analysis
              </Button>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-3.5 w-3.5" /> View on Company Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
