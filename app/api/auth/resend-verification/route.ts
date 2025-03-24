import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email/email-service';

// Resend verification schema
const ResendVerificationSchema = z.object({
  email: z.string().email('Valid email is required'),
});

// Generate a verification token
function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = ResendVerificationSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Invalid input', 
        details: validation.error.format() 
      }, { status: 400 });
    }
    
    const { email } = validation.data;
    
    // Find user with this email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // Don't reveal if a user exists or not for security
      return NextResponse.json({ 
        success: true,
        message: 'If your email is registered, a verification email has been sent.' 
      });
    }
    
    // If already verified, no need to resend
    if (user.emailVerified) {
      return NextResponse.json({ 
        success: true,
        alreadyVerified: true,
        message: 'Email is already verified' 
      });
    }
    
    // Generate new verification token and set expiry (24 hours from now)
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Update user with new verification token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry,
      },
    });
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    
    return NextResponse.json({ 
      success: true,
      message: 'Verification email has been sent' 
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ 
      error: 'An error occurred while resending verification email',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 