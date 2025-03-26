'use client';

import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

interface DevelopmentNoticeProps {
  forceShow?: boolean; // For testing purposes
}

export default function DevelopmentNotice({ forceShow = false }: DevelopmentNoticeProps) {
  const { toast } = useToast();
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if the user has already dismissed the development notification
    const hasSeenDevNotice = 
      typeof window !== 'undefined' && !forceShow && localStorage.getItem('devNotificationDismissed');
    
    if (!hasSeenDevNotice) {
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
              <div className="flex items-center mt-1 text-sm text-muted-foreground bg-muted p-2 rounded">
                <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
                <span>Feedback and bug reports are welcome!</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2 self-start"
                onClick={() => {
                  // Save to localStorage to remember user's choice
                  localStorage.setItem('devNotificationDismissed', 'true');
                }}
              >
                Don't show again
              </Button>
            </div>
          ),
          duration: 15000, // 15 seconds for the user to read the message
          className: `border-l-4 border-blue-500 ${isHomePage ? "bottom-toast" : "bottom-toast"} max-w-sm w-auto`,
          variant: "default",
        });
      }, 1500); // Delay by 1.5 seconds to allow page to fully load first

      // Clean up the timer if component unmounts
      return () => clearTimeout(timer);
    }
  }, [toast, pathname, forceShow]);

  // This component doesn't render anything visible
  return null;
} 