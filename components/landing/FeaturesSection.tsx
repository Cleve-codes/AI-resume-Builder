'use client'
import React from "react";
import { Shield, FileText, Zap, Download } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-blue-50 opacity-50"></div>
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate-on-scroll">Key Features</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-on-scroll">Everything you need to create professional, ATS-optimized resumes that get results</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="User Authentication"
            description="Secure email-based signup and login with password recovery and account management."
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10 text-blue-600" />}
            title="Resume Management"
            description="Upload existing resumes, build from scratch using templates, and edit in real-time."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-blue-600" />}
            title="AI-Powered Analysis"
            description="Smart job description parsing, ATS optimization suggestions, and skill gap analysis."
          />
          <FeatureCard
            icon={<Download className="h-10 w-10 text-blue-600" />}
            title="PDF Export"
            description="Professional, ATS-friendly formatting with multiple template options."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 