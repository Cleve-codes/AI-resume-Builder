"use client"

import { motion } from "framer-motion"
import { HelpCircle, FileText, Video } from "lucide-react"
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
        <TabsList className="mb-6 grid grid-cols-4 md:w-auto">
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4 hidden md:inline" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="guides">
            <FileText className="mr-2 h-4 w-4 hidden md:inline" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4 hidden md:inline" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="troubleshooting">
            <HelpCircle className="mr-2 h-4 w-4 hidden md:inline" />
            Troubleshooting
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
