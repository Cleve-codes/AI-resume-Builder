"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  profileName: string
  profileEmail: string
}

export function PageHeader({ title, description, profileName, profileEmail }: PageHeaderProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <motion.div 
        className="mt-4 md:mt-0 flex items-center gap-3 bg-muted/50 p-3 rounded-lg"
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
