"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Zap, FilePlus2 } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface AIFeaturesPanelProps {
  onCreateFromScratch?: () => void
}

export function AIFeaturesPanel({ onCreateFromScratch }: AIFeaturesPanelProps) {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-1">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> AI-Powered Parsing
          </CardTitle>
          <CardDescription>How our AI helps with your resume</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Automatic Information Extraction</h4>
                <p className="text-xs text-muted-foreground">
                  Our AI extracts your contact details, work history, education, and skills automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Smart Formatting</h4>
                <p className="text-xs text-muted-foreground">
                  Converts your resume into a standardized format that's easy to edit and optimize.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Content Enhancement</h4>
                <p className="text-xs text-muted-foreground">
                  Suggests improvements to your resume content based on industry best practices.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium">ATS Optimization</h4>
                <p className="text-xs text-muted-foreground">
                  Analyzes your resume for ATS compatibility and suggests improvements.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm mb-4">Don't have a resume yet?</p>
            <Button 
              variant="outline" 
              className="gap-2 w-full"
              onClick={onCreateFromScratch}
            >
              <FilePlus2 className="h-4 w-4" /> Create From Scratch
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
