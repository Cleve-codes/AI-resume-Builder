"use client";

import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import ProfessionalTemplate from '@/app/components/resume-templates/ProfessionalTemplate';
import ModernTemplate from '@/app/components/resume-templates/ModernTemplate';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ResumePreviewWithTemplateProps {
  resumeData: ResumeData | null;
  template: ResumeTemplate | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResumePreviewWithTemplate({
  resumeData,
  template,
  isLoading,
  error
}: ResumePreviewWithTemplateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">Loading resume preview...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p className="font-medium">Error loading resume</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!resumeData || !template) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
        <p className="font-medium">No resume data or template found</p>
        <p className="text-sm">Please select a template or create a resume first.</p>
      </div>
    );
  }

  // Render the appropriate template based on the template layout
  const renderTemplate = () => {
    switch (template.structure.layout) {
      case 'split':
        return (
          <div className="flex justify-center">
            <div className="transform scale-75 origin-top">
              <ModernTemplate
                data={resumeData}
                template={template}
                isEditable={false}
              />
            </div>
          </div>
        );
      case 'standard':
      default:
        return (
          <div className="flex justify-center">
            <div className="transform scale-75 origin-top">
              <ProfessionalTemplate
                data={resumeData}
                template={template}
                isEditable={false}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="p-6 border-blue-100 overflow-auto">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium text-blue-600">{template.name} Template</h3>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
        
        {renderTemplate()}
      </div>
    </Card>
  );
}
