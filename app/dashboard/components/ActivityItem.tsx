import { FileText, Zap, Briefcase, Plus, Calendar } from "lucide-react"

interface ActivityItemProps {
  activity: {
    id: number
    type: string
    title: string
    time: string
  }
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "resume_updated":
        return (
          <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-500" />
          </div>
        )
      case "ai_suggestion":
        return (
          <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-purple-500" />
          </div>
        )
      case "job_match":
        return (
          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-green-500" />
          </div>
        )
      case "resume_created":
        return (
          <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
            <Plus className="h-4 w-4 text-amber-500" />
          </div>
        )
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <Calendar className="h-4 w-4" />
          </div>
        )
    }
  }

  return (
    <div className="flex gap-3">
      {getActivityIcon(activity.type)}
      <div>
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-muted-foreground">{activity.time}</p>
      </div>
    </div>
  )
}
