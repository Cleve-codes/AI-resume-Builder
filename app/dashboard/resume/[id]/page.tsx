"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Download,
  Zap,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
  Plus,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import AiAnalysis from "@/components/ai-analysis";

export default function ResumePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-50">
      <DashboardSidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                  <ArrowLeft className="h-5 w-5 text-blue-600" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Software Engineer Resume
              </h1>
              <Badge variant="outline" className="ml-2 border-blue-600 text-blue-600">
                Draft
              </Badge>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Download className="h-4 w-4" /> Export PDF
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                <Zap className="h-4 w-4" /> AI Optimize
              </Button>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ScoreCard title="ATS Score" score={85} description="Your resume is well-optimized for ATS systems" />
            <ScoreCard
              title="Keyword Match"
              score={72}
              description="72% match with software engineering job descriptions"
            />
            <ScoreCard title="Content Score" score={90} description="Your content is clear and well-structured" />
          </div>

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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Resume Sections */}
                <Card className="lg:col-span-1 p-4 border-blue-100">
                  <div className="space-y-1 mb-6">
                    <h3 className="font-medium text-blue-600">Resume Sections</h3>
                    <p className="text-xs text-muted-foreground">Click to edit each section</p>
                  </div>

                  <div className="space-y-1">
                    <SectionButton icon={<User className="h-4 w-4 text-blue-600" />} label="Contact Information" active />
                    <SectionButton icon={<FileText className="h-4 w-4 text-blue-600" />} label="Professional Summary" />
                    <SectionButton icon={<Briefcase className="h-4 w-4 text-blue-600" />} label="Work Experience" />
                    <SectionButton icon={<GraduationCap className="h-4 w-4 text-blue-600" />} label="Education" />
                    <SectionButton icon={<Award className="h-4 w-4 text-blue-600" />} label="Skills" />
                    <SectionButton icon={<Code className="h-4 w-4 text-blue-600" />} label="Projects" />
                    <SectionButton icon={<Languages className="h-4 w-4 text-blue-600" />} label="Languages" />
                    <Button variant="ghost" className="w-full justify-start text-blue-600 hover:bg-blue-50">
                      <Plus className="h-4 w-4 mr-2 text-blue-600" /> Add Section
                    </Button>
                  </div>
                </Card>

                {/* Resume Editor */}
                <Card className="lg:col-span-3 p-6 border-blue-100">
                  <ResumeEditor />
                </Card>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="mt-6">
              <Card className="p-6 border-blue-100">
                <ResumePreview />
              </Card>
            </TabsContent>

            {/* AI Analysis Tab */}
            <TabsContent value="ai-analysis" className="mt-6">
              <Card className="p-6 border-blue-100">
                <AiAnalysis />
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  score,
  description,
}: {
  title: string;
  score: number;
  description: string;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="border-blue-100">
      <div className="p-4">
        <h3 className="font-medium mb-1 text-blue-600">{title}</h3>
        <div className="flex justify-between items-center mb-1">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</span>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${getScoreColor(score)} bg-${getScoreColor(score).replace("text-", "")}/10`}
          >
            {score >= 80 ? "👍" : score >= 60 ? "👌" : "👎"}
          </div>
        </div>
        <Progress value={score} className="h-2 mb-2 bg-blue-50" />
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}

function SectionButton({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start text-blue-600 hover:bg-blue-50 ${active ? "bg-blue-50" : ""}`}
    >
      <span className="mr-2">{icon}</span> {label}
    </Button>
  );
}