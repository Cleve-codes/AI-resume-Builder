import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ResumePerformanceItem } from "./ResumePerformanceItem"

interface ResumePerformanceProps {
  resumes: Array<{
    id: number
    title: string
    lastUpdated: string
    score: number
    status: "draft" | "complete" | "needs_review"
  }>
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export function ResumePerformance({ resumes }: ResumePerformanceProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Resume Performance</CardTitle>
          <CardDescription>How your resumes are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {resumes.map((resume) => (
              <ResumePerformanceItem key={resume.id} resume={resume} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
