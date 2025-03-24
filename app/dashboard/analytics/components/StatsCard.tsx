"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-primary/10 p-2 rounded-md">{icon}</div>
          {trend === "up" && (
            <div className="flex items-center text-green-500 text-sm font-medium">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              {change}
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center text-red-500 text-sm font-medium">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1 rotate-90" />
              {change}
            </div>
          )}
          {trend === "neutral" && <div className="text-muted-foreground text-sm font-medium">{change}</div>}
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </CardContent>
    </Card>
  )
}
