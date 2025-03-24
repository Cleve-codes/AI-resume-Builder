"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FileText, Zap, BarChart } from "lucide-react"

export function ResumeSelection() {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> Resume Selection
        </CardTitle>
        <CardDescription>Choose which resume to match against jobs</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Select defaultValue="software-engineer">
          <SelectTrigger>
            <SelectValue placeholder="Select a resume" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software-engineer">Software Engineer Resume</SelectItem>
            <SelectItem value="product-manager">Product Manager Resume</SelectItem>
            <SelectItem value="ux-designer">UX Designer Resume</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Resume Match Score</span>
            <span className="text-sm font-medium text-green-500">85%</span>
          </div>
          <Progress value={85} className="h-2 mb-2 bg-green-500" />
          <p className="text-xs text-muted-foreground">
            Your resume is well-optimized for software engineering positions
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          <Button variant="outline" size="sm" className="gap-1">
            <Zap className="h-3 w-3" /> Optimize Resume
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <BarChart className="h-3 w-3" /> View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 