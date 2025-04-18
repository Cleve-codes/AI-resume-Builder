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

// GET /api/resumes/[id] - Get a specific resume
export async function GET(request: Request, props: { params: Promise<{ id: string }> }): Promise<NextResponse> {
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
    
    return NextResponse.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while fetching the resume' },
      { status: 500 }
    );
  }
}

// Update resume schema validation (updated for new schema)
const UpdateResumeSchema = z.object({
  title: z.string().optional(),
  templateId: z.string().optional(),
  isPublic: z.boolean().optional(),
  atsScore: z.number().min(0).max(100).optional(),
});

// PUT /api/resumes/[id] - Update a resume
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
    const validation = UpdateResumeSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const updatedResume = await resumeService.updateResume(params.id, validation.data);
    
    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Update resume error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while updating the resume' },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] - Delete a resume
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }): Promise<NextResponse> {
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
    
    await resumeService.deleteResume(params.id);
    
    return NextResponse.json(
      { message: 'Resume deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete resume error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while deleting the resume' },
      { status: 500 }
    );
  }
} 