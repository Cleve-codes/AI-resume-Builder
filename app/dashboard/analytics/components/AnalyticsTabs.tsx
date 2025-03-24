"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/OverviewTab"
import { ResumesTab } from "./tabs/ResumesTab"
import { ApplicationsTab } from "./tabs/ApplicationsTab"
import { SkillsTab } from "./tabs/SkillsTab"

interface AnalyticsTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function AnalyticsTabs({ activeTab, onTabChange }: AnalyticsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="resumes">Resumes</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
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
