"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context/auth-context";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is handled in the logout function
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  // Generate initials from user's name
  const getUserInitials = () => {
    if (!user?.name) return "U";
    
    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="border-b bg-gradient-to-b from-white to-blue-50 h-16 flex items-center px-3 md:px-6">
      {/* Mobile Menu Icon - This is just a placeholder to balance the header layout */}
      <div className="md:hidden w-10">
        {/* We don't need a real button here as the actual menu is in the sidebar */}
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 flex items-center justify-center md:justify-start">
        {/* Desktop Search */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 bg-white border border-blue-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>
        
        {/* Mobile Search Button */}
        <div className="md:hidden">
          <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                <Search className="h-5 w-5 text-blue-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-12">
              <SheetTitle className="sr-only">Search Resumes</SheetTitle>
              <div className="relative w-full">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resumes, templates..."
                  className="pl-8 bg-white border border-blue-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all w-full"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsSearchOpen(false);
                    }
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Notifications and User Menu */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full sm:w-80 border border-blue-100 shadow-lg">
            <DropdownMenuLabel className="text-blue-600">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <NotificationItem
                title="Resume Analysis Complete"
                description="Your Software Engineer resume has been analyzed."
                time="2 hours ago"
              />
              <NotificationItem
                title="New Template Available"
                description="Check out our new Technical resume template."
                time="1 day ago"
              />
              <NotificationItem
                title="Welcome to ResumeAI"
                description="Get started by creating your first resume."
                time="3 days ago"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-center text-blue-600 hover:bg-blue-50">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-blue-50">
              <Avatar className="h-8 w-8">
                {user?.profileImage ? (
                  <AvatarImage src={user.profileImage} alt={user.name || "User"} />
                ) : (
                  <AvatarFallback className="bg-blue-600 text-white">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-blue-600 hidden sm:inline">{user?.name || "User"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-blue-100 shadow-lg">
            <DropdownMenuLabel className="text-blue-600">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50">
              <Link href="/dashboard/profile" className="flex w-full items-center">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50">
              <Link href="/dashboard/settings" className="flex w-full items-center">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50">Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50" onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function NotificationItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="px-2 py-3 hover:bg-blue-50 cursor-pointer transition-colors">
      <div className="font-medium text-sm text-blue-600">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
      <div className="text-xs text-muted-foreground mt-1">{time}</div>
    </div>
  );
}