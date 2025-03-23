'use client'
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white animate-on-scroll">Ready to Supercharge Your Job Search?</h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 animate-on-scroll">
          Join thousands of professionals who have improved their job application success rate with our AI-powered resume builder.
        </p>
        <Link href="/signup" className="animate-on-scroll inline-block">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            Create Your Resume Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection; 