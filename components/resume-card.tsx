import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Download, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ResumeProps {
  resume: {
    id: number
    title: string
    lastUpdated: string
    score: number
  }
}

export default function ResumeCard({ resume }: ResumeProps) {
  const { id, title, lastUpdated, score } = resume

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

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-lg line-clamp-1" title={title}>{title}</CardTitle>
        <p className="text-xs text-muted-foreground">Last updated: {formatDate(lastUpdated)}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">ATS Score</span>
            <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 flex-shrink-0">
        <Link href={`/dashboard/resume/${id}`} className="flex-1">
          <Button variant="outline" className="w-full gap-2 h-9">
            <Edit className="h-4 w-4" /> <span className="hidden sm:inline">Edit</span>
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0 text-destructive h-9 w-9">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

