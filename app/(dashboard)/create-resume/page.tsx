"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import * as echarts from "echarts";


export default function Page () {

    const [activeStep, setActiveStep] = useState(1);
  const [atsScore, setAtsScore] = useState(78);
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setActiveStep(2);
    }
  };

  const handleJobDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setJobDescription(event.target.value);
  };

    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[
            "Upload Resume",
            "Job Description",
            "AI Analysis",
            "Optimize",
          ].map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= activeStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm text-gray-600">{step}</span>
            </div>
          ))}
        </div>
        <Progress value={activeStep * 25} className="h-2" />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Resume Editor */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resume Builder</h2>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                <TabsTrigger value="job">Job Description</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium mb-2">
                    Drag and drop your resume here
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Supported formats: PDF, DOC, DOCX
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button
                    className="!rounded-button"
                    onClick={() =>
                      document.getElementById("resume-upload")?.click()
                    }
                  >
                    Browse Files
                  </Button>
                  {fileName && (
                    <div className="mt-4 text-sm text-gray-600">
                      <i className="fas fa-file-alt mr-2"></i>
                      {fileName}
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="job">
                <textarea
                  className="w-full h-64 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                ></textarea>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Column - Analysis & Recommendations */}
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">ATS Score</h3>
              <Badge variant="outline" className="text-green-600 bg-green-50">
                Good Match
              </Badge>
            </div>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600">
                {atsScore}%
              </div>
              <p className="text-sm text-gray-500">Optimization Score</p>
            </div>
            <Slider
              defaultValue={[atsScore]}
              max={100}
              step={1}
              className="mb-6"
            />
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Keyword Match</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Format Compatibility</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Section Coverage</span>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {[
                  "Add more specific technical skills related to the job requirements",
                  "Quantify your achievements with metrics and numbers",
                  "Include relevant certifications mentioned in the job post",
                  "Strengthen your professional summary with industry keywords",
                  "Add more detail to your most recent work experience",
                ].map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <i className="fas fa-lightbulb text-yellow-500 mt-1"></i>
                    <p className="text-sm text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          className="!rounded-button"
          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Previous Step
        </Button>
        <Button
          className="!rounded-button"
          onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
        >
          Next Step
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </main>
    )
}