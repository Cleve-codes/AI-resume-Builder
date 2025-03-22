"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Check, AlertTriangle, FileText, Briefcase } from "lucide-react";

export default function AiAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<null | {
    score: number;
    keywordMatch: number;
    missingKeywords: string[];
    suggestions: string[];
    strengths: string[];
    improvements: string[];
  }>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      // Simulating AI analysis with a timeout
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
        });
        setIsAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Resume Analysis
        </h2>
        <p className="text-muted-foreground">
          Paste a job description below to analyze your resume and get AI-powered recommendations.
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
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 mb-1">Keyword Match</div>
                      <div className="text-3xl font-bold text-blue-600">{analysis.keywordMatch}%</div>
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