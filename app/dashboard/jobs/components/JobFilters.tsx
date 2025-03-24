"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"

interface FiltersType {
  jobTypes: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    remote: boolean;
  };
  matchScore: number[];
  locations: string[];
  experience: string;
  salary: string;
  postedWithin: string;
}

interface JobFiltersProps {
  filters: FiltersType;
  updateFilter: (category: string, value: any) => void;
  updateJobTypeFilter: (type: keyof FiltersType['jobTypes'], checked: boolean) => void;
  resetFilters: () => void;
}

export function JobFilters({ filters, updateFilter, updateJobTypeFilter, resetFilters }: JobFiltersProps) {
  const [expandedFilters, setExpandedFilters] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" /> Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedFilters(!expandedFilters)}
            className="gap-1"
          >
            {expandedFilters ? (
              <>
                Less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                More <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Job Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="full-time"
                  checked={filters.jobTypes.fullTime}
                  onCheckedChange={(checked) => updateJobTypeFilter("fullTime", checked as boolean)}
                />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="part-time"
                  checked={filters.jobTypes.partTime}
                  onCheckedChange={(checked) => updateJobTypeFilter("partTime", checked as boolean)}
                />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contract"
                  checked={filters.jobTypes.contract}
                  onCheckedChange={(checked) => updateJobTypeFilter("contract", checked as boolean)}
                />
                <Label htmlFor="contract">Contract</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={filters.jobTypes.remote}
                  onCheckedChange={(checked) => updateJobTypeFilter("remote", checked as boolean)}
                />
                <Label htmlFor="remote">Remote</Label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">Match Score</h3>
              <span className="text-sm">
                {filters.matchScore[0]}% - {filters.matchScore[1]}%
              </span>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={filters.matchScore}
              onValueChange={(value) => updateFilter("matchScore", value)}
              className="py-2"
            />
          </div>

          {expandedFilters && (
            <>
              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => updateFilter("experience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Experience</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                <Select value={filters.salary} onValueChange={(value) => updateFilter("salary", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Salary</SelectItem>
                    <SelectItem value="50k">$50,000+</SelectItem>
                    <SelectItem value="75k">$75,000+</SelectItem>
                    <SelectItem value="100k">$100,000+</SelectItem>
                    <SelectItem value="150k">$150,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Posted Within</h3>
                <Select
                  value={filters.postedWithin}
                  onValueChange={(value) => updateFilter("postedWithin", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="day">Past 24 Hours</SelectItem>
                    <SelectItem value="week">Past Week</SelectItem>
                    <SelectItem value="month">Past Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="easy-apply" className="text-sm font-medium">
                  Easy Apply Only
                </Label>
                <Switch id="easy-apply" />
              </div>
            </>
          )}

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
            <Button size="sm">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 