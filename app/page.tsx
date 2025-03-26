'use client'
import React from "react";
import { AnimationProvider } from "@/components/landing/AnimationContext";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <AnimationProvider>
      <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-white to-blue-50">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AnimationProvider>
  );
}