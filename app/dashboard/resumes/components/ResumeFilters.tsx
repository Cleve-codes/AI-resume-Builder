import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, SlidersHorizontal, Grid, List, Plus } from "lucide-react"
import Link from "next/link"

interface ResumeFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  filterStatus: string
  setFilterStatus: (status: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
}

export function ResumeFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}: ResumeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resumes..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] h-9">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_updated">Last Updated</SelectItem>
            <SelectItem value="title_asc">Title (A-Z)</SelectItem>
            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
            <SelectItem value="score_high">Highest Score</SelectItem>
            <SelectItem value="score_low">Lowest Score</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px] h-9">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="needs_review">Needs Review</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-3"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-3"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Link href="/dashboard/resume/create">
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> New Resume
          </Button>
        </Link>
      </div>
    </div>
  )
}
