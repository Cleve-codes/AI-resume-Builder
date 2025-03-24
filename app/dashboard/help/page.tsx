"use client"

import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

// Import our modular components
import { useHelpPage } from "./hooks/useHelpPage"
import { PageHeader } from "./components/PageHeader"
import { HelpTabs } from "./components/HelpTabs"
import { ContactForm } from "./components/ContactForm"
import { PopularResources } from "./components/PopularResources"

export default function SupportPage() {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    contactFormData,
    handleContactFormChange,
    handleContactFormSubmit,
  } = useHelpPage()

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <div className="container mx-auto px-4 py-8">
            <PageHeader
              title="Help & Support"
              description="Find answers to common questions or reach out to our support team"
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <HelpTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <ContactForm
                contactFormData={contactFormData}
                onContactFormChange={handleContactFormChange}
                onContactFormSubmit={handleContactFormSubmit}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
