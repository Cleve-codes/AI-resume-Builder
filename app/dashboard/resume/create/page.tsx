"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { useToast } from "@/components/ui/use-toast";

export default function CreateResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get template parameter from URL - handle both string and Promise
  const params = searchParams instanceof Promise ? use(searchParams) : searchParams;
  const templateParam = params.get("template");
  const templateId = params.get("templateId");
  
  useEffect(() => {
    // Simulate creating a new resume with the selected template
    const createNewResume = async () => {
      try {
        setIsLoading(true);
        
        // In a real application, you would make an API call to create a new resume
        // with the selected template, and then redirect to the edit page
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For now, we'll just redirect to a dummy resume ID
        // In a real app, this would be the ID of the newly created resume
        const newResumeId = "new";
        
        // Show success message
        toast({
          title: "Resume Created",
          description: templateParam 
            ? `New resume created with ${templateParam} template` 
            : templateId 
              ? "New resume created with selected template" 
              : "New resume created",
          duration: 3000,
        });
        
        // Redirect to the resume editor
        router.push(`/dashboard/resume/${newResumeId}`);
      } catch (error) {
        console.error("Error creating resume:", error);
        toast({
          title: "Error",
          description: "Failed to create resume. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    createNewResume();
  }, [router, templateParam, templateId, toast]);
  
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />
      
      <div className="flex-1">
        <DashboardHeader />
        
        <main className="p-6">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Creating Your Resume</h1>
              <p className="text-muted-foreground max-w-md">
                {templateParam 
                  ? `Setting up your resume with the ${templateParam} template...` 
                  : templateId 
                    ? "Setting up your resume with the selected template..." 
                    : "Setting up your new resume..."}
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
