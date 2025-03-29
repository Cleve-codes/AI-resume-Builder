"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // If user data is loaded and the user is not signed in, redirect to sign-in
  if (isLoaded && !isSignedIn) {
    redirect("/sign-in");
  }
  
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      <DashboardSidebar 
        isMobileOpen={isMobileMenuOpen} 
        setIsMobileOpen={setIsMobileMenuOpen} 
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <main className="px-4 pt-3 pb-6 sm:p-4 md:p-6 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
