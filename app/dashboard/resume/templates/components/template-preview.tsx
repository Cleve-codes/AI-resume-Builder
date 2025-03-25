"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumeTemplate } from '@/types/resume';
import Image from 'next/image';

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

const TemplateImage = ({ template }: { template: ResumeTemplate }) => {
  const [hasError, setHasError] = useState(false);
  
  if (!template.thumbnail || hasError) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-6xl font-bold text-gray-300">{template.name.charAt(0)}</div>
      </div>
    );
  }

  // If the thumbnail is an HTML file, use an iframe
  if (template.thumbnail.endsWith('.html')) {
    return (
      <div className="w-full h-[300px] overflow-hidden rounded-md">
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

  return (
    <Image 
      src={template.thumbnail}
      alt={template.name}
      width={600}
      height={300}
      className="w-full h-[300px] object-cover rounded-md"
      onError={() => setHasError(true)}
    />
  );
};

export function TemplatePreview({ template, onClose, onSelect, isPremiumUser }: TemplatePreviewProps) {
  const handleSelectClick = () => {
    if (template.isPremium && !isPremiumUser) {
      return; // Don't allow selection if premium template and user is not premium
    }
    
    onSelect(template);
  };
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{template.name}</span>
            {template.isPremium && (
              <Badge className="ml-2 bg-yellow-500">Premium</Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <TemplateImage template={template} />
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-1 text-sm text-gray-500">{template.description}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">Category</h3>
            <p className="mt-1 text-sm text-gray-500">{template.category}</p>
          </div>
          
          {template.isPremium && !isPremiumUser && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-sm text-amber-800">
                This is a premium template. Upgrade your account to access this template.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          <Button 
            onClick={handleSelectClick}
            disabled={template.isPremium && !isPremiumUser}
          >
            {template.isPremium && !isPremiumUser ? 'Premium Template' : 'Use This Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 