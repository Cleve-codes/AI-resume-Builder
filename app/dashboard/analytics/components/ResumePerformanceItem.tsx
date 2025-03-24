"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Download, Clock } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface ResumePerformanceItemProps {
  title: string
  score: number
  views: number
  downloads: number
  lastUpdated: string
}

export function ResumePerformanceItem({
  title,
  score,
  views,
  downloads,
  lastUpdated,
}: ResumePerformanceItemProps) {
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 75) return "text-emerald-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Determine score background color
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 75) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium">{title}</h3>
          <div className={`${getScoreColor(score)} font-medium`}>{score}%</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Resume Score</span>
          </div>
          <Progress value={score} className={`h-2 ${getScoreBgColor(score)}`} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Eye className="h-3.5 w-3.5" />
              <span>Views</span>
            </div>
            <span className="font-medium">{views}</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Download className="h-3.5 w-3.5" />
              <span>Downloads</span>
            </div>
            <span className="font-medium">{downloads}</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated</span>
            </div>
            <span className="font-medium">{lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
