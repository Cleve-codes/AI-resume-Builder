"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Job Matches</h1>
      </div>
      <p className="text-muted-foreground">
        Find jobs that match your skills and experience from our curated list
      </p>
    </motion.div>
  )
}
