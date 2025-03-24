import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Verification schema
const VerificationSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = VerificationSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Invalid input', 
        details: validation.error.format() 
      }, { status: 400 });
    }
    
    const { token } = validation.data;
    
    // Find user with this verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });
    
    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid verification token' 
      }, { status: 400 });
    }
    
    // Check if token is expired
    if (user.verificationTokenExpiry && user.verificationTokenExpiry < new Date()) {
      return NextResponse.json({ 
        error: 'Verification token has expired',
        expired: true
      }, { status: 400 });
    }
    
    // Update user to mark email as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Email verified successfully' 
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ 
      error: 'An error occurred during email verification',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 