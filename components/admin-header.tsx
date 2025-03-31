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
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export default function AdminHeader({ isMobileMenuOpen, setIsMobileMenuOpen }: AdminHeaderProps) {
  const { user } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Generate initials from user's name
  const getUserInitials = () => {
    if (!user?.fullName) return "A";
    
    const nameParts = user.fullName.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <header className="border-b bg-gradient-to-b from-indigo-50 to-white h-16 flex items-center px-3 md:px-6 sticky top-0 z-20">
      {/* Mobile Menu Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </Button>
      
      {/* Admin Badge */}
      <div className="ml-3 md:ml-0">
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 font-semibold">
          Admin Portal
        </Badge>
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
              placeholder="Search users, templates, logs..." 
              className="w-full pl-10 py-5 border-indigo-100 focus:border-indigo-300 rounded-xl" 
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
                placeholder="Search users, templates, logs..." 
                className="w-full pl-10 py-5 border-indigo-100 focus:border-indigo-300 rounded-xl" 
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
            <Button variant="ghost" size="icon" className="relative hover:bg-indigo-50">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full sm:w-80 border border-indigo-100 shadow-lg">
            <DropdownMenuLabel className="text-indigo-600">Admin Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <NotificationItem
                title="New User Registration"
                description="5 new users have registered in the last hour."
                time="15 minutes ago"
              />
              <NotificationItem
                title="System Alert"
                description="Database utilization has reached 70%."
                time="1 hour ago"
              />
              <NotificationItem
                title="Template Update"
                description="New template has been added to the system."
                time="2 hours ago"
              />
              <NotificationItem
                title="Payment Processing"
                description="45 new subscription payments have been processed."
                time="Yesterday"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm cursor-pointer hover:bg-indigo-50 text-indigo-600">
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
              userButtonBox: "hover:bg-indigo-50 rounded-full",
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
    <div className="px-4 py-3 hover:bg-indigo-50 cursor-pointer">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
  );
} 