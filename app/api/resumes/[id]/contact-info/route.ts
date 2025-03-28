import { NextRequest, NextResponse } from 'next/server';
import { ResumeService } from '@/lib/services/resume-service';
import { z } from 'zod';
import { verify } from 'jsonwebtoken';

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

// Contact info schema validation
const ContactInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().nullable(),
  websiteUrl: z.string().url('Invalid website URL').optional().nullable(),
  githubUrl: z.string().url('Invalid GitHub URL').optional().nullable(),
  otherUrls: z.any().optional().nullable(),
});

// PUT /api/resumes/[id]/contact-info - Update contact info
export async function PUT(request: Request, props: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  const params = await props.params;
  try {
    const user = await getCurrentUser(request as unknown as NextRequest);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const resumeService = new ResumeService();
    const resume = await resumeService.getResumeById(params.id);
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }
    
    // Ensure that the user owns the resume
    if (resume.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    
    // Validate the request body
    const validation = ContactInfoSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const contactInfo = await resumeService.upsertContactInfo(
      params.id, 
      {
        fullName: validation.data.fullName,
        email: validation.data.email,
        phone: validation.data.phone === undefined ? null : validation.data.phone,
        location: validation.data.location === undefined ? null : validation.data.location,
        linkedinUrl: validation.data.linkedinUrl === undefined ? null : validation.data.linkedinUrl,
        websiteUrl: validation.data.websiteUrl === undefined ? null : validation.data.websiteUrl,
        githubUrl: validation.data.githubUrl === undefined ? null : validation.data.githubUrl,
        otherUrls: validation.data.otherUrls === undefined ? null : validation.data.otherUrls,
      }
    );
    
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Update contact info error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while updating contact info' },
      { status: 500 }
    );
  }
}