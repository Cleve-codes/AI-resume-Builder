"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Briefcase, Award, Zap, BarChart, LayoutGrid } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Import our modular components
import { StatsCard } from "./components/StatsCard";
import { DashboardResumes } from "./components/DashboardResumes";
import { DashboardTemplates } from "./components/DashboardTemplates";
import { DashboardAnalytics } from "./components/DashboardAnalytics";
import { DashboardJobs } from "./components/DashboardJobs";
import { ResumePerformance } from "./components/ResumePerformance";
import { RecentActivity } from "./components/RecentActivity";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Define the resume type
interface Resume {
  id: number;
  title: string;
  lastUpdated: string;
  score: number;
  status: "draft" | "complete" | "needs_review";
}

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
}

interface Stats {
  resumesCreated: number;
  averageScore: number;
  optimizations: number;
  jobMatches: number;
}

export default function DashboardPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats>({
    resumesCreated: 0,
    averageScore: 0,
    optimizations: 0,
    jobMatches: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auth check
  useEffect(() => {
    if (isUserLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isUserLoaded, router]);

  // Simulate loading data from API
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      setResumes([
        { id: 1, title: "Software Engineer Resume", lastUpdated: "2023-11-15", score: 85, status: "complete" },
        { id: 2, title: "Product Manager Resume", lastUpdated: "2023-10-28", score: 72, status: "needs_review" },
        { id: 3, title: "UX Designer Resume", lastUpdated: "2023-11-05", score: 90, status: "complete" },
      ]);

      setStats({
        resumesCreated: 3,
        averageScore: 82,
        optimizations: 14,
        jobMatches: 6,
      });

      setActivities([
        { id: 1, type: "resume", title: "Software Engineer Resume updated", time: "2 hours ago" },
        { id: 2, type: "job", title: "Applied to Senior Developer at Google", time: "Yesterday" },
        { id: 3, type: "analysis", title: "Resume analysis completed", time: "3 days ago" },
        { id: 4, type: "template", title: "Created new resume from Modern template", time: "5 days ago" },
      ]);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  // Show nothing before hydration is complete to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show loading state while checking auth
  if (!isUserLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="mb-4 animate-spin">
            <svg className="h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-primary font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-0 max-w-full overflow-hidden"
    >
      <div className="mb-5 sm:mb-6 px-4 sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Welcome back, {user?.firstName || "User"}</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Here's what's happening with your resumes and job applications.</p>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-5 sm:mb-6 px-4 sm:px-0"
      >
        <motion.div variants={itemVariants}>
          <StatsCard 
            title="Resumes Created" 
            value={stats.resumesCreated.toString()} 
            icon={<FileText className="text-blue-600" />} 
            description="Total resumes in your account"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard 
            title="Average Score" 
            value={`${stats.averageScore}%`} 
            icon={<Award className="text-green-600" />} 
            description="Your resume quality score"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard 
            title="Optimizations" 
            value={stats.optimizations.toString()} 
            icon={<Zap className="text-amber-500" />} 
            description="AI suggestions applied"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard 
            title="Job Matches" 
            value={stats.jobMatches.toString()} 
            icon={<Briefcase className="text-indigo-600" />} 
            description="Relevant jobs found for you"
          />
        </motion.div>
      </motion.div>
      
      {/* Content Tabs */}
      <div className="px-4 sm:px-0">
        <Tabs defaultValue="resumes" className="mb-5 sm:mb-6">
          <div className="max-w-full overflow-x-auto">
            <TabsList className="w-full flex mb-4 sm:mb-6 justify-between h-auto rounded-md">
              <TabsTrigger value="resumes" className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none">
                <FileText className="h-4 w-4" />
                <span className="hidden xs:block text-xs sm:text-sm">Resumes</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden xs:block text-xs sm:text-sm">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none">
                <BarChart className="h-4 w-4" />
                <span className="hidden xs:block text-xs sm:text-sm">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 hover:text-blue-600 flex items-center justify-center flex-col gap-1 h-auto rounded-none">
                <Briefcase className="h-4 w-4" />
                <span className="hidden xs:block text-xs sm:text-sm">Jobs</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="resumes" className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">My Resumes</h2>
              <Button asChild size="sm" className="whitespace-nowrap text-xs sm:text-sm py-1 h-8">
                <Link href="/dashboard/resume/create">
                  <span className="hidden xs:inline">Create</span> New Resume
                </Link>
              </Button>
            </div>
            <DashboardResumes resumes={resumes} />
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">Resume Templates</h2>
              <Button variant="outline" asChild size="sm" className="whitespace-nowrap text-xs sm:text-sm py-1 h-8">
                <Link href="/dashboard/resume/templates">
                  <span className="hidden xs:inline">View All</span> Templates
                </Link>
              </Button>
            </div>
            <DashboardTemplates />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-3">
              <h2 className="text-xl font-semibold mb-6">Resume Analytics</h2>
              <Button variant="outline" asChild size="sm" className="whitespace-nowrap text-xs sm:text-sm py-1 h-8">
                <Link href="/dashboard/analytics">
                  <span className="hidden xs:inline">Full</span> Analytics
                </Link>
              </Button>
            </div>
            <DashboardAnalytics />
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">Recommended Jobs</h2>
              <Button variant="outline" asChild size="sm" className="whitespace-nowrap text-xs sm:text-sm py-1 h-8">
                <Link href="/dashboard/jobs">
                  <span className="hidden xs:inline">View All</span> Jobs
                </Link>
              </Button>
            </div>
            <DashboardJobs />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
        <div className="lg:col-span-2">
          <ResumePerformance resumes={resumes} />
        </div>
        <div>
          <RecentActivity activities={activities} />
        </div>
      </div>
    </motion.div>
  );
}
