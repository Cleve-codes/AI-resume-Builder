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
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export default function DashboardHeader() {
  const { user } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Generate initials from user's name
  const getUserInitials = () => {
    if (!user?.fullName) return "U";
    
    const nameParts = user.fullName.split(" ");
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
      <div className="relative flex-1 ml-3 hidden md:flex">
        <form 
          className="w-full max-w-xl mx-auto" 
          onSubmit={(e) => {
            e.preventDefault();
            // Handle search
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search resumes, templates, tips..." 
              className="w-full pl-10 py-5 border-blue-100 focus:border-blue-300 rounded-xl" 
            />
          </div>
        </form>
      </div>
      
      {/* Mobile Search Icon */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-auto mr-2 md:hidden"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="h-5 w-5 text-gray-600" />
      </Button>
      
      {/* Mobile Search Sheet */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top">
          <SheetTitle>Search</SheetTitle>
          <div className="py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search resumes, templates, tips..." 
                className="w-full pl-10 py-5 border-blue-100 focus:border-blue-300 rounded-xl" 
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Right Section: Notifications & User Menu */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
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
                description="Check out our new ATS-optimized template."
                time="Yesterday"
              />
              <NotificationItem
                title="Interview Tip"
                description="New blog post: 10 Questions to Prepare for Your Next Interview."
                time="3 days ago"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm cursor-pointer hover:bg-blue-50 text-blue-600">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu - Clerk UserButton */}
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8",
              userButtonBox: "hover:bg-blue-50 rounded-full",
            }
          }}
        />
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
    <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
  );
}