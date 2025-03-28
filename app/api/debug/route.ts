import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const connectionTest = await prisma.$queryRaw`SELECT 1 as result`;
    
    return NextResponse.json({
      status: 'Database connection successful',
      result: connectionTest,
      environment: process.env.NODE_ENV,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set',
        DEBUG_API_KEY: process.env.DEBUG_API_KEY ? 'Set' : 'Not set',
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      status: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      environment: process.env.NODE_ENV,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set',
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set',
        DEBUG_API_KEY: process.env.DEBUG_API_KEY ? 'Set' : 'Not set',
      }
    }, { status: 500 });
  }
} 