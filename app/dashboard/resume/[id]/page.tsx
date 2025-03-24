"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Download,
  Zap,
  Loader2,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import AiAnalysis from "@/components/ai-analysis";
import { useResumeData } from "./hooks/useResumeData";
import { useResumeTemplate } from "./hooks/useResumeTemplate";
import ResumeEditorWithTemplate from "./components/ResumeEditorWithTemplate";
import ResumePreviewWithTemplate from "./components/ResumePreviewWithTemplate";
import { motion } from "framer-motion";

export default function ResumePage({ params }: { params: { id: string | Promise<string> } }) {
  // Unwrap the params object first, then access the id property
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const resumeId = unwrappedParams.id;
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("edit");
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Fetch resume data with error handling
  const { 
    resume, 
    template, 
    isLoading, 
    error: resumeError, 
    saveResume, 
    updateResumeField 
  } = useResumeData(resumeId);
  
  const { resumeData, activeTemplate } = useResumeTemplate(resume, template);
  
  // Set flag after initial load attempt
  useEffect(() => {
    if (!isLoading) {
      setInitialLoadAttempted(true);
    }
    if (resumeError) {
      setErrorMessage(resumeError);
    }
  }, [isLoading, resumeError]);
  
  // Add debugging
  useEffect(() => {
    console.log('Resume data loaded:', { resumeId, isLoading, hasResume: !!resume, hasTemplate: !!template });
  }, [resumeId, isLoading, resume, template]);
  
  // Handle save button click
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveResume();
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
        duration: 3000,
      });
    } catch (err) {
      console.error('Error saving resume:', err);
      toast({
        title: "Error saving resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle export button click
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Resume exported",
        description: "Your resume has been exported successfully.",
        duration: 3000,
      });
    } catch (err) {
      console.error('Error exporting resume:', err);
      toast({
        title: "Error exporting resume",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  // If we've been loading for too long, show an error
  if (initialLoadAttempted && isLoading) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Unable to Load Resume</h1>
                <p className="text-muted-foreground max-w-md mb-6">
                  There was an issue loading your resume data. This could be due to network issues or the resume might not exist.
                </p>
                <Link href="/dashboard">
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // If there's an error, show error UI
  if (errorMessage) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
                <p className="text-muted-foreground max-w-md mb-6">
                  {errorMessage || "There was an unexpected error loading your resume. Please try again later."}
                </p>
                <Link href="/dashboard">
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                  </Button>
                </Link>
              </div>
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
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center mb-6"
          >
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                  <ArrowLeft className="h-5 w-5 text-blue-600" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {isLoading ? "Loading Resume..." : resume?.title || "New Resume"}
              </h1>
              {!isLoading && resume && (
                <Badge variant="outline" className="ml-2 border-blue-600 text-blue-600">
                  {resume.isPublic ? "Published" : "Draft"}
                </Badge>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={handleSave}
                disabled={isLoading || isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} 
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={handleExport}
                disabled={isLoading || isExporting}
              >
                {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} 
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>
              <Button 
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => setActiveTab("ai-analysis")}
                disabled={isLoading}
              >
                <Zap className="h-4 w-4" /> AI Optimize
              </Button>
            </div>
          </motion.div>

          {/* Resume Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-blue-50 p-2 rounded-lg">
                <TabsTrigger value="edit" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Edit Resume
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="ai-analysis" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  AI Analysis
                </TabsTrigger>
              </TabsList>

              {/* Edit Tab */}
              <TabsContent value="edit" className="mt-6">
                <ResumeEditorWithTemplate 
                  resumeData={resumeData}
                  template={activeTemplate}
                  isLoading={isLoading}
                  error={errorMessage}
                  onEditField={updateResumeField}
                />
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="mt-6">
                <ResumePreviewWithTemplate 
                  resumeData={resumeData}
                  template={activeTemplate}
                  isLoading={isLoading}
                  error={errorMessage}
                />
              </TabsContent>

              {/* AI Analysis Tab */}
              <TabsContent value="ai-analysis" className="mt-6">
                <Card className="p-6 border-blue-100">
                  <AiAnalysis />
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}