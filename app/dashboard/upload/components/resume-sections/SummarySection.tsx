"use client"

import { Textarea } from "@/components/ui/textarea"

interface SummarySectionProps {
  summary: string
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Professional Summary</h3>
      <div className="space-y-2">
        <Textarea defaultValue={summary} className="min-h-[100px]" />
        <p className="text-xs text-muted-foreground">
          A brief overview of your professional background and key strengths.
        </p>
      </div>
    </div>
  )
}
