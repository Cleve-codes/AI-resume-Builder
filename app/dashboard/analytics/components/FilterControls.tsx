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
    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4 sm:mb-6 w-full overflow-hidden">
      <div className="flex flex-col xs:flex-row gap-3 items-start xs:items-center">
        <Select value={selectedResume} onValueChange={onResumeChange}>
          <SelectTrigger className="w-full xs:w-[180px] sm:w-[200px] h-9">
            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
            <SelectValue placeholder="Select resume" className="text-sm truncate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resumes</SelectItem>
            <SelectItem value="software-engineer">Software Engineer Resume</SelectItem>
            <SelectItem value="product-manager">Product Manager Resume</SelectItem>
            <SelectItem value="ux-designer">UX Designer Resume</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-full xs:w-[140px] sm:w-[150px] h-9">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <SelectValue placeholder="Time range" className="text-sm truncate" />
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
