import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { z } from 'zod';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Login schema validation
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  console.log('[API] Login request received');
  
  try {
    const body = await request.json();
    console.log('[API] Login request body parsed');
    
    // Validate the request body
    const validation = LoginSchema.safeParse(body);
    
    if (!validation.success) {
      console.log('[API] Login validation failed:', validation.error.format());
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const loginData = validation.data;
    const userService = new UserService();
    
    // Authenticate the user
    try {
      console.log('[API] Attempting to authenticate user:', loginData.email);
      const user = await userService.authenticateUser(loginData);
      console.log('[API] User authenticated successfully');
      
      // Create a JWT token
      const token = sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.NEXTAUTH_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      console.log('[API] JWT token created');
      
      // Create response first
      const { password, ...userWithoutPassword } = user;
      const response = NextResponse.json(
        { message: 'Login successful', user: userWithoutPassword },
        { status: 200 }
      );
      
      // Set the cookie in the response
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      
      console.log('[API] Cookie set in response, returning to client');
      return response;
    } catch (error) {
      console.log('[API] Authentication failed:', error);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('[API] Login error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 