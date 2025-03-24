"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface PageHeaderProps {
  title: string
  description: string
  searchQuery: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PageHeader({ title, description, searchQuery, onSearchChange }: PageHeaderProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-8">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-muted-foreground mb-6">{description}</p>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search for help topics..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </motion.div>
  )
}
