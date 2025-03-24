"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface SkillRecommendationItemProps {
  skill: string
  demand: "High" | "Medium" | "Low"
  gap: "Missing" | "Low" | "Medium" | "High"
  description: string
}

export function SkillRecommendationItem({
  skill,
  demand,
  gap,
  description,
}: SkillRecommendationItemProps) {
  // Get demand badge
  const getDemandBadge = (demand: string) => {
    switch (demand) {
      case "High":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            High Demand
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Medium Demand
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Low Demand
          </Badge>
        )
      default:
        return null
    }
  }

  const getGapBadge = (gap: string) => {
    switch (gap) {
      case "Missing":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Missing
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Low Gap
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Medium Gap
          </Badge>
        )
      case "High":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            High Gap
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-md mt-0.5">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">{skill}</h3>
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
              <div className="flex flex-wrap gap-2">
                {getDemandBadge(demand)}
                {getGapBadge(gap)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
