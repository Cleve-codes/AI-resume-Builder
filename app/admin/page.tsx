"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  Download,
  Award,
  TrendingUp,
  Clock,
  AlertCircle,
  Info,
  Check,
  Settings,
  Briefcase,
  DollarSign,
  UserPlus,
  User,
  Zap,
  FileUp,
  Eye,
  Calendar,
  CreditCard,
  TrendingDown,
  MoreHorizontal,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePageNotification } from "@/app/hooks/usePageNotification";
import DashboardHeader from "@/components/dashboard-header";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  Area,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, trend, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center mt-4">
        <div
          className={`text-xs flex items-center gap-1 ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-amber-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3" />
          ) : trend === "down" ? (
            <TrendingUp className="h-3 w-3 rotate-180" />
          ) : (
            <Clock className="h-3 w-3" />
          )}
          {change}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

// Mock data for charts
const userActivityData = [
  { name: "Jan", users: 120, resumes: 80 },
  { name: "Feb", users: 140, resumes: 100 },
  { name: "Mar", users: 170, resumes: 130 },
  { name: "Apr", users: 200, resumes: 150 },
  { name: "May", users: 220, resumes: 170 },
  { name: "Jun", users: 250, resumes: 190 },
  { name: "Jul", users: 280, resumes: 210 },
  { name: "Aug", users: 310, resumes: 230 },
  { name: "Sep", users: 340, resumes: 250 },
  { name: "Oct", users: 360, resumes: 270 },
  { name: "Nov", users: 380, resumes: 290 },
  { name: "Dec", users: 400, resumes: 310 },
]

const subscriptionData = [
  { name: "Free", value: 60 },
  { name: "Basic", value: 25 },
  { name: "Premium", value: 10 },
  { name: "Enterprise", value: 5 },
]

const subscriptionColors = ["#94a3b8", "#3b82f6", "#6366f1", "#8b5cf6"]

const revenueData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 14000 },
  { name: "Mar", revenue: 16000 },
  { name: "Apr", revenue: 18000 },
  { name: "May", revenue: 21000 },
  { name: "Jun", revenue: 24000 },
  { name: "Jul", revenue: 28000 },
  { name: "Aug", revenue: 32000 },
  { name: "Sep", revenue: 36000 },
  { name: "Oct", revenue: 40000 },
  { name: "Nov", revenue: 44000 },
  { name: "Dec", revenue: 48000 },
]

const templateUsageData = [
  { name: "Professional", value: 35 },
  { name: "Modern", value: 25 },
  { name: "Creative", value: 15 },
  { name: "Minimal", value: 10 },
  { name: "Executive", value: 8 },
  { name: "Technical", value: 7 },
]

const templateColors = ["#6366f1", "#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome to your admin dashboard. Here&apos;s what&apos;s happening.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>View Reports</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 inline-flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8.2%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Resumes
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,842</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 inline-flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12.4%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,389</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-red-500 inline-flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" /> -3.1%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Subscriptions
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500 inline-flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> +4.6%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Showing the most recent 5 activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${i % 3 === 0 ? 'bg-blue-100 text-blue-700' : 
                            i % 3 === 1 ? 'bg-green-100 text-green-700' : 
                            'bg-amber-100 text-amber-700'}`}>
                          {i % 3 === 0 ? <Users className="h-4 w-4" /> : 
                            i % 3 === 1 ? <FileText className="h-4 w-4" /> : 
                            <CreditCard className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {i % 3 === 0 ? 'New user registered' : 
                              i % 3 === 1 ? 'Resume created' : 
                              'Subscription upgraded'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? 'John Doe registered an account' : 
                              i % 3 === 1 ? 'Jane Smith created a new resume' : 
                              'Alex Johnson upgraded to premium'}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {i < 2 ? 'Just now' : i === 2 ? '2 hours ago' : i === 3 ? 'Yesterday' : '3 days ago'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Popular Templates</CardTitle>
                <CardDescription>Most used resume templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Professional', 'Modern', 'Creative', 'Simple', 'Technical'].map((template, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center`}>
                          <span className="text-xs font-medium text-primary">{i + 1}</span>
                        </div>
                        <div className="font-medium text-sm">{template}</div>
                      </div>
                      <div className="text-xs">
                        {1000 - i * 200} uses
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center text-center">
            <Info className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-2">
              Detailed analytics data and charts would be displayed here. This tab is currently under development.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center text-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">User Management Quick View</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-2">
              A condensed view of user management would be displayed here. For full functionality, use the Users section.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="billing" className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center text-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Billing Overview</h3>
            <p className="text-sm text-muted-foreground max-w-md mt-2">
              A summary of billing and subscription data would be displayed here. For full details, use the Billing section.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 