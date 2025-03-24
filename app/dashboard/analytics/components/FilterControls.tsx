"use client"

import { FileText, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterControlsProps {
  selectedResume: string
  timeRange: string
  onResumeChange: (value: string) => void
  onTimeRangeChange: (value: string) => void
}

export function FilterControls({
  selectedResume,
  timeRange,
  onResumeChange,
  onTimeRangeChange,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div className="flex gap-3 items-center">
        <Select value={selectedResume} onValueChange={onResumeChange}>
          <SelectTrigger className="w-[200px] h-9">
            <FileText className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select resume" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resumes</SelectItem>
            <SelectItem value="software-engineer">Software Engineer Resume</SelectItem>
            <SelectItem value="product-manager">Product Manager Resume</SelectItem>
            <SelectItem value="ux-designer">UX Designer Resume</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[150px] h-9">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
