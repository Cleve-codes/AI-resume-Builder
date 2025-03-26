"use client";

import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, User, FileText, Briefcase, GraduationCap, Award, Code, Languages, Plus } from 'lucide-react';

// Import these if available, otherwise use placeholders
let ResumeEditor;
try {
  ResumeEditor = require('@/components/resume-editor').default;
} catch (error) {
  console.warn("ResumeEditor component not found, using placeholder");
  ResumeEditor = ({ initialData, onFieldChange }) => (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="text-lg font-medium mb-2">Resume Editor Placeholder</h3>
      <p>The actual Resume Editor component is missing.</p>
      <pre className="mt-2 p-2 bg-gray-100 rounded-sm text-xs overflow-auto">
        {JSON.stringify(initialData, null, 2)}
      </pre>
    </div>
  );
}

// Import template components if available
let ProfessionalTemplate;
let ModernTemplate;
try {
  ProfessionalTemplate = require('@/app/components/resume-templates/ProfessionalTemplate').default;
  ModernTemplate = require('@/app/components/resume-templates/ModernTemplate').default;
} catch (error) {
  console.warn("Template components not found, using placeholders");
  ProfessionalTemplate = () => <div>Professional Template Placeholder</div>;
  ModernTemplate = () => <div>Modern Template Placeholder</div>;
}

interface ResumeEditorWithTemplateProps {
  resumeData: ResumeData | null;
  template: ResumeTemplate | null;
  isLoading: boolean;
  error: string | null;
  onEditField: (section: string, index: number, field: string, value: string) => void;
}

export default function ResumeEditorWithTemplate({
  resumeData,
  template,
  isLoading,
  error,
  onEditField
}: ResumeEditorWithTemplateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-600">Loading resume data...</span>
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

  if (!resumeData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
        <p className="font-medium">No resume data found</p>
        <p className="text-sm">This could be a new resume or there might be an issue loading the data.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Resume Sections */}
      <Card className="lg:col-span-1 p-4 border-blue-100">
        <div className="space-y-1 mb-6">
          <h3 className="font-medium text-blue-600">Resume Sections</h3>
          <p className="text-xs text-muted-foreground">Click to edit each section</p>
        </div>

        <div className="space-y-1">
          <SectionButton 
            icon={<User className="h-4 w-4 text-blue-600" />} 
            label="Contact Information" 
            active={true} 
          />
          <SectionButton 
            icon={<FileText className="h-4 w-4 text-blue-600" />} 
            label="Professional Summary" 
          />
          <SectionButton 
            icon={<Briefcase className="h-4 w-4 text-blue-600" />} 
            label="Work Experience" 
          />
          <SectionButton 
            icon={<GraduationCap className="h-4 w-4 text-blue-600" />} 
            label="Education" 
          />
          <SectionButton 
            icon={<Award className="h-4 w-4 text-blue-600" />} 
            label="Skills" 
          />
          {resumeData.projects && resumeData.projects.length > 0 && (
            <SectionButton 
              icon={<Code className="h-4 w-4 text-blue-600" />} 
              label="Projects" 
            />
          )}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <SectionButton 
              icon={<Award className="h-4 w-4 text-blue-600" />} 
              label="Certifications" 
            />
          )}
          <Button variant="ghost" className="w-full justify-start text-blue-600 hover:bg-blue-50">
            <Plus className="h-4 w-4 mr-2 text-blue-600" /> Add Section
          </Button>
        </div>
      </Card>

      {/* Resume Editor */}
      <Card className="lg:col-span-3 p-6 border-blue-100">
        <ResumeEditor 
          initialData={resumeData}
          onFieldChange={onEditField}
        />
      </Card>
    </div>
  );
}

function SectionButton({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start text-blue-600 hover:bg-blue-50 ${active ? "bg-blue-50" : ""}`}
    >
      <span className="mr-2">{icon}</span> {label}
    </Button>
  );
}
