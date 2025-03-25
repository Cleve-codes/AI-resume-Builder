"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  BookmarkCheck, 
  Bookmark, 
  CheckCircle, 
  Send,
  ExternalLink
} from "lucide-react"
import { Job } from "../types"

interface JobCardProps {
  job: Job
  isSelected?: boolean
  onSelect: () => void
  onSave: () => void
  onApply: () => void
}

export function JobCard({ job, isSelected = false, onSelect, onSave, onApply }: JobCardProps) {
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
      className={`overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer ${isSelected ? 'border-primary shadow-md' : 'hover:border-primary/50'}`}
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
            <Button
              variant="outline"
              size="sm"
              className="gap-1 ml-auto"
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
            >
              <ExternalLink className="h-4 w-4" /> View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
