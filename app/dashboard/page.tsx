"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Upload, BarChart, CheckCircle, ArrowRight, PenTool, BookOpen, Award } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import ResumeCard from "@/components/resume-card";
import { useAuth } from "@/lib/context/auth-context";

// Define the resume type
interface Resume {
  id: number;
  title: string;
  lastUpdated: string;
  score: number;
}

// Component function for StatsCard to avoid repetition
function StatsCard({ title, value, description, icon }: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode 
}) {
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component function for StepCard
function StepCard({ number, title, description, icon }: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
            {number}
          </div>
          <div>
            <div className="mb-2">{icon}</div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component function for TemplateCard
function TemplateCard({ name, category, featured = false }: {
  name: string;
  category: string;
  featured?: boolean;
}) {
  return (
    <Card className={`border-blue-100 overflow-hidden ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        <FileText className="h-12 w-12 text-blue-600" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
          {featured && (
            <div className="bg-blue-100 text-blue-600 text-xs py-1 px-2 rounded-full">
              Popular
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button size="sm" variant="outline" className="w-full text-sm">
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([
    // For development/testing: uncomment these to simulate existing resumes
    // { id: 1, title: "Software Engineer Resume", lastUpdated: "2023-11-15", score: 85 },
    // { id: 2, title: "Product Manager Resume", lastUpdated: "2023-10-28", score: 72 },
  ]);

  // Check if user has no resumes
  const isNewUser = resumes.length === 0;
  
  // Track component mounting state
  const [isMounted, setIsMounted] = useState(false);
  
  // Use ref to track render count for debugging
  const renderCount = useRef(0);

  // Log renders for debugging
  useEffect(() => {
    renderCount.current += 1;
    console.log(`Dashboard rendered ${renderCount.current} times`);
  }, []);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auth check
  useEffect(() => {
    console.log('Dashboard auth check - user:', user, 'authLoading:', authLoading);
    
    // If not loading and no user, redirect to login
    if (!authLoading && !user) {
      console.log('No user found, redirecting to login');
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Show nothing before hydration is complete to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show loading state while checking auth
  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <div className="text-center">
          <div className="mb-4 animate-spin">
            <svg className="h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-blue-600 font-medium">Loading dashboard...</p>
          {/* <p className="text-sm text-blue-400 mt-2">Authentication check in progress...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DashboardSidebar />

      <div className="flex-1 w-full overflow-x-hidden">
        <DashboardHeader />

        <main className="p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-600">
              Welcome, {user?.name || 'User'}
            </h1>
            <p className="text-gray-500">
              {isNewUser 
                ? "Let's get started with creating your first resume" 
                : "Manage your resumes and track your progress"}
            </p>
            {/* <div className="text-xs text-gray-400 mt-1">Render count: {renderCount.current}</div> */}
          </div>

          {isNewUser ? (
            /* New User Experience */
            <div className="space-y-6 md:space-y-8">
              {/* Welcome Card */}
              <Card className="border-blue-100 shadow-md bg-blue-50">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                    <div className="bg-blue-100 rounded-full p-6">
                      <FileText className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold mb-2">Create Your First Resume</h2>
                      <p className="text-gray-500 mb-4">
                        Get started by creating a resume tailored to your career goals.
                        Our AI-powered tools will help you stand out to employers.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        <Link href="/dashboard/resume/create">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4 mr-2" /> Create New Resume
                          </Button>
                        </Link>
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          <Upload className="h-4 w-4 mr-2" /> Upload Existing Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <div className="my-6 md:my-8">
                <h2 className="text-xl font-semibold mb-4 md:mb-6">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <StepCard 
                    number="1" 
                    title="Create or Upload" 
                    description="Start with a template or upload your existing resume"
                    icon={<PenTool className="h-8 w-8 text-blue-600" />} 
                  />
                  <StepCard 
                    number="2" 
                    title="AI Analysis" 
                    description="Get instant feedback on ATS compatibility and optimization suggestions"
                    icon={<BarChart className="h-8 w-8 text-blue-600" />} 
                  />
                  <StepCard 
                    number="3" 
                    title="Polish & Download" 
                    description="Refine your resume and export it in multiple formats"
                    icon={<Award className="h-8 w-8 text-blue-600" />} 
                  />
                </div>
              </div>

              {/* Template Showcase */}
              <div className="mt-6 md:mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl font-semibold mb-2 sm:mb-0">Choose a Template</h2>
                  <Link href="/dashboard/templates">
                    <Button variant="link" className="text-blue-600">
                      View all templates <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <TemplateCard name="Professional" category="Traditional" featured={true} />
                  <TemplateCard name="Modern" category="Creative" />
                  <TemplateCard name="Minimal" category="Clean" />
                </div>
              </div>
            </div>
          ) : (
            /* Existing User Experience */
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <StatsCard
                  title="Resumes Created"
                  value={resumes.length.toString()}
                  description="Total resumes in your account"
                  icon={<FileText className="h-8 w-8 text-blue-600" />}
                />
                <StatsCard
                  title="Average ATS Score"
                  value="78%"
                  description="Based on all your resumes"
                  icon={<BarChart className="h-8 w-8 text-blue-600" />}
                />
                <StatsCard
                  title="Optimizations"
                  value="14"
                  description="AI suggestions applied"
                  icon={<CheckCircle className="h-8 w-8 text-blue-600" />}
                />
              </div>

              <Tabs defaultValue="resumes" className="mb-6 md:mb-8">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="resumes">My Resumes</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="resumes" className="mt-4 md:mt-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-semibold">Your Resumes</h2>
                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                      <Link href="/dashboard/resume/create" className="w-full sm:w-auto">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                          <Plus className="h-4 w-4 mr-2" /> Create New
                        </Button>
                      </Link>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                        <Upload className="h-4 w-4 mr-2" /> Upload Resume
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {resumes.map((resume) => (
                      <ResumeCard key={resume.id} resume={resume} />
                    ))}

                    <Link href="/dashboard/resume/create" className="block h-full">
                      <Card className="border-dashed h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-blue-50 transition-colors">
                        <Plus className="h-12 w-12 text-blue-600 mb-4" />
                        <p className="text-blue-600 font-medium">Create New Resume</p>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-4 md:mt-6">
                  <h2 className="text-xl font-semibold mb-4 md:mb-6">Resume Templates</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <TemplateCard name="Professional" category="Traditional" />
                    <TemplateCard name="Modern" category="Creative" />
                    <TemplateCard name="Minimal" category="Clean" />
                    <TemplateCard name="Executive" category="Business" />
                    <TemplateCard name="Technical" category="Specialized" />
                    <TemplateCard name="Academic" category="Education" />
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-4 md:mt-6">
                  <h2 className="text-xl font-semibold mb-4 md:mb-6">Resume Analytics</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="h-[300px] flex items-center justify-center border rounded-md">
                        <div className="text-center">
                          <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Analytics visualization would appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  );
}