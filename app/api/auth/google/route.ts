import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';

// Google OAuth handler
export async function POST(request: NextRequest) {
  console.log('[API] Google OAuth login request received');
  
  try {
    const body = await request.json();
    console.log('[API] Google OAuth request body parsed');
    
    // Extract Google profile data
    const { 
      email, 
      name, 
      picture: profileImage,
      sub: googleId
    } = body;
    
    if (!email || !googleId) {
      return NextResponse.json(
        { error: 'Invalid Google profile data' },
        { status: 400 }
      );
    }
    
    // Check if user exists with this email
    let user = await prisma.user.findUnique({
      where: { email }
    });
    
    // Create Account model if it doesn't exist yet
    try {
      await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        providerAccountId TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE(provider, providerAccountId),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );`;
    } catch (err) {
      console.error('Error creating accounts table:', err);
      // Continue execution even if table already exists
    }
    
    const userService = new UserService();
    
    // If user doesn't exist, create a new one
    if (!user) {
      console.log('[API] Creating new user from Google OAuth:', email);
      
      // Generate a random password (user won't need this)
      const randomPassword = crypto.randomBytes(32).toString('hex');
      
      try {
        // Create user with Google profile data
        user = await userService.createUser({
          email,
          password: randomPassword, // This won't be used for login
          name,
          emailVerified: true, // Google accounts are already verified
        }) as any; // Type assertion to avoid TypeScript errors
        
        // Create account record for Google
        if (user) {
          await prisma.$executeRaw`INSERT INTO accounts (id, userId, type, provider, providerAccountId)
            VALUES (${crypto.randomUUID()}, ${user.id}, 'oauth', 'google', ${googleId})
            ON CONFLICT (provider, providerAccountId) DO NOTHING;`;
        }
        
        // Update profile image if available
        if (profileImage && user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { profileImage }
          });
        }
      } catch (err) {
        console.error('[API] Error creating user from Google OAuth:', err);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }
    } else {
      console.log('[API] User exists, checking Google account link:', email);
      
      // Check if this Google account is already linked using raw SQL
      const existingAccounts = await prisma.$queryRaw`
        SELECT * FROM accounts 
        WHERE provider = 'google' AND providerAccountId = ${googleId}
      `;
      
      // If not linked, link the Google account
      if (Array.isArray(existingAccounts) && existingAccounts.length === 0 && user) {
        await prisma.$executeRaw`INSERT INTO accounts (id, userId, type, provider, providerAccountId)
          VALUES (${crypto.randomUUID()}, ${user.id}, 'oauth', 'google', ${googleId})
          ON CONFLICT (provider, providerAccountId) DO NOTHING;`;
      }
      
      // Update profile image if it changed
      if (user && profileImage && user.profileImage !== profileImage) {
        await prisma.user.update({
          where: { id: user.id },
          data: { profileImage }
        });
      }
      
      // Ensure email is verified for Google accounts
      if (user && !user.emailVerified) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: true }
        });
        user.emailVerified = true;
      }
    }
    
    // Make sure we have a user before proceeding
    if (!user) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Google' },
        { status: 500 }
      );
    }

    // Create a JWT token
    const token = sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    // Set the token as a cookie
    const cookieStore = cookies();
    (cookieStore as any).set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    // Return user data (excluding sensitive fields)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      jobTitle: user.jobTitle,
      emailVerified: user.emailVerified,
    };
    
    return NextResponse.json({ user: userData });
  } catch (err) {
    console.error('[API] Google OAuth error:', err);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
