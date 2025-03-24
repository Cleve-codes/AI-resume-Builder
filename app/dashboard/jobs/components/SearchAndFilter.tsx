"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react"

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

interface SearchAndFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  filters: {
    jobTypes: {
      fullTime: boolean
      partTime: boolean
      contract: boolean
      remote: boolean
    }
    matchScore: number[]
    experience: string
    salary: string
    postedWithin: string
  }
  onFilterChange: (filters: any) => void
  expandedFilters: boolean
  onToggleFilters: () => void
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filters,
  onFilterChange,
  expandedFilters,
  onToggleFilters,
}: SearchAndFilterProps) {
  
  // Handle job type filter changes
  const handleJobTypeChange = (type: keyof typeof filters.jobTypes) => {
    const updatedFilters = {
      ...filters,
      jobTypes: {
        ...filters.jobTypes,
        [type]: !filters.jobTypes[type],
      },
    }
    onFilterChange(updatedFilters)
  }

  // Handle match score filter changes
  const handleMatchScoreChange = (value: number[]) => {
    const updatedFilters = {
      ...filters,
      matchScore: value,
    }
    onFilterChange(updatedFilters)
  }

  // Handle other filter changes
  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    }
    onFilterChange(updatedFilters)
  }

  return (
    <motion.div variants={itemVariants} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company, or skills..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Sort by</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Match Score</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Salary (High to Low)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={onToggleFilters}
          >
            <Filter className="h-4 w-4" />
            Filters
            {expandedFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {expandedFilters && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-medium mb-3">Job Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="fullTime"
                      checked={filters.jobTypes.fullTime}
                      onCheckedChange={() => handleJobTypeChange("fullTime")}
                    />
                    <Label htmlFor="fullTime">Full-time</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="partTime"
                      checked={filters.jobTypes.partTime}
                      onCheckedChange={() => handleJobTypeChange("partTime")}
                    />
                    <Label htmlFor="partTime">Part-time</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="contract"
                      checked={filters.jobTypes.contract}
                      onCheckedChange={() => handleJobTypeChange("contract")}
                    />
                    <Label htmlFor="contract">Contract</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remote"
                      checked={filters.jobTypes.remote}
                      onCheckedChange={() => handleJobTypeChange("remote")}
                    />
                    <Label htmlFor="remote">Remote</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Match Score</h3>
                <div className="px-2">
                  <Slider
                    value={filters.matchScore}
                    onValueChange={handleMatchScoreChange}
                    min={0}
                    max={100}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{filters.matchScore[0]}%</span>
                    <span>{filters.matchScore[1]}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Experience Level</h3>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => handleFilterChange("experience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any experience</SelectItem>
                    <SelectItem value="entry">Entry level</SelectItem>
                    <SelectItem value="mid">Mid level</SelectItem>
                    <SelectItem value="senior">Senior level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-3">Posted Within</h3>
                <Select
                  value={filters.postedWithin}
                  onValueChange={(value) => handleFilterChange("postedWithin", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="day">Past 24 hours</SelectItem>
                    <SelectItem value="week">Past week</SelectItem>
                    <SelectItem value="month">Past month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
