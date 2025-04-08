// 'use client'
// import React from "react";
// import { AnimationProvider } from "@/components/landing/AnimationContext";
// import Header from "@/components/landing/Header";
// import HeroSection from "@/components/landing/HeroSection";
// import FeaturesSection from "@/components/landing/FeaturesSection";
// import HowItWorksSection from "@/components/landing/HowItWorksSection";
// import TestimonialsSection from "@/components/landing/TestimonialsSection";
// import CTASection from "@/components/landing/CTASection";
// import Footer from "@/components/landing/Footer";
// import { Toaster } from "@/components/ui/toaster";

// export default function HomePage() {
//   return (
//     <AnimationProvider>
//     <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-white to-blue-50">
//         <Header />
//       <main className="flex-1">
//           <HeroSection />
//           <FeaturesSection />
//           <HowItWorksSection />
//           <TestimonialsSection />
//           <CTASection />
//       </main>
//         <Footer />
//         <Toaster />
//       </div>
//     </AnimationProvider>
//   );
// }


"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Zap, Shield, Download, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#E86C3A]" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#E86C3A] to-[#F8B886]">
              ResumeAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-[#E86C3A] to-[#F8B886] hover:opacity-90 transition-opacity text-black font-medium">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,108,58,0.15),transparent_60%)]" />
          <div className="absolute top-20 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_60%,rgba(248,184,134,0.1),transparent_50%)]" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
            >
              <span className="text-sm text-white/70">Powered by AI</span>
              <ChevronRight className="h-4 w-4 text-[#E86C3A]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">AI-Powered</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E86C3A] to-[#F8B886]">
                Resume Builder
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Create ATS-optimized resumes with the power of artificial intelligence. Stand out from the competition and
              land your dream job.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-[#E86C3A] to-[#F8B886] hover:opacity-90 transition-opacity text-black font-medium px-8 py-6"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white px-8 py-6">
                  See Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(232,108,58,0.1),transparent_60%)]" />

          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              >
                Key Features
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 w-20 bg-gradient-to-r from-[#E86C3A] to-[#F8B886] mx-auto mt-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-[#E86C3A]" />}
                title="User Authentication"
                description="Secure email-based signup and login with password recovery and account management."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-[#E86C3A]" />}
                title="Resume Management"
                description="Upload existing resumes, build from scratch using templates, and edit in real-time."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-[#E86C3A]" />}
                title="AI-Powered Analysis"
                description="Smart job description parsing, ATS optimization suggestions, and skill gap analysis."
              />
              <FeatureCard
                icon={<Download className="h-10 w-10 text-[#E86C3A]" />}
                title="PDF Export"
                description="Professional, ATS-friendly formatting with multiple template options."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(248,184,134,0.1),transparent_60%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
              >
                How It Works
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 w-20 bg-gradient-to-r from-[#E86C3A] to-[#F8B886] mx-auto mt-4"
              />
            </div>

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

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,108,58,0.2),transparent_70%)]" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
            >
              Ready to Supercharge Your Job Search?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/60 max-w-2xl mx-auto mb-10"
            >
              Join thousands of professionals who have improved their job application success rate with ResumeAI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#E86C3A] to-[#F8B886] hover:opacity-90 transition-opacity text-black font-medium px-8 py-6"
                >
                  Create Your Resume Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <FileText className="h-5 w-5 text-[#E86C3A]" />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E86C3A] to-[#F8B886]">
                ResumeAI
              </span>
            </div>
            <div className="flex gap-6 mb-6 md:mb-0">
              <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-white/40">
            &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group"
    >
      <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white/60">{description}</p>
    </motion.div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center relative"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E86C3A] to-[#F8B886] flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-black">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-white/60">{description}</p>

      {number !== "3" && (
        <div className="hidden md:block absolute top-8 left-[calc(100%-16px)] w-[calc(100%-32px)] h-px bg-gradient-to-r from-[#E86C3A] to-[#F8B886] opacity-50"></div>
      )}
    </motion.div>
  )
}
