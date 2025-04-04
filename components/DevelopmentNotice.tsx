'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Github } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface DevelopmentNoticeProps {
  forceShow?: boolean; // For testing purposes
}

export default function DevelopmentNotice({ forceShow = false }: DevelopmentNoticeProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  // Use a ref to track if the toast has been shown for the current path
  const toastShownRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Only show the toast if it hasn't been shown for this path
    if (toastShownRef.current === pathname) return;
    
    // Mark the toast as shown for this path
    toastShownRef.current = pathname;
    
    // Determine position based on path
    const isHomePage = pathname === '/';
    
    // Show the development toast notification on initial render
    const timer = setTimeout(() => {
      toast({
        title: "🛠️ Development Preview",
        description: (
          <div className="flex flex-col gap-2 max-w-xs">
            <p>
              This application is still under active development. Some features may not be fully functional or might change over time.
            </p>
            <Link 
              href="https://github.com/Cleve-codes/AI-resume-Builder" 
              target="_blank" 
              className="flex items-center mt-1 text-sm text-muted-foreground bg-muted p-2 rounded hover:bg-muted/80 transition-colors"
            >
              <Github className="h-4 w-4 mr-2 text-blue-500" />
              <span>Feedback and bug reports are welcome!</span>
            </Link>
          </div>
        ),
        duration: 5000, // 5 seconds for the user to read the message
        className: `border-l-4 border-blue-500 ${isHomePage ? "bottom-toast" : "bottom-toast"} max-w-sm w-auto`,
        variant: "default",
      });
    }, 1500); // Delay by 1.5 seconds to allow page to fully load first

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [pathname]); // Re-run when pathname changes, so it shows on each page change

  // This component doesn't render anything visible
  return null;
} 