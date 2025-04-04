"use client";

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeTemplate } from '@/types/resume';
import { LayoutGrid, Briefcase, Sparkles, PaintBucket } from 'lucide-react';

// Import the shared TemplateGallery component
import { TemplateGallery } from '@/components/template-gallery';
import { useUser } from '@clerk/nextjs';

// Mockup Images for the templates
import Modern from '@/public/templates/thumbnails/modern.jpg';

export default function TemplatesPage() {
  const { user, isLoaded } = useUser();
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch templates
        const templatesResponse = await fetch('/api/templates');
        const templatesData = await templatesResponse.json();
        
        if (templatesResponse.ok) {
          setTemplates(templatesData);
        }
        
        // Fetch premium status if user is loaded
        if (isLoaded && user) {
          // You could get the premium status from Clerk user metadata
          // or make an API call to your backend to check subscription status
          const profileResponse = await fetch('/api/profile');
          const profileData = await profileResponse.json();
          
          if (profileResponse.ok) {
            setIsPremiumUser(profileData.isPremium || false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [isLoaded, user]);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-50 items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 w-full overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-full">
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 pt-16 sm:pt-20 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Resume Templates</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Choose a template that best suits your professional style.</p>
            </div>
            <div className="grid gap-4 sm:gap-8 w-full">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <TabsList className="w-full sm:w-auto overflow-x-auto">
                    <TabsTrigger value="all" className="px-3 py-1.5 sm:px-4 sm:py-2">
                      <LayoutGrid className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">All Templates</span>
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="px-3 py-1.5 sm:px-4 sm:py-2">
                      <Briefcase className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Professional</span>
                    </TabsTrigger>
                    <TabsTrigger value="modern" className="px-3 py-1.5 sm:px-4 sm:py-2">
                      <Sparkles className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Modern</span>
                    </TabsTrigger>
                    <TabsTrigger value="creative" className="px-3 py-1.5 sm:px-4 sm:py-2">
                      <PaintBucket className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Creative</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {!isPremiumUser && (
                    <div className="text-xs sm:text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full whitespace-nowrap">
                      Upgrade to Premium to unlock all templates
                    </div>
                  )}
                </div>
                
                <TabsContent value="all" className="mt-4 sm:mt-6">
                  <TemplateGallery 
                    templates={templates} 
                    isPremiumUser={isPremiumUser}
                  />
                </TabsContent>
                
                <TabsContent value="professional" className="mt-4 sm:mt-6">
                  <TemplateGallery 
                    templates={templates.filter(t => t.category === 'professional')} 
                    isPremiumUser={isPremiumUser} 
                  />
                </TabsContent>
                
                <TabsContent value="modern" className="mt-4 sm:mt-6">
                  <TemplateGallery 
                    templates={templates.filter(t => t.category === 'modern')} 
                    isPremiumUser={isPremiumUser} 
                  />
                </TabsContent>
                <TabsContent value="creative" className="mt-4 sm:mt-6">
                  <TemplateGallery 
                    templates={templates.filter(t => t.category === 'creative')} 
                    isPremiumUser={isPremiumUser} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 