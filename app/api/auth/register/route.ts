import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendVerificationEmail } from '@/lib/email/email-service';

// Registration schema validation
const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

// Generate a verification token
function generateVerificationToken(): string {
  return randomBytes(32).toString('hex');
}

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
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
      console.log('Checked for existing user:', existingUser ? 'Found' : 'Not found');
    } catch (dbError) {
      console.error('Database error checking for existing user:', dbError);
      return NextResponse.json(
        { 
          error: 'Database error while checking for existing user',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password directly
    let hashedPassword;
    try {
      hashedPassword = await hash(password, 10);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return NextResponse.json(
        { 
          error: 'Failed to secure password',
          details: hashError instanceof Error ? hashError.message : 'Unknown hashing error'
        },
        { status: 500 }
      );
    }
    
    // Generate verification token and set expiry (24 hours from now)
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Create new user directly with Prisma
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          emailVerified: false,
          verificationToken,
          verificationTokenExpiry,
        },
      });
      console.log('User created successfully with ID:', user.id);
    } catch (createError) {
      console.error('Error creating user in database:', createError);
      return NextResponse.json(
        { 
          error: 'Failed to create user in database',
          details: createError instanceof Error ? createError.message : 'Unknown database error',
          stack: createError instanceof Error ? createError.stack : undefined
        },
        { status: 500 }
      );
    }
    
    // Return the user without the password and sensitive verification data
    const { password: _, verificationToken: __, verificationTokenExpiry: ___, ...userWithoutSensitiveData } = user;
    
    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
      console.log('Verification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // We still create the user, but log the email failure
    }
    
    console.log('User created successfully');
    return NextResponse.json(
      { message: 'User created successfully. Please verify your email.', user: userWithoutSensitiveData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    // Detailed error response
    return NextResponse.json(
      { 
        error: 'An error occurred during registration',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        time: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 