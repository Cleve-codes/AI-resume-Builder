import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';

// Registration schema validation
const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  console.log('Registration request received');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Request body parsed successfully');
    
    // Validate the request body
    const validation = RegisterSchema.safeParse(body);
    
    if (!validation.success) {
      console.error('Validation error:', validation.error.format());
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validation.data;
    
    // Check if user already exists - direct Prisma call to isolate potential issues
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password directly
    const hashedPassword = await hash(password, 10);
    
    // Create new user directly with Prisma
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    
    // Return the user without the password
    const { password: _, ...userWithoutPassword } = user;
    
    console.log('User created successfully');
    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    // Detailed error response
    return NextResponse.json(
      { 
        error: 'An error occurred during registration',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined 
      },
      { status: 500 }
    );
  }
} 