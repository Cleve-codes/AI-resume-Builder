import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { ActivityItem } from "./ActivityItem"

interface RecentActivityProps {
  activities: Array<{
    id: number
    type: string
    title: string
    time: string
  }>
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-center">
          <Button variant="link" className="gap-1 text-xs">
            View all activity <ArrowUpRight className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
