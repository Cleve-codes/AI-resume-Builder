import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Upload, ArrowUpRight } from "lucide-react"
import ResumeCard from "@/components/resume-card"

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

interface DashboardResumesProps {
  resumes: Array<{
    id: number
    title: string
    lastUpdated: string
    score: number
    status: "draft" | "complete" | "needs_review"
  }>
}

export function DashboardResumes({ resumes }: DashboardResumesProps) {
  return (
    <>
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Resumes</h2>
          <div className="flex gap-3">
            <Link href="/dashboard/resume/create">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> Create New
              </Button>
            </Link>
            <Button className="gap-2">
              <Upload className="h-4 w-4" /> Upload Resume
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {resumes.map((resume) => (
          <motion.div key={resume.id} variants={itemVariants}>
            <ResumeCard resume={resume} />
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Link href="/dashboard/resume/create" className="block h-full">
            <div className="border border-dashed rounded-lg h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium mb-1">Create New Resume</p>
              <p className="text-sm text-muted-foreground">Start from scratch or use a template</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 text-center">
        <Link href="/dashboard/resumes">
          <Button variant="link" className="gap-1">
            View all resumes <ArrowUpRight className="h-3 w-3" />
          </Button>
        </Link>
      </motion.div>
    </>
  )
}
