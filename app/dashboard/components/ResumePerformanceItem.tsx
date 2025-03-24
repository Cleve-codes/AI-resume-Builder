import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, AlertCircle, Eye } from "lucide-react"

interface ResumePerformanceItemProps {
  resume: {
    id: number
    title: string
    lastUpdated: string
    score: number
    status: "draft" | "complete" | "needs_review"
  }
}

export function ResumePerformanceItem({ resume }: ResumePerformanceItemProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Clock className="h-3 w-3 mr-1" /> Draft
          </Badge>
        )
      case "complete":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Complete
          </Badge>
        )
      case "needs_review":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <AlertCircle className="h-3 w-3 mr-1" /> Needs Review
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">{resume.title}</span>
          {getStatusBadge(resume.status)}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getScoreColor(resume.score)}`}>{resume.score}%</span>
          <Badge variant="outline" className="bg-muted">
            <Eye className="h-3 w-3 mr-1" /> 12 views
          </Badge>
        </div>
      </div>
      <Progress value={resume.score} className={`h-2 ${getProgressColor(resume.score)}`} />
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Last updated: {resume.lastUpdated}</span>
        <div className="flex gap-2">
          <span>Keywords: 85%</span>
          <span>Structure: 90%</span>
          <span>Content: 80%</span>
        </div>
      </div>
    </div>
  )
}
