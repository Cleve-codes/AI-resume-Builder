import { motion } from "framer-motion"
import Link from "next/link"
import ResumeCard from "@/components/resume-card"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Resume } from "../types"

interface ResumeGridProps {
  resumes: Resume[]
}

export function ResumeGrid({ resumes }: ResumeGridProps) {
  // Animation variants for staggered grid
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

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {resumes.map((resume) => (
        <motion.div key={resume.id} variants={itemVariants}>
          <ResumeCard resume={resume} />
        </motion.div>
      ))}

      <motion.div variants={itemVariants}>
        <Link href="/dashboard/resume/create" className="block h-full">
          <Card className="border-dashed h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <p className="font-medium mb-1">Create New Resume</p>
            <p className="text-sm text-muted-foreground">Start from scratch or use a template</p>
          </Card>
        </Link>
      </motion.div>
    </motion.div>
  )
}
