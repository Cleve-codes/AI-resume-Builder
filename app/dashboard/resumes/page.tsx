"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Search, FileText, Clock, Share2, LayoutTemplate } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

// Import components
import { LoadingState } from "./components/LoadingState"
import { EmptyState } from "./components/EmptyState"
import { ResumeFilters } from "./components/ResumeFilters"
import { ResumeGrid } from "./components/ResumeGrid"
import { ResumeList } from "./components/ResumeList"

// Import types and utils
import { Resume } from "./types"
import { filterAndSortResumes } from "./utils/resumeFilters"
import { usePageNotification } from "@/app/hooks/usePageNotification"

export default function ResumesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("last_updated")
  const [filterStatus, setFilterStatus] = useState("all")

  // Show resumes page notification
  usePageNotification({
    title: "My Resumes",
    description: "Create, manage, and organize your resumes in one place",
    duration: 4000,
    type: "default"
  });

  // Simulate loading resumes from API
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would be an API call in a real application
      // For demo purposes, we'll randomly decide if the user has resumes or not
      const hasResumes = Math.random() > 0.5 // Comment this out and set to true or false to force a specific state

      if (hasResumes) {
        setResumes([
          {
            id: 1,
            title: "Software Engineer Resume",
            lastUpdated: "2023-11-15",
            score: 85,
            status: "complete",
            template: "Professional",
          },
          {
            id: 2,
            title: "Product Manager Resume",
            lastUpdated: "2023-10-28",
            score: 72,
            status: "needs_review",
            template: "Modern",
          },
          {
            id: 3,
            title: "UX Designer Resume",
            lastUpdated: "2023-11-05",
            score: 90,
            status: "complete",
            template: "Creative",
          },
          {
            id: 4,
            title: "Data Scientist Draft",
            lastUpdated: "2023-11-10",
            score: 45,
            status: "draft",
            template: "Minimal",
          },
        ])
      } else {
        setResumes([])
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort resumes
  const filteredResumes = filterAndSortResumes(resumes, searchQuery, filterStatus, sortBy)

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <DashboardSidebar /> */}

      <div className="flex-1">
        {/* <DashboardHeader /> */}

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
            <p className="text-muted-foreground">Manage and organize all your resumes in one place</p>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : resumes.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ResumeFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="w-full flex justify-between h-auto rounded-md">
                  <TabsTrigger 
                    value="all" 
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden xs:block text-xs sm:text-sm">All ({resumes.length})</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recent"
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="hidden xs:block text-xs sm:text-sm">Recent</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shared"
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden xs:block text-xs sm:text-sm">Shared</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="templates"
                    className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
                  >
                    <LayoutTemplate className="h-4 w-4" />
                    <span className="hidden xs:block text-xs sm:text-sm">Templates</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  {filteredResumes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No resumes found</h3>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any resumes matching your search criteria.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setFilterStatus("all")
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : viewMode === "grid" ? (
                    <ResumeGrid resumes={filteredResumes} />
                  ) : (
                    <ResumeList resumes={filteredResumes} />
                  )}
                </TabsContent>

                <TabsContent value="recent" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">This tab would show your recently updated resumes.</p>
                  </div>
                </TabsContent>

                <TabsContent value="shared" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">This tab would show resumes shared with you by others.</p>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">This tab would show your custom resume templates.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
