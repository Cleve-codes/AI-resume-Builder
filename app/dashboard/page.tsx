"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Briefcase, Award, Zap } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { useAuth } from "@/lib/context/auth-context";

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
  const { user, isLoading: authLoading } = useAuth();
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
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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
        jobMatches: 8,
      });

      setActivities([
        { id: 1, type: "resume_updated", title: "Software Engineer Resume updated", time: "2 hours ago" },
        { id: 2, type: "ai_suggestion", title: "New AI suggestions available", time: "Yesterday" },
        { id: 3, type: "job_match", title: "New job match found", time: "2 days ago" },
        { id: 4, type: "resume_created", title: "UX Designer Resume created", time: "5 days ago" },
      ]);

      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  // Show nothing before hydration is complete to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show loading state while checking auth
  if (authLoading || !user) {
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
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || 'User'}! Here's an overview of your resume progress</p>
          </motion.div>

          {isLoading ? (
            // Loading state is handled by the loading.tsx file
            null
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                <motion.div variants={itemVariants}>
                  <StatsCard
                    title="Resumes Created"
                    value={stats.resumesCreated.toString()}
                    description="Total resumes in your account"
                    icon={<FileText className="h-5 w-5 text-primary" />}
                    trend="+1 this month"
                    trendUp={true}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <StatsCard
                    title="Average ATS Score"
                    value={`${stats.averageScore}%`}
                    description="Based on all your resumes"
                    icon={<Award className="h-5 w-5 text-primary" />}
                    trend="+5% improvement"
                    trendUp={true}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <StatsCard
                    title="AI Optimizations"
                    value={stats.optimizations.toString()}
                    description="AI suggestions applied"
                    icon={<Zap className="h-5 w-5 text-primary" />}
                    trend="3 pending"
                    trendUp={false}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <StatsCard
                    title="Job Matches"
                    value={stats.jobMatches.toString()}
                    description="Potential job opportunities"
                    icon={<Briefcase className="h-5 w-5 text-primary" />}
                    trend="2 new matches"
                    trendUp={true}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={containerVariants} initial="hidden" animate="show" className="mb-8">
                <Tabs defaultValue="resumes" className="mb-8">
                  <TabsList>
                    <TabsTrigger value="resumes">My Resumes</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="jobs">Job Matches</TabsTrigger>
                  </TabsList>

                  <TabsContent value="resumes" className="mt-6">
                    <DashboardResumes resumes={resumes} />
                  </TabsContent>

                  <TabsContent value="templates" className="mt-6">
                    <DashboardTemplates />
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <DashboardAnalytics />
                  </TabsContent>

                  <TabsContent value="jobs" className="mt-6">
                    <DashboardJobs />
                  </TabsContent>
                </Tabs>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="lg:col-span-2">
                  <ResumePerformance resumes={resumes} />
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <RecentActivity activities={activities} />
                </motion.div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}