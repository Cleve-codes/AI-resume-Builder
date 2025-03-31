import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function GET(request: NextRequest) {
  try {
    // Get the current authenticated user
    const { userId } = auth();
    
    // If no user is authenticated, return false
    if (!userId) {
      return NextResponse.json({ isAdmin: false });
    }
    
    // For now, this is a placeholder. In a real application, you would:
    // 1. Check a database to see if this user has admin privileges
    // 2. Check the user's role/permissions in your auth system
    // 3. Or check some other criteria
    
    // Example: Check if the user has a specific email domain
    // const user = await clerkClient.users.getUser(userId);
    // const isAdmin = user.emailAddresses.some(email => 
    //   email.emailAddress.endsWith('@youradmindomain.com')
    // );
    
    // For demo purposes, return false for all users
    // You can modify this logic based on your requirements
    const isAdmin = false;
    
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false, error: 'Failed to check admin status' }, { status: 500 });
  }
} 