import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock } from "lucide-react"
import React from "react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendUp = true,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="text-3xl font-bold">{value}</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        {trend && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">{description}</p>
            <div className={`text-xs flex items-center gap-1 ${trendUp ? "text-green-500" : "text-amber-500"}`}>
              {trendUp ? <TrendingUp className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {trend}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
