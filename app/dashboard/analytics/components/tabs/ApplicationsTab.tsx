"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationItem } from "../ApplicationItem"
import { BarChart2, Briefcase } from "lucide-react"
import {
  AreaChart,
  Area,
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
const applicationTimelineData = [
  { date: "2023-06-01", applications: 3, responses: 1 },
  { date: "2023-07-01", applications: 5, responses: 2 },
  { date: "2023-08-01", applications: 8, responses: 4 },
  { date: "2023-09-01", applications: 12, responses: 6 },
  { date: "2023-10-01", applications: 15, responses: 8 },
  { date: "2023-11-01", applications: 20, responses: 10 },
  { date: "2023-12-01", applications: 18, responses: 9 },
]

export function ApplicationsTab() {
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
                <BarChart2 className="h-5 w-5 text-primary" /> Application Timeline
              </CardTitle>
              <CardDescription>Track your job applications and responses over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={applicationTimelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      padding={{ left: 30, right: 30 }}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={formatDate}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      name="Applications"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorApplications)"
                    />
                    <Area
                      type="monotone"
                      dataKey="responses"
                      name="Responses"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorResponses)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-primary" /> Recent Applications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="Senior Software Engineer"
            company="Tech Innovations Inc."
            date="Dec 15, 2023"
            status="interview"
            matchScore={92}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="Full Stack Developer"
            company="Digital Solutions"
            date="Dec 10, 2023"
            status="applied"
            matchScore={85}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="Frontend Engineer"
            company="User Experience Labs"
            date="Dec 5, 2023"
            status="rejected"
            matchScore={78}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="Backend Developer"
            company="Data Systems Inc."
            date="Nov 28, 2023"
            status="offer"
            matchScore={88}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="DevOps Engineer"
            company="Cloud Solutions"
            date="Nov 20, 2023"
            status="interview"
            matchScore={82}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApplicationItem
            title="Product Manager"
            company="Innovation Hub"
            date="Nov 15, 2023"
            status="rejected"
            matchScore={75}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
