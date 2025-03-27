"use client";

import React from "react";
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
  
  // If user data is loaded and the user is not signed in, redirect to sign-in
  if (isLoaded && !isSignedIn) {
    redirect("/sign-in");
  }
  
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
