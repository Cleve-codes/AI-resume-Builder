"use client";

import { useState, useEffect } from 'react';
import { ResumeWithDetails } from '@/lib/services/resume-service';
import { ResumeTemplate } from '@/types/resume';

export interface UseResumeDataReturn {
  resume: ResumeWithDetails | null;
  template: ResumeTemplate | null;
  isLoading: boolean;
  error: string | null;
  saveResume: () => Promise<void>;
  updateResumeField: (section: string, index: number, field: string, value: string) => void;
}

export function useResumeData(resumeId: string): UseResumeDataReturn {
  const [resume, setResume] = useState<ResumeWithDetails | null>(null);
  const [template, setTemplate] = useState<ResumeTemplate | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId || resumeId === 'new') return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch resume data
        const response = await fetch(`/api/resumes/${resumeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        
        const resumeData = await response.json();
        setResume(resumeData);
        
        // If resume has a template, fetch template data
        if (resumeData.templateId) {
          const templateResponse = await fetch(`/api/templates/${resumeData.templateId}`);
          
          if (templateResponse.ok) {
            const templateData = await templateResponse.json();
            setTemplate(templateData);
          }
        }
      } catch (err) {
        console.error('Error fetching resume data:', err);
        setError('Failed to load resume data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeData();
  }, [resumeId]);
  
  // Function to save resume changes
  const saveResume = async () => {
    if (!resume) return;
    
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save resume');
      }
      
      // Could update the UI to show a success message
    } catch (err) {
      console.error('Error saving resume:', err);
      setError('Failed to save resume. Please try again.');
    }
  };
  
  // Function to update a field in the resume
  const updateResumeField = (section: string, index: number, field: string, value: string) => {
    if (!resume) return;
    
    setResume(prevResume => {
      if (!prevResume) return null;
      
      // Create a deep copy of the resume
      const updatedResume = JSON.parse(JSON.stringify(prevResume));
      
      // Handle different sections
      if (section === 'personalInfo') {
        if (updatedResume.contactInfo) {
          // Map field names from the UI to the database schema
          const fieldMap: Record<string, string> = {
            name: 'fullName',
            email: 'email',
            phone: 'phone',
            location: 'location',
            linkedin: 'linkedinUrl',
            website: 'websiteUrl',
          };
          
          const dbField = fieldMap[field] || field;
          updatedResume.contactInfo[dbField] = value;
        }
      } else if (section === 'summary') {
        if (updatedResume.summary) {
          updatedResume.summary.content = value;
        } else {
          // Create summary if it doesn't exist
          updatedResume.summary = { content: value };
        }
      } else if (section === 'experience' && updatedResume.experiences && updatedResume.experiences[index]) {
        updatedResume.experiences[index][field] = value;
      } else if (section === 'education' && updatedResume.educations && updatedResume.educations[index]) {
        updatedResume.educations[index][field] = value;
      } else if (section === 'skills') {
        // Handle skills updates based on the structure
        // This would depend on how skills are structured in your app
      }
      
      return updatedResume;
    });
  };
  
  return {
    resume,
    template,
    isLoading,
    error,
    saveResume,
    updateResumeField,
  };
}
