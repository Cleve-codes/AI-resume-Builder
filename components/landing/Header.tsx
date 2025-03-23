'use client'
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Settings, User, FileText } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { user, logout } = useAuth();

  // Generate initials from user's name
  const getUserInitials = () => {
    if (!user?.name) return "U";
    
    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect is handled in the logout function
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 rounded-full p-1.5 group-hover:bg-blue-700 transition-all">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h3>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            /* User is logged in - show user menu */
            <>
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
                    <span className="text-blue-600">{user?.name || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border border-blue-100 shadow-lg">
                  <DropdownMenuLabel className="text-blue-600">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-blue-50">
                    <Link href="/dashboard/profile" className="flex w-full items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50">
                    <Link href="/dashboard/settings" className="flex w-full items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-50">
                    <Link href="/dashboard" className="flex w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-blue-50" onClick={handleLogout}>
                    <div className="flex items-center w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            /* User is logged out - show login/signup buttons */
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

// Notification Item component for the dropdown
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

export default Header; 