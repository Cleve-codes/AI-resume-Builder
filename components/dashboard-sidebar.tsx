"use client";

import { useState, useEffect } from "react";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard, FileUp, Briefcase, BarChart, Settings, HelpCircle, LogOut, User } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function DashboardSidebar({ isMobileOpen, setIsMobileOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      // Clerk will handle the redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-full p-1.5">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="p-4">
        <nav className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            active={pathname === "/dashboard"}
            onClick={() => setIsMobileOpen?.(false)}
          />
          <NavItem
            href="/dashboard/resumes"
            icon={<FileText className="h-5 w-5" />}
            label="My Resumes"
            active={pathname.startsWith("/dashboard/resumes")}
            onClick={() => setIsMobileOpen?.(false)}
          />
          <NavItem
            href="/dashboard/profile"
            icon={<User className="h-5 w-5" />}
            label="My Profile"
            active={pathname === "/dashboard/profile"}
            onClick={() => setIsMobileOpen?.(false)}
          />
          <NavItem
            href="/dashboard/upload"
            icon={<FileUp className="h-5 w-5" />}
            label="Upload Resume"
            active={pathname === "/dashboard/upload"}
            onClick={() => setIsMobileOpen?.(false)}
          />
          <NavItem
            href="/dashboard/jobs"
            icon={<Briefcase className="h-5 w-5" />}
            label="Job Matches"
            active={pathname.startsWith("/dashboard/jobs")}
            onClick={() => setIsMobileOpen?.(false)}
          />
          <NavItem
            href="/dashboard/analytics"
            icon={<BarChart className="h-5 w-5" />}
            label="Analytics"
            active={pathname === "/dashboard/analytics"}
            onClick={() => setIsMobileOpen?.(false)}
          />
        </nav>

        {/* Secondary Navigation Links */}
        <div className="mt-8 pt-4 border-t">
          <nav className="space-y-1">
            <NavItem
              href="/dashboard/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={pathname === "/dashboard/settings"}
              onClick={() => setIsMobileOpen?.(false)}
            />
            <NavItem
              href="/dashboard/help"
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help & Support"
              active={pathname === "/dashboard/help"}
              onClick={() => setIsMobileOpen?.(false)}
            />
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-blue-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </Button>
          </nav>
        </div>
      </div>
    </>
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 border-r bg-gradient-to-b from-white to-blue-50 hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar with Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-[80%] max-w-[280px] bg-gradient-to-b from-white to-blue-50">
          <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start transition-all",
          active
            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
            : "text-muted-foreground hover:text-blue-600 hover:bg-blue-50",
        )}
      >
        <div className="p-1.5 bg-blue-50 rounded-lg">{icon}</div>
        <span className="ml-3">{label}</span>
      </Button>
    </Link>
  );
}