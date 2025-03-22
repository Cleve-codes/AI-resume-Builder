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

// Summary schema validation
const SummarySchema = z.object({
  content: z.string().min(1, 'Summary content is required'),
});

// PUT /api/resumes/[id]/summary - Update summary
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    
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
    const validation = SummarySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const summary = await resumeService.upsertSummary(params.id, validation.data.content);
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Update summary error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while updating the summary' },
      { status: 500 }
    );
  }
} 