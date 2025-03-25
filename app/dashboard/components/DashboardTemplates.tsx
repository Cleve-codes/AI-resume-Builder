"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { TemplateCard } from "./TemplateCard";
import { useRouter } from "next/navigation";
import { ResumeTemplate } from "@/types/resume";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

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

  // Function to navigate to the templates page
  const navigateToTemplatesPage = () => {
    router.push('/dashboard/resume/templates');
  };

  // Show loading state
  if (isLoading) {
    return (
      <>
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </>
    );
  }

  // If no templates are found
  if (templates.length === 0) {
    return (
      <>
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
        </motion.div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates available</p>
          <Button
            variant="link"
            className="mt-2"
            onClick={navigateToTemplatesPage}
          >
            Browse all templates
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold mb-6">Resume Templates</h2>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div key={template.id} variants={itemVariants}>
            <TemplateCard 
              name={template.name} 
              category={template.category}
              thumbnail={template.thumbnail}
              isPremium={template.isPremium} 
              onClick={() => handleTemplateSelect(template)}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4 text-center">
        <Button 
          variant="link" 
          className="gap-1"
          onClick={navigateToTemplatesPage}
        >
          Browse all templates <ArrowUpRight className="h-3 w-3" />
        </Button>
      </motion.div>
    </>
  );
}
