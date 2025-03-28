import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { getServerSideUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ClientResumeEditor from '../components/ClientResumeEditor';
import DashboardHeader from '@/components/dashboard-header';
import DashboardSidebar from '@/components/dashboard-sidebar';
import { z } from 'zod';

// Define the template structure schema
const templateStructureSchema = z.object({
  fontFamily: z.string().default('Arial'),
  primaryColor: z.string().default('#000000'),
  secondaryColor: z.string().default('#ffffff'),
  sections: z.array(z.string()).default(['summary', 'experience', 'education', 'skills']),
  layout: z.enum(['split', 'standard', 'creative', 'minimal']).default('standard'),
});

// Validate and transform the template structure
function validateTemplateStructure(data: unknown) {
  try {
    return templateStructureSchema.parse(data);
  } catch (error) {
    // Return default structure if validation fails
    return templateStructureSchema.parse({});
  }
}

export const metadata: Metadata = {
  title: 'Edit Resume',
  description: 'Edit your resume content and formatting.',
};

interface ResumeEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeEditPage(props: ResumeEditPageProps) {
  const params = await props.params;
  const user = await getServerSideUser();

  if (!user) {
    redirect('/login?callbackUrl=/dashboard/resume');
  }

  const userId = user.id;

  try {
    // Fetch the resume from the database
    const resume = await prisma.resume.findUnique({
      where: {
        id: params.id,
        userId,
      },
      include: {
        template: true,
        contactInfo: true,
        summary: true,
        experiences: true,
        educations: true,
        skills: true,
        projects: true,
        certifications: true,
        languages: true,
        customSections: true,
      },
    });
    
    if (!resume) {
      notFound();
    }
    
    if (!resume.template) {
      throw new Error('Template not found for this resume');
    }
    
    // Transform the template to match the expected structure
    const transformedTemplate = {
      id: resume.template.id,
      name: resume.template.name,
      description: resume.template.description,
      thumbnail: resume.template.thumbnail,
      isActive: resume.template.isActive,
      isPremium: resume.template.isPremium,
      category: resume.template.category,
      structure: validateTemplateStructure(resume.template.structure),
      createdAt: resume.template.createdAt,
      updatedAt: resume.template.updatedAt
    };
    
    // Ensure templateId is always available as a string
    const resumeWithRequiredFields = {
      ...resume,
      templateId: resume.templateId || resume.template.id, // Fallback to template.id if templateId is null
      template: undefined // Remove the template property to avoid type conflicts
    };
    
    return (
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        {/* <DashboardSidebar /> */}
        <div className="flex flex-col">
          {/* <DashboardHeader /> */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Resume: {resume.title}</h1>
            <ClientResumeEditor 
              resumeData={resumeWithRequiredFields}
              template={transformedTemplate}
              isLoading={false}
              error={null}
            />
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading resume for editing:', error);
    return (
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        {/* <DashboardSidebar /> */}
        <div className="flex flex-col">
          {/* <DashboardHeader /> */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <h1 className="text-2xl font-bold mb-6">Error</h1>
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <p className="text-red-800">
                There was an error loading this resume. Please try again later.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
