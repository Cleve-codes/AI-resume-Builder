'use client'
import React from "react";
import { StepCard } from "./StepCard";

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate-on-scroll">How It Works</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-on-scroll">Three simple steps to your next job opportunity</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Upload or Create"
            description="Upload your existing resume or start from scratch with our templates."
          />
          <StepCard
            number="2"
            title="AI Analysis"
            description="Our AI analyzes your resume and provides optimization suggestions."
          />
          <StepCard
            number="3"
            title="Export & Apply"
            description="Export your optimized resume as a PDF and start applying for jobs."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 