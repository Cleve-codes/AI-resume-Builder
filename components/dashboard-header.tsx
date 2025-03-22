"use client";

import { Bell, Search } from "lucide-react";
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

export default function DashboardHeader() {
  return (
    <header className="border-b bg-gradient-to-b from-white to-blue-50 h-16 flex items-center px-6">
      {/* Search Bar */}
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 bg-white border border-blue-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Notifications and User Menu */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5 text-blue-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 border border-blue-100 shadow-lg">
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
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
              </Avatar>
              <span className="text-blue-600">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-blue-100 shadow-lg">
            <DropdownMenuLabel className="text-blue-600">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50">Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-blue-50">Log out</DropdownMenuItem>
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