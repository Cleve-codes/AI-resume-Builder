# Resume Templates Implementation Guide

This guide explains how to implement the resume templates feature in the AI Resume Builder application.

## Table of Contents

1. [Database Schema](#database-schema)
2. [Template Components](#template-components)
3. [Template Management System](#template-management-system)
4. [Template Selection & Preview](#template-selection--preview)
5. [PDF Generation](#pdf-generation)
6. [Implementation Steps](#implementation-steps)

---

## Database Schema

First, you'll need to set up the database schema to store template information.

### 1. Template Model

Add these models to your Prisma schema:

```prisma
// prisma/schema.prisma

model ResumeTemplate {
  id              String   @id @default(cuid())
  name            String
  description     String
  thumbnail       String   // URL to template thumbnail image
  isActive        Boolean  @default(true)
  isPremium       Boolean  @default(false)
  category        String   @default("professional") // e.g., professional, creative, minimal
  structure       Json     // Template structure & styling information
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  Resume          Resume[]
}

model Resume {
  id              String   @id @default(cuid())
  userId          String
  title           String
  templateId      String
  content         Json     // The user's actual content for the resume
  isPublic        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  template        ResumeTemplate @relation(fields: [templateId], references: [id])
  JobApplication  JobApplication[]
}
```

### 2. Run Migration

Create and apply the migration:

```bash
npx prisma migrate dev --name add_resume_templates
```

## Template Components

Create reusable React components for each part of a resume:

### 1. Component Structure

Set up a directory structure for your template components:

```
/components
  /resume-templates
    /shared
      Header.tsx
      Section.tsx
      List.tsx
      ContactInfo.tsx
    /professional
      ProfessionalTemplate.tsx
    /modern
      ModernTemplate.tsx
    /creative
      CreativeTemplate.tsx
    /minimal
      MinimalTemplate.tsx
    TemplateWrapper.tsx
    index.ts
```

### 2. Shared Components

Create shared components that all templates can use:

```tsx
// components/resume-templates/shared/Section.tsx
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-lg font-bold border-b pb-1 mb-3">{title}</h2>
      {children}
    </div>
  );
};
```

### 3. Template Component

Create a template component:

```tsx
// components/resume-templates/professional/ProfessionalTemplate.tsx
import React from 'react';
import { Section } from '../shared/Section';
import { ResumeData } from '@/types/resume';

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, summary } = data;
  
  return (
    <div className="p-8 max-w-[8.5in] min-h-[11in] bg-white font-serif">
      {/* Header with name and contact info */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
        <div className="text-sm mt-1">
          {personalInfo.email} • {personalInfo.phone}
          {personalInfo.website && ` • ${personalInfo.website}`}
        </div>
        <div className="text-sm">
          {personalInfo.location}
        </div>
      </div>
      
      {/* Summary */}
      {summary && (
        <Section title="Professional Summary">
          <p>{summary}</p>
        </Section>
      )}
      
      {/* Experience */}
      <Section title="Work Experience">
        {experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <div className="font-bold">{exp.title}</div>
              <div className="text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
            </div>
            <div className="text-sm font-semibold">{exp.company}, {exp.location}</div>
            <p className="text-sm mt-1">{exp.description}</p>
          </div>
        ))}
      </Section>
      
      {/* Education */}
      <Section title="Education">
        {education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <div className="font-bold">{edu.degree}</div>
              <div className="text-sm">{edu.startDate} - {edu.endDate}</div>
            </div>
            <div className="text-sm font-semibold">{edu.institution}, {edu.location}</div>
            {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
          </div>
        ))}
      </Section>
      
      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-100 rounded px-2 py-1 text-sm mr-2 mb-2">
              {skill}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
```

### 4. Template Wrapper

Create a wrapper that selects the appropriate template based on templateId:

```tsx
// components/resume-templates/TemplateWrapper.tsx
import React from 'react';
import { ProfessionalTemplate } from './professional/ProfessionalTemplate';
import { ModernTemplate } from './modern/ModernTemplate';
import { CreativeTemplate } from './creative/CreativeTemplate';
import { MinimalTemplate } from './minimal/MinimalTemplate';
import { ResumeData } from '@/types/resume';

interface TemplateWrapperProps {
  templateId: string;
  data: ResumeData;
}

export const TemplateWrapper: React.FC<TemplateWrapperProps> = ({ templateId, data }) => {
  const getTemplate = () => {
    switch (templateId) {
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      default:
        return <ProfessionalTemplate data={data} />;
    }
  };

  return (
    <div className="resume-template-wrapper">
      {getTemplate()}
    </div>
  );
};
```

## Template Management System

Create an admin interface to manage templates:

### 1. Template Management API

```tsx
// app/api/admin/templates/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const templates = await prisma.resumeTemplate.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.thumbnail || !body.structure) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create template
    const template = await prisma.resumeTemplate.create({
      data: {
        name: body.name,
        description: body.description,
        thumbnail: body.thumbnail,
        isActive: body.isActive ?? true,
        isPremium: body.isPremium ?? false,
        category: body.category ?? "professional",
        structure: body.structure,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("Template creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Template Selection & Preview

Create components for users to select and preview templates:

### 1. Template Selection Component

```tsx
// components/resume-builder/TemplateSelection.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  category: string;
}

interface TemplateSelectionProps {
  onSelect: (templateId: string) => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/resumes/templates');
        if (!response.ok) throw new Error('Failed to fetch templates');
        
        const data = await response.json();
        setTemplates(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) {
        setError('Error loading templates. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);
  
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };
  
  const handleConfirm = () => {
    if (selectedId) onSelect(selectedId);
  };
  
  if (loading) {
    return <div className="p-8 text-center">Loading templates...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedId === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleSelect(template.id)}
          >
            <CardContent className="p-3">
              <div className="relative aspect-[8.5/11] mb-3">
                <Image 
                  src={template.thumbnail} 
                  alt={template.name}
                  fill
                  className="object-cover rounded"
                />
                {template.isPremium && (
                  <Badge variant="default" className="absolute top-2 right-2">
                    Premium
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleConfirm} disabled={!selectedId}>
          Continue with this template
        </Button>
      </div>
    </div>
  );
};
```

### 2. Template Preview Component

```tsx
// components/resume-builder/TemplatePreview.tsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TemplateWrapper } from '@/components/resume-templates/TemplateWrapper';
import { ResumeData } from '@/types/resume';

interface TemplatePreviewProps {
  templateId: string;
  resumeData: ResumeData;
  onEdit: () => void;
  onExport: () => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateId,
  resumeData,
  onEdit,
  onExport,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit}>
            Edit Content
          </Button>
          <Button onClick={onExport}>
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-gray-200">
        <div className="shadow-lg">
          <TemplateWrapper templateId={templateId} data={resumeData} />
        </div>
      </div>
    </div>
  );
};
```

## PDF Generation

Implement PDF generation for resumes:

### 1. Install Dependencies

```bash
npm install react-pdf @react-pdf/renderer html-to-image jspdf
npm install -D @types/jspdf
```

### 2. PDF Export Function

```tsx
// lib/pdf-export.ts
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export async function exportResumeToPdf(resumeElementId: string, filename: string): Promise<void> {
  try {
    const resumeElement = document.getElementById(resumeElementId);
    if (!resumeElement) {
      throw new Error('Resume element not found');
    }

    // Convert the resume element to a PNG image
    const dataUrl = await toPng(resumeElement, { quality: 1 });
    
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });
    
    // Get dimensions
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    // Add the image to the PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}
```

### 3. Export Button Component

```tsx
// components/resume-builder/ExportButton.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { exportResumeToPdf } from '@/lib/pdf-export';

interface ExportButtonProps {
  resumeElementId: string;
  filename: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ resumeElementId, filename }) => {
  const [exporting, setExporting] = useState(false);
  
  const handleExport = async () => {
    try {
      setExporting(true);
      await exportResumeToPdf(resumeElementId, filename);
    } catch (error) {
      console.error('Export failed:', error);
      // Show error notification to the user
    } finally {
      setExporting(false);
    }
  };
  
  return (
    <Button 
      onClick={handleExport} 
      disabled={exporting}
    >
      {exporting ? 'Exporting...' : 'Export as PDF'}
    </Button>
  );
};
```

## Implementation Steps

Follow these steps to implement resume templates:

### 1. Define Types

Create types for resume data:

```typescript
// types/resume.ts
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects?: {
    title: string;
    description: string;
    link?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  isPremium: boolean;
  category: string;
  structure: any;
}

export interface Resume {
  id: string;
  title: string;
  templateId: string;
  content: ResumeData;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 2. Seed Initial Templates

Create a seeder for initial templates:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.resumeTemplate.createMany({
    data: [
      {
        name: 'Professional',
        description: 'A clean, traditional resume format suitable for most industries',
        thumbnail: '/templates/thumbnails/professional.png',
        isActive: true,
        isPremium: false,
        category: 'professional',
        structure: {
          fontFamily: 'serif',
          primaryColor: '#333333',
          secondaryColor: '#555555',
          sections: ['summary', 'experience', 'education', 'skills'],
          layout: 'standard',
        },
      },
      {
        name: 'Modern',
        description: 'A contemporary design with clean lines and visual elements',
        thumbnail: '/templates/thumbnails/modern.png',
        isActive: true,
        isPremium: false,
        category: 'modern',
        structure: {
          fontFamily: 'sans-serif',
          primaryColor: '#2563eb',
          secondaryColor: '#1e3a8a',
          sections: ['summary', 'experience', 'skills', 'education'],
          layout: 'split',
        },
      },
      {
        name: 'Creative',
        description: 'A bold design for creative professionals',
        thumbnail: '/templates/thumbnails/creative.png',
        isActive: true,
        isPremium: true,
        category: 'creative',
        structure: {
          fontFamily: 'sans-serif',
          primaryColor: '#ec4899',
          secondaryColor: '#be185d',
          sections: ['summary', 'skills', 'experience', 'education', 'projects'],
          layout: 'creative',
        },
      },
      {
        name: 'Minimal',
        description: 'A simple, minimalist design focused on content',
        thumbnail: '/templates/thumbnails/minimal.png',
        isActive: true,
        isPremium: false,
        category: 'minimal',
        structure: {
          fontFamily: 'sans-serif',
          primaryColor: '#000000',
          secondaryColor: '#555555',
          sections: ['experience', 'education', 'skills'],
          layout: 'minimal',
        },
      },
    ]
  });

  console.log('Seeded initial resume templates');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 3. Build Resume Builder Page

```tsx
// app/dashboard/resumes/create/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateSelection } from '@/components/resume-builder/TemplateSelection';
import { ResumeEditor } from '@/components/resume-builder/ResumeEditor';
import { TemplatePreview } from '@/components/resume-builder/TemplatePreview';
import { ExportButton } from '@/components/resume-builder/ExportButton';
import { ResumeData } from '@/types/resume';

enum Step {
  SELECT_TEMPLATE,
  EDIT_CONTENT,
  PREVIEW,
}

export default function CreateResumePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(Step.SELECT_TEMPLATE);
  const [templateId, setTemplateId] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
  });
  const [resumeTitle, setResumeTitle] = useState('My Resume');

  const handleTemplateSelect = (id: string) => {
    setTemplateId(id);
    setStep(Step.EDIT_CONTENT);
  };

  const handleContentSave = (data: ResumeData) => {
    setResumeData(data);
    setStep(Step.PREVIEW);
  };

  const handleEdit = () => {
    setStep(Step.EDIT_CONTENT);
  };

  const handleSaveResume = async () => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resumeTitle,
          templateId,
          content: resumeData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      const data = await response.json();
      router.push(`/dashboard/resumes/${data.id}`);
    } catch (error) {
      console.error('Error saving resume:', error);
      // Show error notification
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Resume</h1>

      {step === Step.SELECT_TEMPLATE && (
        <TemplateSelection onSelect={handleTemplateSelect} />
      )}

      {step === Step.EDIT_CONTENT && (
        <ResumeEditor 
          initialData={resumeData}
          onSave={handleContentSave}
          title={resumeTitle}
          onTitleChange={setResumeTitle}
        />
      )}

      {step === Step.PREVIEW && (
        <div className="space-y-6">
          <TemplatePreview 
            templateId={templateId}
            resumeData={resumeData}
            onEdit={handleEdit}
            onExport={() => {}}
          />
          
          <div className="flex justify-end gap-4">
            <ExportButton 
              resumeElementId="resume-preview" 
              filename={resumeTitle}
            />
            <Button onClick={handleSaveResume}>
              Save Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 4. Add Thumbnail Images

Create template thumbnail images:

1. Design thumbnail images for each template
2. Save them as PNG files in `/public/templates/thumbnails/`
3. Make sure the images have an 8.5:11 aspect ratio to match resume dimensions

### 5. Testing & Refinement

1. Test each template with different content
2. Verify PDF export quality
3. Check responsive behavior
4. Test template switching

By following these steps, you'll have a complete resume template system with:
- Database storage
- Template selection interface
- Content editing
- PDF export
- Multiple design options 