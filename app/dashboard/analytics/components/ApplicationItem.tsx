"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface ApplicationItemProps {
  title: string
  company: string
  date: string
  status: "applied" | "interview" | "rejected" | "offer"
  matchScore: number
}

export function ApplicationItem({ title, company, date, status, matchScore }: ApplicationItemProps) {
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Applied
          </Badge>
        )
      case "interview":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Interview
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Rejected
          </Badge>
        )
      case "offer":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Offer
          </Badge>
        )
      default:
        return null
    }
  }

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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{company}</span>
            </div>
          </div>
          {getStatusBadge(status)}
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Match Score</span>
            <span className={`text-sm font-medium ${getMatchScoreColor(matchScore)}`}>
              {matchScore}%
            </span>
          </div>
          <Progress value={matchScore} className={`h-1.5 ${getMatchScoreBgColor(matchScore)}`} />
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
