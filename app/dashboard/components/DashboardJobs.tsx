import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export function DashboardJobs() {
  return (
    <>
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-6">Job Matches</h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="pt-6">
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Job matches would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
