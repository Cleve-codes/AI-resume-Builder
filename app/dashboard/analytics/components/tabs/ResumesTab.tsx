"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResumePerformanceItem } from "../ResumePerformanceItem"
import { TrendingUp, FileText } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

// Mock data for charts
const resumeScoreHistoryData = [
  { date: "2023-06-01", score: 65 },
  { date: "2023-07-01", score: 68 },
  { date: "2023-08-01", score: 72 },
  { date: "2023-09-01", score: 75 },
  { date: "2023-10-01", score: 80 },
  { date: "2023-11-01", score: 85 },
  { date: "2023-12-01", score: 88 },
]

export function ResumesTab() {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Resume Score History
              </CardTitle>
              <CardDescription>Track how your resume score has improved over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resumeScoreHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      padding={{ left: 30, right: 30 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={formatDate}
                      formatter={(value) => [`${value}%`, "Score"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Resume Score"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" /> Resume Performance
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ResumePerformanceItem
            title="Software Engineer Resume"
            score={88}
            views={124}
            downloads={45}
            lastUpdated="2 weeks ago"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ResumePerformanceItem
            title="Product Manager Resume"
            score={82}
            views={96}
            downloads={32}
            lastUpdated="1 month ago"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ResumePerformanceItem
            title="UX Designer Resume"
            score={75}
            views={68}
            downloads={21}
            lastUpdated="3 months ago"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ResumePerformanceItem
            title="Data Scientist Resume"
            score={79}
            views={52}
            downloads={18}
            lastUpdated="2 months ago"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
