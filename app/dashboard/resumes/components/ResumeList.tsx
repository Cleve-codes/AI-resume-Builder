import { motion } from "framer-motion"
import { ResumeListItem } from "./ResumeListItem"
import { Resume } from "../types"

interface ResumeListProps {
  resumes: Resume[]
}

export function ResumeList({ resumes }: ResumeListProps) {
  // Animation variants for staggered list
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div
      className="space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {resumes.map((resume) => (
        <motion.div key={resume.id} variants={itemVariants}>
          <ResumeListItem resume={resume} />
        </motion.div>
      ))}
    </motion.div>
  )
}
