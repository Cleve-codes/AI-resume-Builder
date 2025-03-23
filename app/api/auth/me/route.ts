import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  console.log('[API] Checking authentication status');
  
  try {
    // Get the token from the request cookies
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      console.log('[API] No auth token found in cookies');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify the token
    console.log('[API] Verifying token');
    let decoded;
    try {
      decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
    } catch (error) {
      console.error('[API] Token verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Get the user from the database
    if (typeof decoded !== 'object' || !decoded.id) {
      console.error('[API] Invalid token payload');
      return NextResponse.json(
        { error: 'Invalid token payload' },
        { status: 401 }
      );
    }
    
    console.log('[API] Fetching user data for ID:', decoded.id);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        jobTitle: true,
      },
    });
    
    if (!user) {
      console.error('[API] User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    console.log('[API] User authenticated successfully:', user.email);
    return NextResponse.json({ user });
    
  } catch (error) {
    console.error('[API] Authentication check error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred during authentication check' },
      { status: 500 }
    );
  }
} 