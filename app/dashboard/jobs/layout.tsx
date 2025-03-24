"use client"

import { Briefcase } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 