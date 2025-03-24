"use client"

import { FileText, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function GuidesTab() {
  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of our platform and how to create your first resume",
      icon: <FileText className="h-5 w-5 text-primary" />,
      badge: "Beginner",
    },
    {
      title: "Advanced Resume Optimization",
      description: "Tips and techniques to make your resume stand out to employers and ATS systems",
      icon: <FileText className="h-5 w-5 text-primary" />,
      badge: "Advanced",
    },
    {
      title: "Job Matching & Applications",
      description: "How to use our job matching feature to find and apply to the right positions",
      icon: <FileText className="h-5 w-5 text-primary" />,
      badge: "Intermediate",
    },
    {
      title: "Using AI for Resume Enhancement",
      description: "Leverage our AI tools to improve your resume content and formatting",
      icon: <FileText className="h-5 w-5 text-primary" />,
      badge: "Advanced",
    },
    {
      title: "Analytics & Performance Tracking",
      description: "Understanding your resume performance and application statistics",
      icon: <FileText className="h-5 w-5 text-primary" />,
      badge: "Intermediate",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Help Guides & Tutorials</CardTitle>
        <CardDescription>Step-by-step guides to help you make the most of our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="flex items-start p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="mr-4 mt-1">{guide.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{guide.title}</h3>
                  <Badge variant="outline" className="ml-2">
                    {guide.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
