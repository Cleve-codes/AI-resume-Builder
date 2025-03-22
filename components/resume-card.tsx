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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">Last updated: {formatDate(lastUpdated)}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">ATS Score</span>
            <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}%</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Link href={`/dashboard/resume/${id}`} className="flex-1">
          <Button variant="outline" className="w-full gap-2">
            <Edit className="h-4 w-4" /> Edit
          </Button>
        </Link>
        <Button variant="outline" size="icon" className="shrink-0">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="shrink-0 text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

