"use client";

import { useState, useEffect } from 'react';
import { ResumeTemplate, ResumeData } from '@/types/resume';
import { ResumeWithDetails } from '@/lib/services/resume-service';

// Helper function to convert from database model to ResumeData format
export function convertToResumeData(resumeDetails: ResumeWithDetails): ResumeData {
  // Create a default empty resume data structure
  const defaultData: ResumeData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
  };
  
  if (!resumeDetails) return defaultData;
  
  // Map contact info
  const personalInfo = resumeDetails.contactInfo ? {
    name: resumeDetails.contactInfo.fullName,
    email: resumeDetails.contactInfo.email,
    phone: resumeDetails.contactInfo.phone || '',
    location: resumeDetails.contactInfo.location || '',
    website: resumeDetails.contactInfo.websiteUrl || undefined,
    linkedin: resumeDetails.contactInfo.linkedinUrl || undefined,
  } : defaultData.personalInfo;
  
  // Map summary
  const summary = resumeDetails.summary ? resumeDetails.summary.content : undefined;
  
  // Map experiences
  const experience = resumeDetails.experiences ? resumeDetails.experiences.map(exp => ({
    title: exp.title,
    company: exp.company,
    location: exp.location || '',
    startDate: formatDate(exp.startDate),
    endDate: exp.endDate ? formatDate(exp.endDate) : undefined,
    current: exp.isCurrentPosition,
    description: exp.description,
  })) : [];
  
  // Map education
  const education = resumeDetails.educations ? resumeDetails.educations.map(edu => ({
    degree: edu.degree,
    institution: edu.institution,
    location: edu.location || '',
    startDate: formatDate(edu.startDate, true),
    endDate: edu.endDate ? formatDate(edu.endDate, true) : '',
    description: edu.description || undefined,
  })) : [];
  
  // Map skills
  const skills = resumeDetails.skills && resumeDetails.skills.length > 0 
    ? resumeDetails.skills.flatMap(skillCategory => skillCategory.skills)
    : [];
  
  // Map projects
  const projects = resumeDetails.projects ? resumeDetails.projects.map(proj => ({
    title: proj.title,
    description: proj.description,
    link: proj.url || undefined,
  })) : undefined;
  
  // Map certifications
  const certifications = resumeDetails.certifications ? resumeDetails.certifications.map(cert => ({
    name: cert.name,
    issuer: cert.issuer,
    date: formatDate(cert.issueDate),
  })) : undefined;
  
  return {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
  };
}

// Helper function to format dates
function formatDate(date: Date | string, yearOnly = false): string {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (yearOnly) {
    return d.getFullYear().toString();
  }
  
  // Format as "MMM YYYY" (e.g., "Jan 2023")
  return `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
}

export function useResumeTemplate(resumeDetails: ResumeWithDetails | null, template: ResumeTemplate | null) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  
  useEffect(() => {
    if (resumeDetails) {
      const convertedData = convertToResumeData(resumeDetails);
      setResumeData(convertedData);
    } else {
      setResumeData(null);
    }
  }, [resumeDetails]);
  
  // Default template if none is provided
  const defaultTemplate: ResumeTemplate = {
    id: 'default-template',
    name: 'Professional',
    description: 'A clean, professional template suitable for most industries',
    thumbnail: '/templates/professional.png',
    isActive: true,
    isPremium: false,
    category: 'professional',
    structure: {
      fontFamily: 'Inter, sans-serif',
      primaryColor: '#2563eb', // blue-600
      secondaryColor: '#6366f1', // indigo-500
      sections: ['contact', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
      layout: 'standard',
    },
  };
  
  return {
    resumeData,
    activeTemplate: template || defaultTemplate,
  };
}
