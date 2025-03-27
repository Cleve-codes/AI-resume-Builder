"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, FileText, User, Mail, Phone, MapPin } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TemplateDetails {
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  thumbnailUrl: string;
  isLocked?: boolean;
}

// Component to handle URL parameters
function TemplateParamsHandler({ onTemplateId }: { onTemplateId: (id: string | null) => void }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const templateId = searchParams.get("templateId");
    onTemplateId(templateId);
  }, [searchParams, onTemplateId]);
  
  return null;
}

function CreateResumeContent() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [template, setTemplate] = useState<TemplateDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [resumeTitle, setResumeTitle] = useState<string>(`My Resume (${new Date().toLocaleDateString()})`);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  
  // State to store template ID from URL
  const [templateId, setTemplateId] = useState<string | null>(null);
  
  // Handler for template ID from URL
  const handleTemplateId = (id: string | null) => {
    setTemplateId(id);
  };

  useEffect(() => {
    // Fetch template details if we have an ID
    const fetchTemplateDetails = async () => {
      if (templateId) {
        try {
          setIsLoading(true);
          console.log(`Fetching template details for ID: ${templateId}`);
          const response = await fetch(`/api/templates/${templateId}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching template:", errorData);
            setError(`Error fetching template: ${errorData.error || 'Unknown error'}`);
            setIsLoading(false);
            return;
          }
          
          const templateData = await response.json();
          console.log("Template details:", templateData);
          setTemplate(templateData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching template details:", error);
          setError(`Error fetching template details: ${error instanceof Error ? error.message : 'Unknown error'}`);
          setIsLoading(false);
        }
      } else {
        // No template ID provided
        setError("No template selected. Please choose a template first.");
        setIsLoading(false);
      }
    };
    
    fetchTemplateDetails();
  }, [templateId]);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const createNewResume = async () => {
    try {
      setIsLoading(true);
      
      console.log(`Creating resume with template ID: ${templateId}`);
      // POST to /api/resumes with the template ID and user data
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId,
          title: resumeTitle,
          personalInfo: {
            name: fullName,
            email,
            phone,
            location
          }
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
      
      // Check for authentication errors specifically
      if (response.status === 401) {
        setError("You need to be logged in to create a resume. Please log in and try again.");
        toast({
          title: "Authentication Required",
          description: "You need to be logged in to create a resume.",
          variant: "destructive",
        });
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname + window.location.search));
        }, 2000);
        return;
      }
      
      // Handle premium template errors (403 Forbidden)
      if (response.status === 403) {
        setError("Premium subscription required for this template. Please upgrade your subscription to continue.");
        toast({
          title: "Premium Template",
          description: "This template requires a premium subscription. Please upgrade to continue.",
          variant: "destructive",
        });
        return;
      }
      
      // Handle other error responses
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.details || 'Unknown error occurred';
        throw new Error(`Failed to create resume: ${errorMessage}`);
      }
      
      // If successful, get the resume ID and redirect to the edit page
      const resumeId = responseData.id;
      if (!resumeId) {
        throw new Error('No resume ID returned from server');
      }
      
      toast({
        title: "Resume Created",
        description: "Your new resume has been created successfully!",
      });
      
      router.push(`/dashboard/resume/${resumeId}/edit`);
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating resume:", error);
      setError(`Error creating resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Error Creating Resume",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  };
  
  // If there's an error, show retry button
  if (error) {
    return (
      <div className="flex min-h-screen bg-muted/30">
        {/* <DashboardSidebar /> */}
        
        <div className="flex-1">
          {/* <DashboardHeader /> */}
          
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
                  {error?.includes("Premium subscription required") ? (
                    <Button 
                      onClick={() => router.push('/dashboard/settings?tab=subscription')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Upgrade Subscription
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        setError(null);
                        setIsLoading(true);
                        router.refresh();
                      }}
                    >
                      Try Again
                    </Button>
                  )}
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
      {/* <DashboardSidebar /> */}
      
      <div className="flex-1">
        {/* <DashboardHeader /> */}
        
        <main className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Loading Template</h1>
                <p className="text-muted-foreground max-w-md">
                  Loading your selected template...
                </p>
              </motion.div>
            </div>
          ) : template ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold">Create New Resume</h1>
                <p className="text-muted-foreground mt-1">Configure your resume with the {template.name} template</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Template Preview Card */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{template.name}</span>
                      {template.isPremium && (
                        <Badge className="ml-2 bg-yellow-500">Premium</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border">
                      {template.thumbnailUrl && (
                        <Image 
                          src={template.thumbnailUrl} 
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium">Category</h3>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    
                    {template.isPremium && template.isLocked && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <p className="text-sm text-amber-800">
                          This is a premium template. Upgrade your account to access this template.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Configuration Form */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Resume Configuration</CardTitle>
                    <CardDescription>Enter basic information for your new resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="preview">Template Preview</TabsTrigger>
                        <TabsTrigger value="configure">Basic Information</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preview" className="mt-4">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            You've selected the <span className="font-medium">{template.name}</span> template. 
                            This template {template.isPremium ? "is a premium template and " : ""}
                            features a clean, professional design perfect for job applications.
                          </p>
                          
                          <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-medium mb-2">Template Features:</h3>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li>Professional, modern design</li>
                              <li>Optimized for ATS systems</li>
                              <li>Clean typography and layout</li>
                              <li>Customizable sections</li>
                              <li>PDF export capability</li>
                            </ul>
                          </div>
                          
                          <p className="text-sm">
                            Switch to the <span className="font-medium">Basic Information</span> tab to configure your resume details.
                          </p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="configure" className="mt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="resumeTitle">
                              <FileText className="h-4 w-4 inline mr-2" />
                              Resume Title
                            </Label>
                            <Input 
                              id="resumeTitle" 
                              value={resumeTitle} 
                              onChange={(e) => setResumeTitle(e.target.value)} 
                              placeholder="My Professional Resume"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="fullName">
                              <User className="h-4 w-4 inline mr-2" />
                              Full Name
                            </Label>
                            <Input 
                              id="fullName" 
                              value={fullName} 
                              onChange={(e) => setFullName(e.target.value)} 
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">
                              <Mail className="h-4 w-4 inline mr-2" />
                              Email Address
                            </Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">
                                <Phone className="h-4 w-4 inline mr-2" />
                                Phone Number
                              </Label>
                              <Input 
                                id="phone" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                placeholder="(123) 456-7890"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="location">
                                <MapPin className="h-4 w-4 inline mr-2" />
                                Location
                              </Label>
                              <Input 
                                id="location" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                placeholder="New York, NY"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => router.push('/dashboard/resume/templates')}
                    >
                      Back to Templates
                    </Button>
                    
                    <Button 
                      onClick={createNewResume}
                      disabled={template.isPremium && template.isLocked}
                      className={template.isPremium && !template.isLocked ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : ""}
                    >
                      {template.isPremium && template.isLocked ? 'Premium Template' : 'Create Resume'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default function CreateResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <>
        <CreateResumeContent />
        <Suspense fallback={null}>
          <TemplateParamsHandler 
            onTemplateId={(id) => {}} 
          />
        </Suspense>
      </>
    </Suspense>
  );
}
