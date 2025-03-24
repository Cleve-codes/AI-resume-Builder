"use client"

import { motion } from "framer-motion"
import { FileUp } from "lucide-react"

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <FileUp className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Upload Resume</h1>
      </div>
      <p className="text-muted-foreground">Upload your existing resume to get started or enhance it with AI</p>
    </motion.div>
  )
}
