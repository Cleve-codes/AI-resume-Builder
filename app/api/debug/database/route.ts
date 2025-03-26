import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This route is ONLY for debugging purposes and should be disabled in production
export async function GET(request: NextRequest) {
  // Check for a secret key to prevent unauthorized access
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get('key');
  
  // Make sure to set DEBUG_API_KEY in your environment variables
  if (secretKey !== process.env.DEBUG_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Test database connection by trying a simple query
    const currentTime = await prisma.$queryRaw`SELECT NOW()`;
    
    // Check if we can access the User table
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      status: 'success',
      database: {
        connected: true,
        timestamp: currentTime,
        userCount
      },
      env: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set (redacted)' : 'Not set',
        emailServerHost: process.env.EMAIL_SERVER_HOST ? 'Set (redacted)' : 'Not set',
        emailServerPort: process.env.EMAIL_SERVER_PORT ? 'Set (redacted)' : 'Not set',
        nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL
      }
    });
  } catch (error) {
    console.error('Database debug error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    }, { status: 500 });
  }
} 