"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PopularResources() {
  const resources = [
    { title: "Resume Templates Guide", icon: <FileText className="h-4 w-4" /> },
    { title: "ATS Optimization Tips", icon: <FileText className="h-4 w-4" /> },
    { title: "Interview Preparation", icon: <FileText className="h-4 w-4" /> },
    { title: "Cover Letter Examples", icon: <FileText className="h-4 w-4" /> },
    { title: "Career Change Resources", icon: <FileText className="h-4 w-4" /> },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Popular Resources</CardTitle>
        <CardDescription>Quick links to our most helpful resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="mr-3 text-primary">{resource.icon}</div>
              <span className="text-sm">{resource.title}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
