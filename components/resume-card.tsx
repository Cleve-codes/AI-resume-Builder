import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Download, Trash2, Copy, MoreHorizontal, Clock, CheckCircle2, AlertCircle } from "lucide-react"


interface ResumeProps {
  resume: {
    id: number
    title: string
    lastUpdated: string
    score: number
    status?: "draft" | "complete" | "needs_review"
    template?: string
  }
}

export default function ResumeCard({ resume }: ResumeProps) {
  const { id, title, lastUpdated, score, status = "draft", template = "Professional" } = resume

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

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

  const getStatusBadge = () => {
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
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <div className="relative h-36 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center border-b">
        <div className="absolute top-2 right-2">{getStatusBadge()}</div>
        <div className="text-4xl font-bold text-primary/20">{template.charAt(0)}</div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <Copy className="h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Download className="h-4 w-4" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground">Last updated: {formatDate(lastUpdated)}</p>
      </CardHeader>

      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">ATS Score</span>
            <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}%</span>
          </div>
          <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
          <div className="px-2 py-1 bg-muted rounded-md">{template}</div>
          <div className="px-2 py-1 bg-muted rounded-md">1 page</div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 pt-0">
        <Link href={`/dashboard/resume/${id}`} className="flex-1">
          <Button variant="default" className="w-full gap-2">
            <Edit className="h-4 w-4" /> Edit
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="shrink-0">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

