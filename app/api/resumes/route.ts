import { NextRequest, NextResponse } from 'next/server';
import { ResumeService } from '@/lib/services/resume-service';
import { z } from 'zod';
import { verify } from 'jsonwebtoken';
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth";

// Middleware to get the current user from the token
async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
    return decoded as { id: string; email: string };
  } catch (error) {
    return null;
  }
}

// GET /api/resumes - Get all resumes for the current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const resumeService = new ResumeService();
    const resumes = await resumeService.getUserResumes(user.id);
    
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while fetching resumes' },
      { status: 500 }
    );
  }
}

// Create resume schema validation
const CreateResumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  templateId: z.string().optional(),
  isPublic: z.boolean().optional(),
  status: z.enum(['draft', 'in-progress', 'complete']).default('draft'),
});

// Helper function to generate a slug from a title
function generateSlug(title: string): string {
  // Convert to lowercase, replace spaces with hyphens, remove special characters
  const baseSlug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .substring(0, 60); // Limit length
  
  // Add a timestamp to ensure uniqueness
  return `${baseSlug}-${Date.now()}`;
}

// POST /api/resumes - Create a new resume
export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUserFromRequest(request);
    
    if (!user?.id) {
      console.log('Authentication required for resume creation, but no user found in request');
      return NextResponse.json(
        { error: "Authentication required. Please log in to create a resume." },
        { status: 401 }
      );
    }
    
    // Get the request data
    const data = await request.json();
    console.log("Resume creation request data:", data);
    const { templateId, title } = data;
    
    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }
    
    console.log(`Looking for template with ID: ${templateId}`);
    
    // Check if the template exists
    const template = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
    });
    
    console.log("Template found:", template);
    
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }
    
    // Check if the user can use this template (premium templates)
    if (template.isPremium && !user.isPremium) {
      return NextResponse.json(
        { error: "Premium subscription required for this template" },
        { status: 403 }
      );
    }
    
    // Generate title and slug if needed
    const resumeTitle = title || `Resume (${new Date().toLocaleDateString()})`;
    const slug = generateSlug(resumeTitle);
    
    console.log(`Creating resume with title: ${resumeTitle}, slug: ${slug}`);
    
    // Define the data to create a resume
    const resumeData = {
      title: resumeTitle,
      slug: slug,
      userId: user.id,
      templateId: template.id,
      status: "draft" as const, // Type assertion to resolve type issues
    };
    
    console.log("Resume data:", resumeData);
    
    // Create a new resume with the template
    const resume = await prisma.resume.create({
      data: resumeData,
    });
    
    console.log("Resume created successfully:", resume.id);
    
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("Error creating resume:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}, message: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    }
    
    return NextResponse.json(
      { error: "Failed to create resume", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 