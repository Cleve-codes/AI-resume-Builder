'use client'
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-indigo-400 opacity-10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-on-scroll">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Land your dream job</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">with AI-powered resumes</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Our AI-powered resume builder helps you create ATS-friendly resumes tailored to specific job descriptions. Get instant feedback, suggestions, and improvements to maximize your chances of landing interviews.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0">
              <Link href="/signup">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-xl transform hover:-translate-y-0.5">
                Build Your Resume Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ATS-Optimized
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                AI-Powered
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Job-Specific
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center animate-on-scroll">
            <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden border border-blue-100">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
                alt="Resume builder dashboard"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 