"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function CreateResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [templateName, setTemplateName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Get template parameter from URL
  const templateId = searchParams.get("templateId");
  
  // Debug information
  useEffect(() => {
    console.log("Template ID from URL:", templateId);
  }, [templateId]);
  
  useEffect(() => {
    // Fetch template details if we have an ID
    const fetchTemplateDetails = async () => {
      if (templateId) {
        try {
          console.log(`Fetching template details for ID: ${templateId}`);
          const response = await fetch(`/api/templates/${templateId}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching template:", errorData);
            setError(`Error fetching template: ${errorData.error || 'Unknown error'}`);
            return;
          }
          
          const template = await response.json();
          console.log("Template details:", template);
          setTemplateName(template.name);
        } catch (error) {
          console.error("Error fetching template details:", error);
          setError(`Error fetching template details: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    };
    
    fetchTemplateDetails();
  }, [templateId]);
  
  useEffect(() => {
    if (!templateId) {
      // Redirect to templates page if no template is selected
      toast({
        title: "No Template Selected",
        description: "Please select a template first",
        variant: "destructive",
      });
      router.push('/dashboard/resume/templates');
      return;
    }
    
    // Create a new resume with the selected template
    const createNewResume = async () => {
      try {
        setIsLoading(true);
        
        console.log(`Creating resume with template ID: ${templateId}`);
        // POST to /api/resumes with the template ID
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId,
            title: `My Resume (${new Date().toLocaleDateString()})`,
          }),
        });
        
        // Log full response for debugging
        console.log(`Response status: ${response.status}`);
        const responseText = await response.text();
        
        // Try to parse as JSON, but keep original text if it fails
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Response data:", responseData);
        } catch (e) {
          console.error("Response is not valid JSON:", responseText);
          responseData = { error: "Invalid server response", details: responseText };
          throw new Error(`Server returned invalid JSON: ${responseText}`);
        }
        
        // Check for errors
        if (!response.ok) {
          const errorMessage = responseData.error || "Failed to create resume";
          console.error("Server returned error:", responseData);
          throw new Error(errorMessage);
        }
        
        const newResumeId = responseData.id;
        console.log(`Resume created with ID: ${newResumeId}`);
        
        // Show success message
        toast({
          title: "Resume Created",
          description: templateName 
            ? `New resume created with ${templateName} template` 
            : "New resume created with selected template",
          duration: 3000,
        });
        
        // Redirect to the resume editor
        router.push(`/dashboard/resume/${newResumeId}`);
      } catch (error) {
        console.error("Error creating resume:", error);
        setError(error instanceof Error ? error.message : "Failed to create resume");
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to create resume. Please try again.",
          variant: "destructive",
        });
        
        setIsLoading(false);
      }
    };
    
    // Add a small delay for better UX
    const timer = setTimeout(() => {
      createNewResume();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [router, templateId, templateName, toast]);
  
  // If there's an error, show retry button
  if (error) {
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
                <div className="rounded-full bg-red-100 p-3 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Error Creating Resume</h1>
                <p className="text-muted-foreground max-w-md mb-4">
                  {error}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push('/dashboard/resume/templates')}
                  >
                    Return to Templates
                  </Button>
                  <Button 
                    onClick={() => {
                      setError(null);
                      setIsLoading(true);
                      router.refresh();
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
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
                {templateName 
                  ? `Setting up your resume with the ${templateName} template...` 
                  : "Setting up your new resume with the selected template..."}
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
