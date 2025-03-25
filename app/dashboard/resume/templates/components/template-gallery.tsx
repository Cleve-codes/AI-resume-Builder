"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ResumeTemplate } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { TemplatePreview } from './template-preview';
import Image, { StaticImageData } from 'next/image';

interface TemplateGalleryProps {
  templates: ResumeTemplate[];
  isPremiumUser: boolean;
  onTemplateSelect?: (template: ResumeTemplate) => void;
  isSelectionMode?: boolean;
}

interface TemplateImageProps {
  template: ResumeTemplate;
}

const TemplateImage = ({ template }: TemplateImageProps) => {
  const [hasError, setHasError] = useState(false);
  
  // If no thumbnail or error loading, show placeholder
  if (!template.thumbnail || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-4xl font-bold text-gray-300">{template.name.charAt(0)}</div>
      </div>
    );
  }
  
  // If the thumbnail is an HTML file, use an iframe
  if (template.thumbnail.endsWith('.html')) {
    return (
      <div className="w-full h-full overflow-hidden">
        <iframe 
          src={template.thumbnail}
          className="w-full h-full border-0"
          title={`${template.name} thumbnail`}
          loading="lazy"
          scrolling="no"
          style={{ overflow: 'hidden' }}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // For image thumbnails
  return (
    <Image 
      src={template.thumbnail} 
      alt={template.name}
      width={320}
      height={160}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export function TemplateGallery({
  templates,
  isPremiumUser,
  onTemplateSelect,
  isSelectionMode = false
}: TemplateGalleryProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  
  // If there are no templates, show a message
  if (!templates.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No templates found</h3>
        <p className="text-gray-500">
          Try selecting a different category or check back later for more templates.
        </p>
      </div>
    );
  }
  
  const handleTemplateSelect = (template: ResumeTemplate) => {
    // Check if user can use this template
    if (template.isPremium && !isPremiumUser) {
      toast({
        title: "Premium Template",
        description: "Upgrade to Premium to use this template",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedTemplate(template);
    
    if (onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  const handlePreview = (template: ResumeTemplate, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the onClick of the parent div
    setPreviewTemplate(template);
  };
  
  const handleCreateResume = () => {
    if (!selectedTemplate) {
      toast({
        title: "Select a Template",
        description: "Please select a template first",
        variant: "destructive",
      });
      return;
    }
    
    router.push(`/dashboard/resume/create?templateId=${selectedTemplate.id}`);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {templates.map((template) => (
          <motion.div 
            key={template.id}
            variants={item}
            onClick={() => handleTemplateSelect(template)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              selectedTemplate?.id === template.id 
                ? 'border-primary-500 shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="h-40 relative bg-gray-100">
              <TemplateImage template={template} />
              
              {template.isPremium && (
                <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                  Premium
                </Badge>
              )}
              
              {template.isPremium && !isPremiumUser && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              )}
              
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 opacity-80 hover:opacity-100"
                onClick={(e) => handlePreview(template, e)}
              >
                Preview
              </Button>
            </div>
            
            <div className="p-4 bg-white">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {template.description}
              </p>
              
              <div className="mt-3 flex justify-between items-center">
                <Badge variant="outline" className="text-xs">
                  {template.category}
                </Badge>
                
                {selectedTemplate?.id === template.id && (
                  <div className="text-xs font-medium text-primary-500">
                    Selected
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {!isSelectionMode && (
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleCreateResume}
            disabled={!selectedTemplate}
            size="lg"
          >
            Continue with {selectedTemplate?.name || 'Selected Template'}
          </Button>
        </div>
      )}
      
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={(template) => {
            setSelectedTemplate(template);
            setPreviewTemplate(null);
            
            if (onTemplateSelect) {
              onTemplateSelect(template);
            }
          }}
          isPremiumUser={isPremiumUser}
        />
      )}
    </div>
  );
} 