"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/OverviewTab"
import { ResumesTab } from "./tabs/ResumesTab"
import { ApplicationsTab } from "./tabs/ApplicationsTab"
import { SkillsTab } from "./tabs/SkillsTab"
import { BarChart2, FileText, BriefcaseBusiness, Lightbulb } from "lucide-react"

interface AnalyticsTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function AnalyticsTabs({ activeTab, onTabChange }: AnalyticsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full flex mb-6 justify-between h-auto rounded-md">
        <TabsTrigger 
          value="overview" 
          className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
        >
          <BarChart2 className="h-4 w-4" />
          <span className="hidden xs:block text-xs sm:text-sm">Overview</span>
        </TabsTrigger>
        <TabsTrigger 
          value="resumes"
          className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden xs:block text-xs sm:text-sm">Resumes</span>
        </TabsTrigger>
        <TabsTrigger 
          value="applications"
          className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
        >
          <BriefcaseBusiness className="h-4 w-4" />
          <span className="hidden xs:block text-xs sm:text-sm">Applications</span>
        </TabsTrigger>
        <TabsTrigger 
          value="skills"
          className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
        >
          <Lightbulb className="h-4 w-4" />
          <span className="hidden xs:block text-xs sm:text-sm">Skills</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="resumes" className="mt-0">
        <ResumesTab />
      </TabsContent>

      <TabsContent value="applications" className="mt-0">
        <ApplicationsTab />
      </TabsContent>

      <TabsContent value="skills" className="mt-0">
        <SkillsTab />
      </TabsContent>
    </Tabs>
  )
}
