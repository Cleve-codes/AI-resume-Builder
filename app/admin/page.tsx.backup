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
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening with your platform today.</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant={timeRange === "day" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("day")}>
              Day
            </Button>
            <Button
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("week")}
            >
              Week
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
            >
              Month
            </Button>
            <Button
              variant={timeRange === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("year")}
            >
              Year
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="content">
          <ContentTab />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OverviewTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Users"
            value="4,289"
            change="+12%"
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Resumes"
            value="12,456"
            change="+8%"
            trend="up"
            icon={<FileText className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Job Listings"
            value="3,782"
            change="+5%"
            trend="up"
            icon={<Briefcase className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Monthly Revenue"
            value="$48,289"
            change="+15%"
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> User Activity
              </CardTitle>
              <CardDescription>New users and resumes created over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                      name="Users"
                    />
                    <Area
                      type="monotone"
                      dataKey="resumes"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorResumes)"
                      name="Resumes"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Subscription Distribution
              </CardTitle>
              <CardDescription>Breakdown of users by subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={subscriptionColors[index % subscriptionColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" /> Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Template Usage
              </CardTitle>
              <CardDescription>Most popular resume templates</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={templateUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {templateUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={templateColors[index % templateColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" /> System Status
            </CardTitle>
            <CardDescription>Current system performance and health metrics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Server Load</span>
                  <span className="text-sm text-green-500">Normal</span>
                </div>
                <Progress value={35} className="h-2 bg-green-500/20" />
                <p className="text-xs text-muted-foreground">35% of capacity</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Database Performance</span>
                  <span className="text-sm text-green-500">Optimal</span>
                </div>
                <Progress value={28} className="h-2 bg-green-500/20" />
                <p className="text-xs text-muted-foreground">28% of capacity</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm text-green-500">Fast</span>
                </div>
                <Progress value={15} className="h-2 bg-green-500/20" />
                <p className="text-xs text-muted-foreground">150ms average</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-amber-500">Moderate</span>
                </div>
                <Progress value={65} className="h-2 bg-amber-500/20" />
                <p className="text-xs text-muted-foreground">65% of capacity</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Last Backup</h3>
                  <Badge variant="outline" className="text-xs">
                    Successful
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Today, 03:45 AM</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Last Deployment</h3>
                  <Badge variant="outline" className="text-xs">
                    Successful
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday, 2:30 PM</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">System Uptime</h3>
                  <Badge variant="outline" className="text-xs">
                    99.98%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">30 days rolling average</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-4">
            <Button variant="outline" size="sm" className="ml-auto">
              View Detailed Metrics
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function UsersTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Users"
            value="4,289"
            change="+12%"
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="New Users"
            value="128"
            change="+8%"
            trend="up"
            icon={<UserPlus className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Active Users"
            value="2,845"
            change="+5%"
            trend="up"
            icon={<User className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Premium Users"
            value="982"
            change="+15%"
            trend="up"
            icon={<Zap className="h-5 w-5 text-primary" />}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> User Growth
              </CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsers2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorUsers2)"
                      name="New Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> User Demographics
              </CardTitle>
              <CardDescription>User distribution by region</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "North America", users: 1845 },
                      { name: "Europe", users: 1240 },
                      { name: "Asia", users: 940 },
                      { name: "South America", users: 450 },
                      { name: "Africa", users: 230 },
                      { name: "Oceania", users: 180 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="users" fill="#6366f1" name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Recent User Activity
            </CardTitle>
            <CardDescription>Latest user registrations and actions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">New User</Badge>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Premium Upgrade
                  </Badge>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Robert Johnson</h3>
                    <p className="text-sm text-muted-foreground">robert.j@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Resume Created
                  </Badge>
                  <span className="text-sm text-muted-foreground">Yesterday</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Emily Wilson</h3>
                    <p className="text-sm text-muted-foreground">emily.w@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                    Job Application
                  </Badge>
                  <span className="text-sm text-muted-foreground">Yesterday</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-4">
            <Button variant="outline" size="sm" className="ml-auto">
              View All Users
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function ContentTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Resumes"
            value="12,456"
            change="+8%"
            trend="up"
            icon={<FileText className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Templates"
            value="48"
            change="+2"
            trend="up"
            icon={<FileUp className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Job Listings"
            value="3,782"
            change="+5%"
            trend="up"
            icon={<Briefcase className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Content Views"
            value="45,892"
            change="+12%"
            trend="up"
            icon={<Eye className="h-5 w-5 text-primary" />}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Resume Creation Trends
              </CardTitle>
              <CardDescription>Number of resumes created over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorResumes2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="resumes"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorResumes2)"
                      name="Resumes Created"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Template Usage
              </CardTitle>
              <CardDescription>Most popular resume templates</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={templateUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {templateUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={templateColors[index % templateColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Recent Content Activity
            </CardTitle>
            <CardDescription>Latest resume and template activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">New Resume Template Added</h3>
                    <p className="text-sm text-muted-foreground">Modern Creative Template</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">New Template</Badge>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">New Job Listings Added</h3>
                    <p className="text-sm text-muted-foreground">125 new positions from TechCorp</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Job Listings
                  </Badge>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Template Updated</h3>
                    <p className="text-sm text-muted-foreground">Professional Template - ATS Optimization</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    Update
                  </Badge>
                  <span className="text-sm text-muted-foreground">Yesterday</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Featured Jobs Updated</h3>
                    <p className="text-sm text-muted-foreground">Weekly featured jobs rotation</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Featured
                  </Badge>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-4">
            <Button variant="outline" size="sm" className="ml-auto">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function RevenueTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <StatCard
            title="Monthly Revenue"
            value="$48,289"
            change="+15%"
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Annual Revenue"
            value="$542,892"
            change="+22%"
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Avg. Subscription"
            value="$24.99"
            change="+5%"
            trend="up"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Conversion Rate"
            value="8.2%"
            change="+1.5%"
            trend="up"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" /> Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Revenue by Plan
              </CardTitle>
              <CardDescription>Revenue distribution by subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Free", revenue: 0 },
                      { name: "Basic", revenue: 124500 },
                      { name: "Premium", revenue: 285000 },
                      { name: "Enterprise", revenue: 133392 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Subscription Renewals
              </CardTitle>
              <CardDescription>Upcoming subscription renewals</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Today</h3>
                    <p className="text-sm text-muted-foreground">45 renewals</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium text-green-500">$1,125.00</h3>
                    <p className="text-sm text-muted-foreground">Expected revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tomorrow</h3>
                    <p className="text-sm text-muted-foreground">38 renewals</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium text-green-500">$950.00</h3>
                    <p className="text-sm text-muted-foreground">Expected revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">This Week</h3>
                    <p className="text-sm text-muted-foreground">215 renewals</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium text-green-500">$5,375.00</h3>
                    <p className="text-sm text-muted-foreground">Expected revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">This Month</h3>
                    <p className="text-sm text-muted-foreground">845 renewals</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-medium text-green-500">$21,125.00</h3>
                    <p className="text-sm text-muted-foreground">Expected revenue</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Recent Transactions
            </CardTitle>
            <CardDescription>Latest subscription payments and upgrades</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan - Annual</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-green-500">$199.99</h3>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Robert Johnson</h3>
                    <p className="text-sm text-muted-foreground">Basic Plan - Monthly</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-green-500">$9.99</h3>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Emily Wilson</h3>
                    <p className="text-sm text-muted-foreground">Premium Plan - Monthly</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-green-500">$24.99</h3>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>TC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">TechCorp Inc.</h3>
                    <p className="text-sm text-muted-foreground">Enterprise Plan - Annual</p>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-medium text-green-500">$2,499.99</h3>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t py-4">
            <Button variant="outline" size="sm" className="ml-auto">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
} 