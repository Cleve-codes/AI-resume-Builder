"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, AlertCircle } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface AIAnalysisPanelProps {
  onEnhanceWithAI?: () => void
}

export function AIAnalysisPanel({ onEnhanceWithAI }: AIAnalysisPanelProps) {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-1">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> AI Analysis
          </CardTitle>
          <CardDescription>AI-powered insights about your resume</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Resume Score</h3>
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Overall Score</span>
                  <span className="text-sm font-medium text-amber-500">72%</span>
                </div>
                <Progress value={72} className="h-2 mb-4 bg-amber-500" />
                <p className="text-xs text-muted-foreground">
                  Your resume is good but could use some improvements to make it more effective.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Improvement Suggestions</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm">Add more quantifiable achievements to your work experience.</p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm">Consider adding relevant certifications if you have any.</p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm">Your summary could be more specific about your expertise.</p>
                </div>
              </div>
            </div>

            <Separator />

            <TemplateSelector />

            <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> AI Enhancement
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Let our AI enhance your resume content to make it more impactful and ATS-friendly.
              </p>
              <Button 
                className="w-full gap-2"
                onClick={onEnhanceWithAI}
              >
                <Zap className="h-4 w-4" /> Enhance with AI
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TemplateSelector() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Choose a Template</h3>
      <div className="space-y-2">
        <Select defaultValue="professional">
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Choose a template that best fits your industry and career level.
        </p>
      </div>
    </div>
  )
}
