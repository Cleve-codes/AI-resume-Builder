"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

// Import our modular components
import { useAnalyticsPage } from "./hooks/useAnalyticsPage"
import { PageHeader } from "./components/PageHeader"
import { FilterControls } from "./components/FilterControls"
import { AnalyticsTabs } from "./components/AnalyticsTabs"
import { OverviewTab } from "./components/tabs/OverviewTab"
import { ResumesTab } from "./components/tabs/ResumesTab"
import { ApplicationsTab } from "./components/tabs/ApplicationsTab"
import { SkillsTab } from "./components/tabs/SkillsTab"

export default function AnalyticsPage() {
  const {
    isLoading,
    activeTab,
    timeRange,
    selectedResume,
    handleTabChange,
    handleTimeRangeChange,
    handleResumeChange
  } = useAnalyticsPage()

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <DashboardSidebar /> */}

      <div className="flex-1">
        {/* <DashboardHeader /> */}

        <main className="p-4 sm:p-6 overflow-hidden">
          <div className="py-4 sm:py-6 space-y-4 sm:space-y-6 w-full overflow-hidden">
            <PageHeader
              title="Analytics Dashboard"
              description="Track your resume performance, job applications, and skill gaps"
            />

            {isLoading ? (
              <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 sm:mb-6">
                  <Skeleton className="h-10 w-[200px]" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-[150px]" />
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-[120px] rounded-lg" />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <Skeleton className="h-[400px] rounded-lg" />
                  <Skeleton className="h-[400px] rounded-lg" />
                </div>

                <Skeleton className="h-[400px] rounded-lg" />
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                <FilterControls
                  selectedResume={selectedResume}
                  timeRange={timeRange}
                  onResumeChange={handleResumeChange}
                  onTimeRangeChange={handleTimeRangeChange}
                />

                <AnalyticsTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                <div className="overflow-x-hidden">
                  {activeTab === "overview" && <OverviewTab />}
                  {activeTab === "resumes" && <ResumesTab />}
                  {activeTab === "applications" && <ApplicationsTab />}
                  {activeTab === "skills" && <SkillsTab />}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
