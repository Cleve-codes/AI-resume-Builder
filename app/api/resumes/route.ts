import { NextRequest, NextResponse } from 'next/server';
import { ResumeService } from '@/lib/services/resume-service';
import { z } from 'zod';
import { verify } from 'jsonwebtoken';

// Middleware to get the current user from the token
async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  
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

// Create resume schema validation (updated for new schema)
const CreateResumeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  templateId: z.string().optional(),
  isPublic: z.boolean().optional(),
});

// POST /api/resumes - Create a new resume
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate the request body
    const validation = CreateResumeSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const resumeData = {
      ...validation.data,
      userId: user.id,
    };
    
    const resumeService = new ResumeService();
    const resume = await resumeService.createResume(resumeData);
    
    return NextResponse.json(
      { message: 'Resume created successfully', resume },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create resume error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while creating the resume' },
      { status: 500 }
    );
  }
} 