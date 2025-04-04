  "use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ResumeTemplate } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowUpRight, Lock } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Crown } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
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

interface TemplateImageProps {
  template: ResumeTemplate;
  className?: string;
}

export const TemplateImage = ({ template, className = "" }: TemplateImageProps) => {
  const [hasError, setHasError] = useState(false);
  
  // If no thumbnail or error loading, show placeholder
  if (!template.thumbnail || hasError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-4xl font-bold text-gray-300">{template.name.charAt(0)}</div>
      </div>
    );
  }
  
  // If the thumbnail is an HTML file, use an iframe
  if (template.thumbnail.endsWith('.html')) {
    return (
      <div className={`w-full h-full overflow-hidden ${className}`}>
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
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

interface TemplateCardProps {
  template: ResumeTemplate;
  isPremiumUser: boolean;
  isSelected?: boolean;
  onSelect?: (template: ResumeTemplate) => void;
  onPreview?: (template: ResumeTemplate, e: React.MouseEvent) => void;
  showPreviewButton?: boolean;
  cardStyle?: 'compact' | 'detailed';
}

export const TemplateCard = ({
  template,
  isPremiumUser,
  isSelected = false,
  onSelect,
  onPreview,
  showPreviewButton = true,
  cardStyle = 'detailed'
}: TemplateCardProps) => {
  const { toast } = useToast();
  
  const handleSelect = () => {
    // Check if user can use this template
    if (template.isPremium && !isPremiumUser) {
      toast({
        title: "Premium Template",
        description: "Upgrade to Premium to use this template",
        variant: "destructive",
      });
      return;
    }
    
    if (onSelect) {
      onSelect(template);
    }
  };
  
  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the onClick of the parent div
    if (onPreview) {
      onPreview(template, e);
    }
  };
  
  // Compact style (used in dashboard)
  if (cardStyle === 'compact') {
    return (
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md cursor-pointer" onClick={handleSelect}>
        <div className="h-40 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center border-b group-hover:from-primary/10 group-hover:to-primary/20 transition-colors relative">
          <TemplateImage template={template} />
          
          {template.isPremium && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-500 text-white">
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
        </div>
        <CardHeader className="pb-2">
          <CardTitle>{template.name}</CardTitle>
          <CardDescription>{template.category}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary/5 transition-colors"
          >
            Use Template
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Detailed style (used in template gallery)
  return (
    <div
      onClick={handleSelect}
      className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'border-primary shadow-lg scale-[1.02]' 
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
        
        {showPreviewButton && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2 opacity-80 hover:opacity-100"
            onClick={handlePreview}
          >
            Preview
          </Button>
        )}
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
          
          {isSelected && (
            <div className="text-xs font-medium text-primary">
              Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TemplateGalleryProps {
  templates: ResumeTemplate[];
  isPremiumUser: boolean;
  onTemplateSelect?: (template: ResumeTemplate) => void;
  isSelectionMode?: boolean;
  showAllTemplatesLink?: boolean;
  displayMode?: 'grid' | 'carousel';
  maxDisplayCount?: number;
  cardStyle?: 'compact' | 'detailed';
  title?: string;
  showPreviewButton?: boolean;
  previewComponent?: React.ComponentType<{
    template: ResumeTemplate;
    onClose: () => void;
    onSelect: (template: ResumeTemplate) => void;
    isPremiumUser: boolean;
  }>;
}

export function TemplateGallery({
  templates,
  isPremiumUser,
  onTemplateSelect,
  isSelectionMode = false,
  showAllTemplatesLink = false,
  displayMode = 'grid',
  maxDisplayCount,
  cardStyle = 'detailed',
  title,
  showPreviewButton = true,
  previewComponent: PreviewComponent
}: TemplateGalleryProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  
  // Filter templates if maxDisplayCount is provided
  const displayTemplates = maxDisplayCount ? templates.slice(0, maxDisplayCount) : templates;
  
  // If there are no templates, show a message
  if (!displayTemplates.length) {
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
  
  const navigateToTemplatesPage = () => {
    router.push('/dashboard/resume/templates');
  };
  
  return (
    <div className="space-y-6">
      {title && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
        </motion.div>
      )}
      
      <motion.div 
        className={`grid grid-cols-1 ${
          cardStyle === 'compact' 
            ? 'sm:grid-cols-2 md:grid-cols-3 gap-6' 
            : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {displayTemplates.map((template) => (
          <motion.div 
            key={template.id}
            variants={itemVariants}
          >
            <div 
              className="bg-white rounded-lg border overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={template.thumbnail || '/templates/thumbnails/default.jpg'}
                  alt={template.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {template.isPremium && !isPremiumUser && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-black/80 rounded-full p-3">
                      <Lock className="h-6 w-6 text-amber-400" />
                    </div>
                  </div>
                )}
                
                {template.isPremium && (
                  <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 text-white border-none flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Premium
                  </Badge>
                )}
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-base mb-1">{template.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {template.tags && template.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {template.isPremium && !isPremiumUser ? (
                  <Button variant="outline" className="w-full text-sm">
                    Upgrade to Use
                  </Button>
                ) : (
                  <Link href={`/dashboard/resume/create?template=${template.id}`} className="w-full">
                    <Button className="w-full text-sm">Use Template</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {!isSelectionMode && selectedTemplate && (
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleCreateResume}
            size="lg"
          >
            Continue with {selectedTemplate.name}
          </Button>
        </div>
      )}
      
      {showAllTemplatesLink && (
        <motion.div variants={itemVariants} className="mt-4 text-center">
          <Button 
            variant="link" 
            className="gap-1"
            onClick={navigateToTemplatesPage}
          >
            Browse all templates <ArrowUpRight className="h-3 w-3" />
          </Button>
        </motion.div>
      )}
      
      {previewTemplate && PreviewComponent && (
        <PreviewComponent
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
