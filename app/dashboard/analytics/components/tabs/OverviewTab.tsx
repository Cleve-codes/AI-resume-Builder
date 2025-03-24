"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "../StatsCard"
import { Eye, Briefcase, Users, Target, TrendingUp, PieChartIcon, Activity } from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
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
const resumeViewsData = [
  { name: "Jan", views: 12 },
  { name: "Feb", views: 19 },
  { name: "Mar", views: 15 },
  { name: "Apr", views: 27 },
  { name: "May", views: 34 },
  { name: "Jun", views: 30 },
  { name: "Jul", views: 41 },
  { name: "Aug", views: 48 },
  { name: "Sep", views: 52 },
  { name: "Oct", views: 60 },
  { name: "Nov", views: 67 },
  { name: "Dec", views: 71 },
]

const applicationStatusData = [
  { name: "Applied", value: 24 },
  { name: "Interviews", value: 8 },
  { name: "Offers", value: 3 },
  { name: "Rejected", value: 13 },
]

const applicationStatusColors = ["#6366f1", "#22c55e", "#3b82f6", "#ef4444"]

const jobMatchTrendsData = [
  { name: "Week 1", matches: 12, applications: 5, interviews: 0 },
  { name: "Week 2", matches: 18, applications: 8, interviews: 2 },
  { name: "Week 3", matches: 15, applications: 6, interviews: 3 },
  { name: "Week 4", matches: 25, applications: 10, interviews: 4 },
  { name: "Week 5", matches: 30, applications: 12, interviews: 5 },
  { name: "Week 6", matches: 28, applications: 9, interviews: 3 },
  { name: "Week 7", matches: 35, applications: 15, interviews: 6 },
  { name: "Week 8", matches: 40, applications: 18, interviews: 7 },
]

export function OverviewTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Resume Views"
            value="248"
            change="+12%"
            trend="up"
            icon={<Eye className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatsCard
            title="Applications"
            value="24"
            change="+8"
            trend="up"
            icon={<Briefcase className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatsCard
            title="Interviews"
            value="8"
            change="+3"
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatsCard
            title="Average Match Score"
            value="78%"
            change="+5%"
            trend="up"
            icon={<Target className="h-5 w-5 text-primary" />}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Resume Views Trend
              </CardTitle>
              <CardDescription>Number of times your resumes have been viewed over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resumeViewsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#6366f1" fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" /> Application Status
              </CardTitle>
              <CardDescription>Breakdown of your job application statuses</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={applicationStatusColors[index % applicationStatusColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Job Match Trends
              </CardTitle>
              <CardDescription>
                Tracking your job matches, applications, and interviews over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={jobMatchTrendsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Bar dataKey="matches" fill="#6366f1" name="Job Matches" />
                    <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                    <Line type="monotone" dataKey="interviews" stroke="#22c55e" name="Interviews" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
