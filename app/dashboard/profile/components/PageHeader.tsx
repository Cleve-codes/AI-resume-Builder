"use client"

import { motion } from "framer-motion"
import { Settings, User } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  profileName: string
  profileEmail: string
}

export function PageHeader({ title, description, profileName, profileEmail }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
      
      <motion.div 
        className="mt-4 flex items-center gap-3 bg-muted/50 p-3 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">{profileName}</p>
          <p className="text-xs text-muted-foreground">{profileEmail}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
