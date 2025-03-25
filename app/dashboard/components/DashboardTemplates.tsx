"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeTemplate } from "@/types/resume";
import { TemplateGallery } from "@/components/template-gallery";



export function DashboardTemplates() {
  const router = useRouter();
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/templates');
        
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        
        const data = await response.json();
        // Get featured templates - limit to 3 for dashboard display
        const featuredTemplates = data.slice(0, 3);
        setTemplates(featuredTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
        // Fallback to empty array if fetch fails
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  // Function to handle template selection
  const handleTemplateSelect = (template: ResumeTemplate) => {
    router.push(`/dashboard/resume/create?templateId=${template.id}`);
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <TemplateGallery
        templates={templates}
        isPremiumUser={false} // This should be updated based on user's subscription status
        onTemplateSelect={handleTemplateSelect}
        showAllTemplatesLink={true}
        maxDisplayCount={3}
        cardStyle="compact"
        title="Resume Templates"
        showPreviewButton={false}
      />
    </>
  );
}
