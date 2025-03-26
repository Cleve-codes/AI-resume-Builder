import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

// This route is ONLY for debugging purposes and should be disabled in production
export async function POST(request: NextRequest) {
  // Check for a secret key to prevent unauthorized access
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get('key');
  
  // Make sure to set DEBUG_API_KEY in your environment variables
  if (secretKey !== process.env.DEBUG_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Parse the request body
    const body = await request.json();
    
    // Required fields
    const { email, password } = body;
    const name = body.name || 'Test User';
    
    // Generate a mock verification token
    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Skip email existence check for debugging
    // Hash the password
    const hashedPassword = await hash(password, 10);
    
    // Create user with special debug flag
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified: true, // Auto-verify for debugging
        verificationToken,
        verificationTokenExpiry,
        profile: {
          create: {
            isDebugAccount: true
          }
        }
      },
    });
    
    // Remove sensitive data
    const { password: _, ...userData } = user;
    
    // Return success response
    return NextResponse.json({
      status: 'success',
      message: 'Debug user created successfully',
      user: userData,
      debugInfo: {
        createdAt: new Date().toISOString(),
        verificationToken: process.env.NODE_ENV === 'development' ? verificationToken : '[redacted in production]'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Debug registration error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Debug registration failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    }, { status: 500 });
  }
} 