"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  ChevronLeft, 
  Users, 
  LayoutDashboard, 
  Settings, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Menu,
  BarChart 
} from "lucide-react";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const links: SidebarLink[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Templates",
    href: "/admin/templates",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Billing",
    href: "/admin/billing",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    title: "Help & Support",
    href: "/admin/support",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({ isCollapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  const SidebarContent = () => (
    <div className={`flex flex-col h-full ${isCollapsed ? 'items-center' : ''}`}>
      <div className={`p-4 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
        {onToggle && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onToggle}
          >
            <ChevronLeft className={`h-4 w-4 duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <Button
                    variant={pathname === link.href ? "default" : "ghost"}
                    className={`w-full justify-${isCollapsed ? 'center' : 'start'} mb-1`}
                    size={isCollapsed ? "icon" : "default"}
                  >
                    {link.icon}
                    {!isCollapsed && <span className="ml-2">{link.title}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );

  // Mobile sidebar (Sheet)
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <aside className={`hidden md:block border-r bg-background h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <SidebarContent />
    </aside>
  );
} 