import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Edit, 
  Download, 
  Trash2, 
  Copy, 
  MoreHorizontal, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from "lucide-react"

interface Resume {
  id: number
  title: string
  lastUpdated: string
  score: number
  status: "draft" | "complete" | "needs_review"
  template: string
}

export function ResumeListItem({ resume }: { resume: Resume }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
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
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center mr-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{resume.title}</h3>
              {getStatusBadge(resume.status)}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Template: {resume.template}</span>
              <span>Updated: {formatDate(resume.lastUpdated)}</span>
              <span className="flex items-center">
                Score:{" "}
                <span
                  className={`ml-1 font-medium ${
                    resume.score >= 80 ? "text-green-500" : resume.score >= 60 ? "text-amber-500" : "text-red-500"
                  }`}
                >
                  {resume.score}%
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/dashboard/resume/${resume.id}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" /> Edit
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
        </div>
      </CardContent>
    </Card>
  )
}
