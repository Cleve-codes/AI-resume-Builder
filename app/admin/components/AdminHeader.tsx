"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { ModeToggle } from "@/components/mode-toggle";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle,
  Menu
} from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { ModeToggle } from "@/components/mode-toggle";

export function AdminHeader() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    const path = pathname.split('/').filter(Boolean);
    if (path.length >= 2) {
      return path[1].charAt(0).toUpperCase() + path[1].slice(1);
    }
    return 'Admin';
  };

  return (
    <header className="border-b bg-background sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="md:hidden mr-2">
          <AdminSidebar />
        </div>
        
        <div className="flex-1 flex items-center">
          <div className="hidden sm:flex">
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          </div>
          <div className="flex sm:hidden">
            <h1 className="text-lg font-semibold truncate">{getPageTitle()}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </div>
          
          <ModeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 