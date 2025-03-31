"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import AdminHeader from "@/components/admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { signOut } = useClerk();
  const { toast } = useToast();

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/admin", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: "User Management", 
      href: "/admin/users", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: "Template Management", 
      href: "/admin/templates", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Activity Logs", 
      href: "/admin/activity", 
      icon: <Activity className="h-5 w-5" /> 
    },
    { 
      name: "System Settings", 
      href: "/admin/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "👋 Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "❌ Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile header - replaced with AdminHeader */}
      <div className="md:hidden">
        <AdminHeader isMobileMenuOpen={sidebarOpen} setIsMobileMenuOpen={setSidebarOpen} />
      </div>

      {/* Sidebar */}
      <div 
        className={cn(
          "w-64 bg-white dark:bg-gray-800 border-r p-4 flex flex-col fixed inset-y-0 z-30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="hidden md:flex items-center mb-8 mt-2">
          <Link href="/admin" className="font-bold text-xl text-primary">
            Admin Portal
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
              {pathname === item.href && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
          <Link 
            href="/dashboard" 
            className="flex items-center px-3 py-2 mt-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary"
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Back to App
          </Link>
          <div className="text-xs text-muted-foreground mt-6 mb-2 px-3">
            © {new Date().getFullYear()} Resume AI Builder
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:block">
          <AdminHeader />
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 