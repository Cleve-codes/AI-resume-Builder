"use client";

import React from 'react';
import { ResumeTemplate } from '@/types/resume';
import ProfessionalTemplate from '@/app/components/resume-templates/ProfessionalTemplate';
import ModernTemplate from '@/app/components/resume-templates/ModernTemplate';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { ArrowDownIcon, XIcon } from '@heroicons/react/24/outline';


// Sample data for preview
const sampleResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson"
  },
  summary: "Experienced software engineer with 5+ years of expertise in full-stack development using React, Node.js, and TypeScript. Passionate about creating user-friendly applications and solving complex problems.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechInnovate Solutions",
      location: "New York, NY",
      startDate: "Jan 2020",
      endDate: "",
      current: true,
      description: "Lead development of a cloud-based SaaS platform serving 50,000+ users. Implemented CI/CD pipelines reducing deployment time by 35%. Mentored junior developers and conducted code reviews."
    },
    {
      title: "Software Developer",
      company: "WebFrontier Co.",
      location: "Boston, MA",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
      current: false,
      description: "Developed responsive web applications using React and Redux. Collaborated with UX designers to implement user-friendly interfaces. Reduced page load time by 40% through code optimization."
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Boston University",
      location: "Boston, MA",
      startDate: "2016",
      endDate: "2018",
      description: "Focus on software engineering and artificial intelligence."
    },
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Michigan",
      location: "Ann Arbor, MI",
      startDate: "2012",
      endDate: "2016",
      description: ""
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", 
    "SQL", "GraphQL", "AWS", "Docker", "Git", "CI/CD", "Agile Methodologies"
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing, user authentication, and inventory management.",
      link: "github.com/alexj/ecommerce"
    },
    {
      title: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates using Socket.io, React, and Express.",
      link: "taskapp.demo.com"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Feb 2021"
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "Nov 2019"
    }
  ]
};

interface TemplatePreviewProps {
  template: ResumeTemplate;
  onClose: () => void;
  onSelect: (template: ResumeTemplate) => void;
  isPremiumUser: boolean;
}

export function TemplatePreview({
  template,
  onClose,
  onSelect,
  isPremiumUser
}: TemplatePreviewProps) {
  const canUse = !template.isPremium || isPremiumUser;
  
  const renderTemplateComponent = () => {
    // Use the layout property to determine which template to render
    switch (template.structure.layout) {
      case 'split':
        return (
          <ModernTemplate
            data={sampleResumeData}
            template={template}
            scale={0.7}
            isEditable={false}
          />
        );
      case 'standard':
      default:
        return (
          <ProfessionalTemplate
            data={sampleResumeData}
            template={template}
            scale={0.7}
            isEditable={false}
          />
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onSelect(template)}
              disabled={!canUse}
              variant="default"
              className="flex items-center gap-2"
            >
              <ArrowDownIcon className="h-4 w-4" />
              {canUse ? 'Use This Template' : 'Premium Template'}
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 flex items-center justify-center overflow-auto">
          <div className="transform origin-top-left">
            {renderTemplateComponent()}
          </div>
        </div>
      </div>
    </div>
  );
} 