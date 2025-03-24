"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JobTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
  savedCount: number
  appliedCount: number
}

export function JobTabs({ activeTab, onTabChange, savedCount, appliedCount }: JobTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList>
        <TabsTrigger value="all">All Jobs</TabsTrigger>
        <TabsTrigger value="saved">
          Saved ({savedCount})
        </TabsTrigger>
        <TabsTrigger value="applied">
          Applied ({appliedCount})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
