import React from 'react';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { getServerSideUser, requireAuth } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeTemplate } from '@/types/resume';

// Import the shared TemplateGallery component
import { TemplateGallery } from '@/components/template-gallery';
import DashboardSidebar from '@/components/dashboard-sidebar';
import DashboardHeader from '@/components/dashboard-header';

// Mockup Images for the templates
import Modern from '@/public/templates/thumbnails/modern.jpg';

export const metadata: Metadata = {
  title: 'Resume Templates',
  description: 'Choose from a variety of professional resume templates to customize your resume.',
};

async function getTemplates() {
  try {
    const templates = await prisma.template.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    return templates as unknown as ResumeTemplate[];
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
}

async function getUserSubscriptionStatus() {
  // Get the current logged in user
  const user = await getServerSideUser();
  
  if (!user?.email) {
    return false;
  }
  
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email
      },
      select: {
        isPremium: true
      }
    });
    
    return userDetails?.isPremium || false;
  } catch (error) {
    console.error('Error fetching user subscription status:', error);
    return false;
  }
}

export default async function TemplatesPage() {
  // Use our requireAuth helper that already handles redirection
  await requireAuth();
  
  const templates = await getTemplates();
  const isPremiumUser = await getUserSubscriptionStatus();
  
  return (
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <DashboardHeader />
          
          {/* Page Content */}
          <main className="p-6 lg:p-8 pt-20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Resume Templates</h1>
                <p className="text-muted-foreground">Choose a template that best suits your professional style.</p>
              </div>
              <div className="grid gap-8">
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <TabsList>
                      <TabsTrigger value="all">All Templates</TabsTrigger>
                      <TabsTrigger value="professional">Professional</TabsTrigger>
                      <TabsTrigger value="modern">Modern</TabsTrigger>
                      <TabsTrigger value="creative">Creative</TabsTrigger>
                    </TabsList>
                    
                    {!isPremiumUser && (
                      <div className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        Upgrade to Premium to unlock all templates
                      </div>
                       )}
                       </div>
                       
                       <TabsContent value="all" className="mt-6">
                         <TemplateGallery 
                           templates={templates} 
                           isPremiumUser={isPremiumUser}
                         />
                       </TabsContent>
                       
                       <TabsContent value="professional" className="mt-6">
                         <TemplateGallery 
                           templates={templates.filter(t => t.category === 'professional')} 
                           isPremiumUser={isPremiumUser} 
                         />
                       </TabsContent>
                       
                       <TabsContent value="modern" className="mt-6">
                         <TemplateGallery 
                           templates={templates.filter(t => t.category === 'modern')} 
                           isPremiumUser={isPremiumUser} 
                         />
                       </TabsContent>
                       <TabsContent value="creative" className="mt-6">
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