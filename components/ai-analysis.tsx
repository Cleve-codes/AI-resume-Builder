"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Check, AlertTriangle, FileText, Briefcase, Award, GraduationCap, User, Sparkles, RefreshCw, Copy } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { useToast } from "@/components/ui/use-toast";

interface SectionSuggestion {
  original: string;
  improved: string;
  explanation: string;
}

interface AnalysisResult {
  score: number;
  keywordMatch: number;
  missingKeywords: string[];
  suggestions: string[];
  strengths: string[];
  improvements: string[];
  sectionSuggestions: {
    summary?: SectionSuggestion;
    experience?: SectionSuggestion[];
    skills?: SectionSuggestion;
    education?: SectionSuggestion[];
  };
}

interface AiAnalysisProps {
  resumeData?: ResumeData;
  onApplySuggestion?: (section: string, index: number, field: string, value: string) => void;
}

export default function AiAnalysis({ resumeData, onApplySuggestion }: AiAnalysisProps) {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isGeneratingImprovement, setIsGeneratingImprovement] = useState<{[key: string]: boolean}>({});

  // Effect to check if resume data is available
  useEffect(() => {
    if (!resumeData) {
      console.warn("No resume data provided to AI Analysis component");
    }
  }, [resumeData]);

  const handleAnalyze = async () => {
    if (!resumeData) {
      toast({
        title: "No resume data",
        description: "Cannot analyze without resume data",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);

    try {
      // In a real implementation, you would send the resume data and job description to your AI service
      // For now, we'll simulate the AI analysis with a timeout and mock data
      setTimeout(() => {
        setAnalysis({
          score: 78,
          keywordMatch: 72,
          missingKeywords: ["Docker", "Kubernetes", "CI/CD", "AWS Lambda"],
          suggestions: [
            "Add more details about your experience with cloud technologies",
            "Include specific metrics and achievements in your work experience",
            "Mention Docker and Kubernetes experience if you have any",
            "Add a projects section to showcase relevant work",
          ],
          strengths: [
            "Strong technical skills section",
            "Clear and concise work experience descriptions",
            "Good use of action verbs",
            "Professional summary highlights key qualifications",
          ],
          improvements: [
            "Add more specific achievements with metrics",
            "Include relevant certifications if available",
            "Expand on cloud technology experience",
            "Consider adding a projects section",
          ],
          sectionSuggestions: {
            summary: {
              original: resumeData.summary || "No summary provided",
              improved: "Experienced software engineer with 5+ years of expertise in full-stack development using React, Node.js, and TypeScript. Proven track record of delivering high-performance applications that improved user engagement by 40%. Passionate about creating user-friendly solutions and solving complex technical challenges.",
              explanation: "Added specific metrics and highlighted technical expertise relevant to the job description."
            },
            experience: [
              {
                original: resumeData.experience?.[0]?.description || "No experience description provided",
                improved: "Led development of a cloud-based SaaS platform serving 50,000+ users, implementing CI/CD pipelines that reduced deployment time by 35%. Architected microservices using Docker and Kubernetes, improving system reliability by 28%. Mentored junior developers and conducted code reviews, raising team productivity by 20%.",
                explanation: "Added specific metrics, mentioned Docker and Kubernetes experience, and highlighted leadership skills."
              }
            ],
            skills: {
              original: resumeData.skills?.join(", ") || "No skills provided",
              improved: "React, Node.js, TypeScript, Docker, Kubernetes, CI/CD, AWS, REST APIs, GraphQL, MongoDB, PostgreSQL, Agile/Scrum",
              explanation: "Added missing keywords from the job description and organized skills by relevance."
            }
          }
        });
        setIsAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume",
        variant: "destructive"
      });
    }
  };

  // Function to handle applying a suggestion to the resume
  const handleApplySuggestion = (section: string, index: number, field: string, value: string) => {
    if (onApplySuggestion) {
      onApplySuggestion(section, index, field, value);
      toast({
        title: "Suggestion applied",
        description: `The AI suggestion has been applied to your resume.`,
      });
    } else {
      toast({
        title: "Cannot apply suggestion",
        description: "The apply suggestion function is not available.",
        variant: "destructive"
      });
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this text where needed.",
    });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Resume Optimization
        </h2>
        <p className="text-muted-foreground">
          Paste a job description below to analyze your resume and get AI-powered recommendations tailored to the job.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Description Card */}
        <div className="lg:col-span-1">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-600">Job Description</CardTitle>
              <CardDescription>Paste the job description you're applying for</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste job description here..."
                className="min-h-[300px] border-blue-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                className="w-full mt-4 gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
              >
                <Zap className="h-4 w-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2">
          {analysis ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-blue-50 p-1 rounded-lg mb-6 w-full grid grid-cols-4">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="experience" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Skills
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-6">

                {/* Analysis Summary Card */}
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Analysis Results</CardTitle>
                    <CardDescription>Based on the job description you provided</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 mb-1">Overall Match</div>
                        <div className="text-3xl font-bold text-blue-600">{analysis.score}%</div>
                        <Progress value={analysis.score} className="h-2 mt-2" />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 mb-1">Keyword Match</div>
                        <div className="text-3xl font-bold text-blue-600">{analysis.keywordMatch}%</div>
                        <Progress value={analysis.keywordMatch} className="h-2 mt-2" />
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-2 text-blue-600">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="bg-yellow-500/10 text-yellow-600">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-blue-600">AI Suggestions</h3>
                      <ul className="space-y-2">
                        {analysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Zap className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths Card */}
                  <Card className="border-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <Check className="h-5 w-5 text-green-500" /> Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Improvements Card */}
                  <Card className="border-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" /> Areas to Improve
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                </div>
              </TabsContent>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-0">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Professional Summary Optimization</CardTitle>
                    <CardDescription>AI-suggested improvements for your professional summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysis.sectionSuggestions.summary ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2 text-blue-600">Current Summary</h3>
                          <div className="bg-muted p-4 rounded-md text-sm">
                            {analysis.sectionSuggestions.summary.original}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2 text-blue-600 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-blue-600" /> AI-Optimized Summary
                          </h3>
                          <div className="bg-blue-50 p-4 rounded-md text-sm border border-blue-100">
                            {analysis.sectionSuggestions.summary.improved}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            {analysis.sectionSuggestions.summary.explanation}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            onClick={() => handleApplySuggestion('summary', 0, 'content', analysis.sectionSuggestions.summary!.improved)}
                          >
                            <Zap className="h-4 w-4" /> Apply Suggestion
                          </Button>
                          <Button 
                            variant="outline" 
                            className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => copyToClipboard(analysis.sectionSuggestions.summary!.improved)}
                          >
                            <Copy className="h-4 w-4" /> Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        No summary optimization available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Experience Tab */}
              <TabsContent value="experience" className="mt-0">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Work Experience Optimization</CardTitle>
                    <CardDescription>AI-suggested improvements for your work experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysis.sectionSuggestions.experience && analysis.sectionSuggestions.experience.length > 0 ? (
                      <div className="space-y-8">
                        {analysis.sectionSuggestions.experience.map((exp, idx) => (
                          <div key={idx} className="space-y-6 pb-6 border-b border-blue-100 last:border-0">
                            <div>
                              <h3 className="text-sm font-medium mb-2 text-blue-600">Current Description</h3>
                              <div className="bg-muted p-4 rounded-md text-sm">
                                {exp.original}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium mb-2 text-blue-600 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600" /> AI-Optimized Description
                              </h3>
                              <div className="bg-blue-50 p-4 rounded-md text-sm border border-blue-100">
                                {exp.improved}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                {exp.explanation}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                onClick={() => handleApplySuggestion('experience', idx, 'description', exp.improved)}
                              >
                                <Zap className="h-4 w-4" /> Apply Suggestion
                              </Button>
                              <Button 
                                variant="outline" 
                                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                                onClick={() => copyToClipboard(exp.improved)}
                              >
                                <Copy className="h-4 w-4" /> Copy to Clipboard
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        No experience optimization available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Skills Tab */}
              <TabsContent value="skills" className="mt-0">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Skills Optimization</CardTitle>
                    <CardDescription>AI-suggested improvements for your skills section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysis.sectionSuggestions.skills ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2 text-blue-600">Current Skills</h3>
                          <div className="bg-muted p-4 rounded-md text-sm">
                            {analysis.sectionSuggestions.skills.original}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium mb-2 text-blue-600 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-blue-600" /> AI-Optimized Skills
                          </h3>
                          <div className="bg-blue-50 p-4 rounded-md text-sm border border-blue-100">
                            {analysis.sectionSuggestions.skills.improved}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            {analysis.sectionSuggestions.skills.explanation}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                            onClick={() => {
                              // Split the skills string into an array
                              const skillsArray = analysis.sectionSuggestions.skills!.improved.split(', ');
                              // Apply each skill individually
                              handleApplySuggestion('skills', 0, 'list', JSON.stringify(skillsArray));
                            }}
                          >
                            <Zap className="h-4 w-4" /> Apply Suggestion
                          </Button>
                          <Button 
                            variant="outline" 
                            className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                            onClick={() => copyToClipboard(analysis.sectionSuggestions.skills!.improved)}
                          >
                            <Copy className="h-4 w-4" /> Copy to Clipboard
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        No skills optimization available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            /* Placeholder for Analysis */
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="flex justify-center mb-4">
                  <FileText className="h-16 w-16 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-blue-600">Resume Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Paste a job description and click "Analyze Resume" to get AI-powered recommendations.
                </p>
                <div className="flex justify-center">
                  <Briefcase className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}