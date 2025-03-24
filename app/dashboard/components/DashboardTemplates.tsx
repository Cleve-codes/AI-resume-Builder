import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { TemplateCard } from "./TemplateCard"

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

export function DashboardTemplates() {
  return (
    <>
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <TemplateCard name="Professional" category="Traditional" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TemplateCard name="Modern" category="Creative" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <TemplateCard name="Minimal" category="Clean" />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 text-center">
        <Button variant="link" className="gap-1">
          Browse all templates <ArrowUpRight className="h-3 w-3" />
        </Button>
      </motion.div>
    </>
  )
}
