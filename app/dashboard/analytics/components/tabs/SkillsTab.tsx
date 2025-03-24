"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillRecommendationItem } from "../SkillRecommendationItem"
import { BarChart, Lightbulb } from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
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
const skillsMatchData = [
  { name: "JavaScript", match: 90 },
  { name: "React", match: 85 },
  { name: "TypeScript", match: 75 },
  { name: "Node.js", match: 80 },
  { name: "CSS", match: 70 },
  { name: "HTML", match: 95 },
  { name: "Git", match: 85 },
  { name: "SQL", match: 65 },
  { name: "AWS", match: 60 },
  { name: "Docker", match: 55 },
]

export function SkillsTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" /> Skills Match Analysis
              </CardTitle>
              <CardDescription>How your skills match with job market requirements</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={skillsMatchData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Match Score"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="match"
                      name="Match Score"
                      fill="#6366f1"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-primary" /> Skill Recommendations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div variants={itemVariants}>
          <SkillRecommendationItem
            skill="GraphQL"
            demand="High"
            gap="Missing"
            description="GraphQL is increasingly being adopted for API development. Adding this to your skillset would significantly improve your job prospects."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillRecommendationItem
            skill="Next.js"
            demand="High"
            gap="Low"
            description="You have some experience with Next.js, but enhancing this skill would make you more competitive for modern React development roles."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillRecommendationItem
            skill="CI/CD Pipelines"
            demand="Medium"
            gap="Medium"
            description="Continuous Integration and Deployment skills are valuable for DevOps positions and increasingly expected for full-stack developers."
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SkillRecommendationItem
            skill="Cloud Architecture"
            demand="High"
            gap="High"
            description="Deeper knowledge of cloud architecture patterns would complement your existing AWS skills and open up more senior-level positions."
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
