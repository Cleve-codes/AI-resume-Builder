"use client";

import React, { useState } from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import ResumeEditorWithTemplate from './ResumeEditorWithTemplate';
import { z } from 'zod';

// Define database resume shape
interface DatabaseResumeData {
  id: string;
  title: string;
  templateId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  status?: string;
  userId: string;
  template?: {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    isActive: boolean;
    isPremium: boolean;
    category: string;
    structure: any;
    createdAt: Date;
    updatedAt: Date;
  };
  contactInfo?: any;
  summary?: any;
  experiences?: any[];
  educations?: any[];
  skills?: any[];
  projects?: any[];
  certifications?: any[];
  languages?: any[];
  customSections?: any[];
}

// Schema for template structure validation
const templateStructureSchema = z.object({
  fontFamily: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  sections: z.array(z.string()),
  layout: z.enum(["split", "standard", "creative", "minimal"]),
});

type TemplateStructure = z.infer<typeof templateStructureSchema>;

// Function to validate template structure or return default if invalid
function validateTemplateStructure(data: unknown): TemplateStructure {
  try {
    return templateStructureSchema.parse(data);
  } catch (error) {
    console.warn("Template structure validation failed, using default structure", error);
    // Return default structure
    return {
      fontFamily: "Inter",
      primaryColor: "#0f172a",
      secondaryColor: "#6366f1",
      sections: ["summary", "experience", "education", "skills"],
      layout: "standard",
    };
  }
}

// Transform Database Resume to expected format for the editor
function transformToResumeData(dbResume: DatabaseResumeData): ResumeData {
  return {
    personalInfo: {
      name: dbResume.contactInfo?.name || '',
      email: dbResume.contactInfo?.email || '',
      phone: dbResume.contactInfo?.phone || '',
      location: dbResume.contactInfo?.location || '',
      website: dbResume.contactInfo?.website || '',
      linkedin: dbResume.contactInfo?.linkedin || '',
    },
    summary: dbResume.summary?.content || '',
    experience: dbResume.experiences?.map((exp: any) => ({
      title: exp.title || 'Job Title',
      company: exp.company || '',
      location: exp.location || '',
      startDate: typeof exp.startDate === 'string' ? exp.startDate : exp.startDate?.toISOString().split('T')[0] || '',
      endDate: typeof exp.endDate === 'string' ? exp.endDate : exp.endDate?.toISOString().split('T')[0] || '',
      current: exp.current || false,
      description: exp.description || '',
    })) || [],
    education: dbResume.educations?.map((edu: any) => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      location: edu.location || '',
      startDate: typeof edu.startDate === 'string' ? edu.startDate : edu.startDate?.toISOString().split('T')[0] || '',
      endDate: typeof edu.endDate === 'string' ? edu.endDate : edu.endDate?.toISOString().split('T')[0] || '',
      description: edu.description || '',
    })) || [],
    skills: dbResume.skills?.map((skill: any) => skill.name || '') || [],
    projects: dbResume.projects?.map((project: any) => ({
      title: project.title || 'Project Title',
      description: project.description || '',
      link: project.link || '',
    })) || [],
    certifications: dbResume.certifications?.map((cert: any) => ({
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: typeof cert.date === 'string' ? cert.date : cert.date?.toISOString().split('T')[0] || '',
    })) || [],
  };
}

// Transform template from database to expected format
function transformTemplate(dbTemplate: any): ResumeTemplate | null {
  if (!dbTemplate) return null;
  
  return {
    id: dbTemplate.id,
    name: dbTemplate.name,
    description: dbTemplate.description,
    thumbnail: dbTemplate.thumbnail,
    isActive: dbTemplate.isActive,
    isPremium: dbTemplate.isPremium,
    category: dbTemplate.category,
    structure: validateTemplateStructure(dbTemplate.structure),
  };
}

interface ClientResumeEditorProps {
  resumeData: DatabaseResumeData;
  template: any;
  isLoading: boolean;
  error: string | null;
}

export default function ClientResumeEditor({ 
  resumeData, 
  template,
  isLoading,
  error 
}: ClientResumeEditorProps) {
  // Transform data to expected format
  const [processedResumeData, setProcessedResumeData] = useState<ResumeData | null>(
    resumeData ? transformToResumeData(resumeData) : null
  );
  const [processedTemplate, setProcessedTemplate] = useState<ResumeTemplate | null>(
    template ? transformTemplate(template) : null
  );
  const [localIsLoading, setLocalIsLoading] = useState(isLoading);
  const [localError, setLocalError] = useState(error);

  // Handle editing fields
  const handleEditField = (section: string, index: number, field: string, value: string) => {
    if (!processedResumeData) return;
    
    // Clone the resume data
    const updatedResumeData = { ...processedResumeData };
    
    // Update the field based on section and index
    if (section === 'personalInfo') {
      updatedResumeData.personalInfo = {
        ...updatedResumeData.personalInfo,
        [field]: value,
      };
    } else if (section === 'summary') {
      updatedResumeData.summary = value;
    } else if (Array.isArray(updatedResumeData[section as keyof ResumeData])) {
      const sectionArray = [...(updatedResumeData[section as keyof ResumeData] as any[])];
      if (sectionArray[index]) {
        sectionArray[index] = {
          ...sectionArray[index],
          [field]: value,
        };
        (updatedResumeData[section as keyof ResumeData] as any[]) = sectionArray;
      }
    }
    
    setProcessedResumeData(updatedResumeData);
    
    // Here you would also implement API calls to update the database
    // For example:
    // updateResumeField(resumeData.id, section, index, field, value)
    //   .then(() => console.log('Field updated'))
    //   .catch(err => setLocalError('Failed to update field: ' + err.message));
  };

  return (
    <ResumeEditorWithTemplate
      resumeData={processedResumeData}
      template={processedTemplate}
      isLoading={localIsLoading}
      error={localError}
      onEditField={handleEditField}
    />
  );
} 