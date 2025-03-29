"use client"

import { motion } from "framer-motion"
import { HelpCircle, FileText, Video, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaqTab } from "./tabs/FaqTab"
import { GuidesTab } from "./tabs/GuidesTab"
import { VideosTab } from "./tabs/VideosTab"
import { TroubleshootingTab } from "./tabs/TroubleshootingTab"

interface HelpTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function HelpTabs({ activeTab, onTabChange }: HelpTabsProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-2">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full flex mb-6 justify-between h-auto rounded-md">
          <TabsTrigger 
            value="faq"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">FAQs</span>
          </TabsTrigger>
          <TabsTrigger 
            value="guides"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Guides</span>
          </TabsTrigger>
          <TabsTrigger 
            value="videos"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <Video className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Videos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="troubleshooting"
            className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="hidden xs:block text-xs sm:text-sm">Help</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-0">
          <FaqTab />
        </TabsContent>

        <TabsContent value="guides" className="mt-0">
          <GuidesTab />
        </TabsContent>

        <TabsContent value="videos" className="mt-0">
          <VideosTab />
        </TabsContent>

        <TabsContent value="troubleshooting" className="mt-0">
          <TroubleshootingTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
