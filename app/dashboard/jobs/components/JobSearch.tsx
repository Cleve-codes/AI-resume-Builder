"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal } from "lucide-react"

interface JobSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  jobCount: {
    all: number
    saved: number
    applied: number
  }
}

export function JobSearch({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  activeTab,
  setActiveTab,
  jobCount,
}: JobSearchProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-9">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Jobs ({jobCount.all})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({jobCount.saved})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({jobCount.applied})</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
} 