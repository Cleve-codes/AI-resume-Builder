"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReactNode } from "react"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  hasResumeData: boolean
  uploadContent: ReactNode
  previewContent: ReactNode
}

export function TabNavigation({
  activeTab,
  onTabChange,
  hasResumeData,
  uploadContent,
  previewContent,
}: TabNavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="upload" disabled={activeTab === "preview" && hasResumeData}>
          Upload
        </TabsTrigger>
        <TabsTrigger value="preview" disabled={!hasResumeData}>
          Preview & Edit
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload">
        {uploadContent}
      </TabsContent>

      <TabsContent value="preview">
        {hasResumeData && previewContent}
      </TabsContent>
    </Tabs>
  )
}
