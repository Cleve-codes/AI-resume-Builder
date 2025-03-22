// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { FileText, Plus, Upload, BarChart } from "lucide-react"
// import DashboardHeader from "@/components/dashboard-header"
// import DashboardSidebar from "@/components/dashboard-sidebar"
// import ResumeCard from "@/components/resume-card"

// export default function DashboardPage() {
//   const [resumes, setResumes] = useState([
//     { id: 1, title: "Software Engineer Resume", lastUpdated: "2023-11-15", score: 85 },
//     { id: 2, title: "Product Manager Resume", lastUpdated: "2023-10-28", score: 72 },
//   ])

//   return (
//     <div className="flex min-h-screen bg-muted/30">
//       <DashboardSidebar />

//       <div className="flex-1">
//         <DashboardHeader />

//         <main className="p-6">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//             <p className="text-muted-foreground">Manage your resumes and track your progress</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <StatsCard title="Resumes Created" value="2" description="Total resumes in your account" />
//             <StatsCard title="Average ATS Score" value="78%" description="Based on all your resumes" />
//             <StatsCard title="Optimizations" value="14" description="AI suggestions applied" />
//           </div>

//           <Tabs defaultValue="resumes" className="mb-8">
//             <TabsList>
//               <TabsTrigger value="resumes">My Resumes</TabsTrigger>
//               <TabsTrigger value="templates">Templates</TabsTrigger>
//               <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             </TabsList>

//             <TabsContent value="resumes" className="mt-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Your Resumes</h2>
//                 <div className="flex gap-3">
//                   <Link href="/dashboard/resume/create">
//                     <Button variant="outline" className="gap-2">
//                       <Plus className="h-4 w-4" /> Create New
//                     </Button>
//                   </Link>
//                   <Button className="gap-2">
//                     <Upload className="h-4 w-4" /> Upload Resume
//                   </Button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {resumes.map((resume) => (
//                   <ResumeCard key={resume.id} resume={resume} />
//                 ))}

//                 <Link href="/dashboard/resume/create" className="block h-full">
//                   <Card className="border-dashed h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-muted/50 transition-colors">
//                     <Plus className="h-12 w-12 text-muted-foreground mb-4" />
//                     <p className="text-muted-foreground font-medium">Create New Resume</p>
//                   </Card>
//                 </Link>
//               </div>
//             </TabsContent>

//             <TabsContent value="templates" className="mt-6">
//               <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <TemplateCard name="Professional" category="Traditional" />
//                 <TemplateCard name="Modern" category="Creative" />
//                 <TemplateCard name="Minimal" category="Clean" />
//                 <TemplateCard name="Executive" category="Business" />
//                 <TemplateCard name="Technical" category="Specialized" />
//                 <TemplateCard name="Academic" category="Education" />
//               </div>
//             </TabsContent>

//             <TabsContent value="analytics" className="mt-6">
//               <h2 className="text-xl font-semibold mb-6">Resume Analytics</h2>
//               <Card>
//                 <CardContent className="pt-6">
//                   <div className="h-[300px] flex items-center justify-center border rounded-md">
//                     <div className="text-center">
//                       <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                       <p className="text-muted-foreground">Analytics visualization would appear here</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//     </div>
//   )
// }

// function StatsCard({
//   title,
//   value,
//   description,
// }: {
//   title: string
//   value: string
//   description: string
// }) {
//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-3xl font-bold">{value}</div>
//         <p className="text-xs text-muted-foreground mt-1">{description}</p>
//       </CardContent>
//     </Card>
//   )
// }

// function TemplateCard({ name, category }: { name: string; category: string }) {
//   return (
//     <Card className="overflow-hidden">
//       <div className="h-40 bg-muted flex items-center justify-center">
//         <FileText className="h-12 w-12 text-muted-foreground" />
//       </div>
//       <CardHeader className="pb-2">
//         <CardTitle>{name}</CardTitle>
//         <CardDescription>{category}</CardDescription>
//       </CardHeader>
//       <CardFooter>
//         <Button variant="outline" className="w-full">
//           Use Template
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Upload, BarChart, CheckCircle, ArrowRight } from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import ResumeCard from "@/components/resume-card";

export default function DashboardPage() {
  const [resumes, setResumes] = useState([
    { id: 1, title: "Software Engineer Resume", lastUpdated: "2023-11-15", score: 85 },
    { id: 2, title: "Product Manager Resume", lastUpdated: "2023-10-28", score: 72 },
  ]);

  // Scroll animations
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach((el) => observer.observe(el));
    return () => animatedElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          {/* Dashboard Header */}
          <div className="mb-8 animate-on-scroll">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your resumes and track your progress</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Resumes Created"
              value="2"
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

          {/* Tabs */}
          {/* <Tabs defaultValue="resumes" className="mb-8"> */}
            {/* <TabsList className="bg-blue-50 p-2 rounded-lg">
              <TabsTrigger value="resumes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                My Resumes
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Templates
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Analytics
              </TabsTrigger>
            </TabsList> */}

            {/* Resumes Tab */}
            {/* 
            <TabsContent value="resumes" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Resumes</h2>
                <div className="flex gap-3">
                  <Link href="/dashboard/resume/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                      <Plus className="h-4 w-4 mr-2" /> Create New
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Upload className="h-4 w-4 mr-2" /> Upload Resume
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}

                <Link href="/dashboard/resume/create" className="block h-full animate-on-scroll">
                  <Card className="border-dashed h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-blue-50 transition-colors">
                    <Plus className="h-12 w-12 text-blue-600 mb-4" />
                    <p className="text-blue-600 font-medium">Create New Resume</p>
                  </Card>
                </Link>
              </div>
            </TabsContent>
             */}

            {/* Templates Tab */}
            {/* <TabsContent value="templates" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TemplateCard name="Professional" category="Traditional" />
                <TemplateCard name="Modern" category="Creative" />
                <TemplateCard name="Minimal" category="Clean" />
                <TemplateCard name="Executive" category="Business" />
                <TemplateCard name="Technical" category="Specialized" />
                <TemplateCard name="Academic" category="Education" />
              </div>
            </TabsContent> */}

            {/* Analytics Tab */}
            {/* <TabsContent value="analytics" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">Resume Analytics</h2>
              <Card className="animate-on-scroll">
                <CardContent className="pt-6">
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <BarChart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-muted-foreground">Analytics visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          {/* </Tabs> */}
          <Tabs defaultValue="resumes" className="mb-8">
            <TabsList>
              <TabsTrigger value="resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="resumes" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Resumes</h2>
                <div className="flex gap-3">
                  <Link href="/dashboard/resume/create">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                      <Plus className="h-4 w-4 mr-2" /> Create New
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Upload className="h-4 w-4 mr-2" /> Upload Resume
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}

                <Link href="/dashboard/resume/create" className="block h-full animate-on-scroll">
                  <Card className="border-dashed h-full flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-blue-50 transition-colors">
                    <Plus className="h-12 w-12 text-blue-600 mb-4" />
                    <p className="text-blue-600 font-medium">Create New Resume</p>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            

            

            <TabsContent value="templates" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TemplateCard name="Professional" category="Traditional" />
                <TemplateCard name="Modern" category="Creative" />
                <TemplateCard name="Minimal" category="Clean" />
                <TemplateCard name="Executive" category="Business" />
                <TemplateCard name="Technical" category="Specialized" />
                <TemplateCard name="Academic" category="Education" />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <h2 className="text-xl font-semibold mb-6">Resume Analytics</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[300px] flex items-center justify-center border rounded-md">
                    <div className="text-center">
                      <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Analytics visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="animate-on-scroll">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



function TemplateCard({ name, category }: { name: string; category: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-muted flex items-center justify-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Use Template
        </Button>
      </CardFooter>
    </Card>
  )
}