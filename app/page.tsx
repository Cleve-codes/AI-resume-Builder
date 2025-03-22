'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Zap, Shield, Download } from "lucide-react";
import { Wand2, Target, Sparkles, BarChart3, CheckCircle, ArrowRight, CreditCard, Database } from "lucide-react";
import { CircleIcon, Home, LogOut, Bell } from "lucide-react";

export default function HomePage() {
  // Add intersection observer for animations
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 rounded-full p-1.5 group-hover:bg-blue-700 transition-all">
                <CircleIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume Builder</h3>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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

        {/* Features Section */}
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

        {/* How It Works */}
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

        {/* Testimonials */}
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

        {/* CTA Section */}
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
      </main>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-full p-1">
                  <CircleIcon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-bold text-xl">Resume Builder</span>
              </div>
              <p className="text-gray-400 mt-4">
                AI-powered resume builder helping professionals land their dream jobs.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/templates" className="text-gray-400 hover:text-white transition-colors">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CSS for animations */}
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-50 hover:shadow-lg transition-all duration-300 animate-on-scroll group hover:-translate-y-1">
      <div className="mb-5 inline-flex p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center animate-on-scroll">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-50 animate-on-scroll">
      <div className="text-blue-600 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6 4C4.6 4 4 11.6 4 11.6V16H8.4V11.6H6.8C6.8 11.6 7.2 6.8 11.6 6.8V4ZM20 4C13 4 12.4 11.6 12.4 11.6V16H16.8V11.6H15.2C15.2 11.6 15.6 6.8 20 6.8V4Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}