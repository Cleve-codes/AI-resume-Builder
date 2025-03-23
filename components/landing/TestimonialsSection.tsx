'use client'
import React from "react";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate-on-scroll">What Our Users Say</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-on-scroll">Join thousands of professionals who've landed their dream jobs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="I landed 3 interviews within a week after optimizing my resume. The AI suggestions were spot on!"
            author="Sarah T."
            role="Software Engineer"
          />
          <TestimonialCard
            quote="The ATS optimization made all the difference. I finally started getting callbacks after months of silence."
            author="James L."
            role="Marketing Manager"
          />
          <TestimonialCard
            quote="Resume Builder saved me hours of work and frustration. My resume looks incredible and matches job requirements perfectly."
            author="Mira K."
            role="Data Scientist"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 