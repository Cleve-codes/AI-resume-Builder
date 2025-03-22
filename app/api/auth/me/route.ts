import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { UserService } from '@/lib/services/user-service';

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    try {
      // Verify and decode the token
      const decoded = verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret');
      const { id } = decoded as { id: string; email: string };
      
      try {
        // Get the user from the database
        const userService = new UserService();
        const user = await userService.findUserById(id);
        
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
          );
        }
        
        // Return the user without the password
        const { password, ...userWithoutPassword } = user;
        
        return NextResponse.json({ user: userWithoutPassword });
      } catch (dbError) {
        console.error('Database error:', dbError);
        return NextResponse.json(
          { error: 'Database error', details: dbError instanceof Error ? dbError.message : 'Unknown database error' },
          { status: 500 }
        );
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json(
        { error: 'Invalid token', details: jwtError instanceof Error ? jwtError.message : 'Token verification failed' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Get user error:', error);
    
    return NextResponse.json(
      { 
        error: 'An error occurred while fetching the user',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 