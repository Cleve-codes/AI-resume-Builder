"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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
import { Job } from "../types"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <CardTitle className="text-lg sm:text-xl mb-1 break-words">{job.title}</CardTitle>
              <CardDescription className="flex flex-wrap gap-y-2 text-sm">
                <div className="flex items-center gap-1 mr-4 mb-1 sm:mb-0">
                  <Building className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{job.company}</span>
                </div>
                <div className="flex items-center gap-1 mr-4 mb-1 sm:mb-0">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 mr-4 mb-1 sm:mb-0">
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Posted {job.posted}</span>
                </div>
                <div className="flex items-center gap-1 mr-4 mb-1 sm:mb-0">
                  <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="capitalize">{job.type.replace("-", " ")}</span>
                </div>
              </CardDescription>
            </div>
            <Badge
              className={`${getMatchScoreBgColor(job.matchScore)} text-white border-none whitespace-nowrap self-start sm:self-auto`}
            >
              {job.matchScore}% Match
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 px-4 sm:px-6">
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div className="flex flex-col sm:flex-row gap-2" variants={itemVariants}>
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
                className="flex-1 gap-1"
                disabled={job.applied}
                onClick={onApply}
              >
                {job.applied ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Applied
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Apply Now
                  </>
                )}
              </Button>
            </motion.div>

            <Separator />

            <motion.div variants={itemVariants}>
              <h3 className="font-medium mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line break-words">{job.description}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="font-medium mb-2">Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span className="break-words">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <Separator />

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <h3 className="font-medium">Skills Match</h3>
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span>Match Score</span>
                    <span className={getMatchScoreColor(job.matchScore)}>
                      {job.matchScore}%
                    </span>
                  </div>
                  <Progress
                    value={job.matchScore}
                    className={`h-1.5 ${getMatchScoreBgColor(job.matchScore)}`}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-sm mb-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    <span>Matching Skills</span>
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
                    <div className="flex items-center gap-1 text-sm mb-2">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                      <span>Missing Skills</span>
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
            </motion.div>

            <Separator />

            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <div>
                <h3 className="font-medium mb-2">Similar Jobs</h3>
                <div className="text-sm text-muted-foreground">Want to explore more options? Check out similar jobs based on your profile.</div>
              </div>

              <Button variant="outline" className="w-full sm:w-auto gap-1">
                <ExternalLink className="h-4 w-4" />
                View Similar Jobs
              </Button>
            </motion.div>

            <Separator />

            <motion.div variants={itemVariants}>
              <h3 className="font-medium mb-2">Company Information</h3>
              <div className="text-sm text-muted-foreground">
                {job.company} is a leading company in the technology industry, specializing in innovative solutions for businesses and consumers. With a strong commitment to quality and customer satisfaction, they have established themselves as a trusted brand in the market.
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto gap-1" disabled={job.applied} onClick={onApply}>
                {job.applied ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Applied
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Apply Now
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto gap-1">
                <BarChart className="h-4 w-4" />
                <span>Analyze Match</span>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
