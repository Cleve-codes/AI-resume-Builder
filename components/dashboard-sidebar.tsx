"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, LayoutDashboard, FileUp, Briefcase, BarChart, Settings, HelpCircle, LogOut } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-gradient-to-b from-white to-blue-50 hidden md:block">
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
          />
          <NavItem
            href="/dashboard/resumes"
            icon={<FileText className="h-5 w-5" />}
            label="My Resumes"
            active={pathname.startsWith("/dashboard/resumes")}
          />
          <NavItem
            href="/dashboard/upload"
            icon={<FileUp className="h-5 w-5" />}
            label="Upload Resume"
            active={pathname === "/dashboard/upload"}
          />
          <NavItem
            href="/dashboard/jobs"
            icon={<Briefcase className="h-5 w-5" />}
            label="Job Matches"
            active={pathname.startsWith("/dashboard/jobs")}
          />
          <NavItem
            href="/dashboard/analytics"
            icon={<BarChart className="h-5 w-5" />}
            label="Analytics"
            active={pathname === "/dashboard/analytics"}
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
            />
            <NavItem
              href="/dashboard/help"
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help & Support"
              active={pathname === "/dashboard/help"}
            />
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-blue-50"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href}>
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