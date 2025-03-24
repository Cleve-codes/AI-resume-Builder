"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface NoJobsFoundProps {
  resetFilters: () => void
}

export function NoJobsFound({ resetFilters }: NoJobsFoundProps) {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">No jobs found</h3>
      <p className="text-muted-foreground mb-6">
        We couldn't find any jobs matching your search criteria.
      </p>
      <Button variant="outline" onClick={resetFilters}>
        Clear Filters
      </Button>
    </Card>
  )
} 