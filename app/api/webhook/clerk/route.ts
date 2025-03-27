import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the headers
  const headersList = await headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no Svix headers, return 400
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Get webhook secret from env variable
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return new Response('Webhook secret is not set', {
      status: 500,
    });
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret);
  
  let evt: WebhookEvent;
  
  try {
    // Verify the payload with the headers
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', {
      status: 400,
    });
  }

  // Log the event type
  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);
  
  // Process different event types
  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      case 'session.created':
        console.log('Session created for user:', evt.data.user_id);
        break;
      case 'session.ended':
        console.log('Session ended for user:', evt.data.user_id);
        break;
    }
  } catch (error) {
    console.error(`Error processing webhook ${eventType}:`, error);
    // Continue execution - don't fail the webhook response
  }
  
  // Return a 200 response
  return NextResponse.json({ success: true });
}

// Handler for when a user is created in Clerk
async function handleUserCreated(data: any) {
  const { id, email_addresses, username, first_name, last_name, image_url } = data;
  
  // Get the primary email
  const primaryEmail = email_addresses.find((email: any) => email.id === data.primary_email_address_id)?.email_address;
  
  if (!primaryEmail) {
    console.error('No primary email found for user:', id);
    return;
  }
  
  try {
    // Check if a user with this email already exists in our database
    const existingUser = await prisma.user.findFirst({
      where: { 
        email: primaryEmail 
      },
    });
    
    if (existingUser) {
      // Update the existing user with the Clerk ID
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { 
          clerkId: id,
          emailVerified: true, // Set email as verified since Clerk verifies emails
          name: [first_name, last_name].filter(Boolean).join(' ') || existingUser.name,
          profileImage: image_url || existingUser.profileImage
        },
      });
      
      console.log('Updated existing user with Clerk ID:', existingUser.id);
    } else {
      // Create a new user in our database
      await prisma.user.create({
        data: {
          clerkId: id,
          email: primaryEmail,
          name: [first_name, last_name].filter(Boolean).join(' '),
          emailVerified: true, // Clerk verifies emails
          profileImage: image_url,
        },
      });
      
      console.log('Created new user from Clerk:', id);
    }
  } catch (error) {
    console.error('Error syncing user with database:', error);
    throw error;
  }
}

// Handler for when a user is updated in Clerk
async function handleUserUpdated(data: any) {
  const { id, email_addresses, username, first_name, last_name, image_url } = data;
  
  // Get the primary email
  const primaryEmail = email_addresses.find((email: any) => email.id === data.primary_email_address_id)?.email_address;
  
  if (!primaryEmail) {
    console.error('No primary email found for user:', id);
    return;
  }
  
  try {
    // Look up the user by Clerk ID
    const existingUser = await prisma.user.findFirst({
      where: { clerkId: id },
    });
    
    if (existingUser) {
      // Update the existing user
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { 
          email: primaryEmail, // Update email in case it changed
          name: [first_name, last_name].filter(Boolean).join(' ') || existingUser.name,
          profileImage: image_url || existingUser.profileImage
        },
      });
      
      console.log('Updated user from Clerk data:', existingUser.id);
    } else {
      // Try to find by email instead
      const userByEmail = await prisma.user.findFirst({
        where: { email: primaryEmail },
      });
      
      if (userByEmail) {
        // Update the user with the Clerk ID
        await prisma.user.update({
          where: { id: userByEmail.id },
          data: { 
            clerkId: id,
            name: [first_name, last_name].filter(Boolean).join(' ') || userByEmail.name,
            profileImage: image_url || userByEmail.profileImage,
            emailVerified: true
          },
        });
        
        console.log('Linked existing user with Clerk ID:', userByEmail.id);
      } else {
        // Create a new user if no matching user found
        await prisma.user.create({
          data: {
            clerkId: id,
            email: primaryEmail,
            name: [first_name, last_name].filter(Boolean).join(' '),
            emailVerified: true,
            profileImage: image_url,
          },
        });
        
        console.log('Created new user from Clerk update event:', id);
      }
    }
  } catch (error) {
    console.error('Error updating user from Clerk data:', error);
    throw error;
  }
}

// Handler for when a user is deleted in Clerk
async function handleUserDeleted(data: any) {
  const { id } = data;
  
  try {
    // Find the user by Clerk ID
    const user = await prisma.user.findFirst({
      where: { clerkId: id },
    });
    
    if (user) {
      // Option 1: Delete the user (uncomment if you want this behavior)
      // await prisma.user.delete({
      //   where: { id: user.id },
      // });
      // console.log('Deleted user after Clerk deletion:', user.id);
      
      // Option 2: Update the user record to mark as deleted/inactive
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          clerkId: null, // Remove the Clerk ID
          active: false  // Assuming you have an 'active' field
        },
      });
      
      console.log('Marked user as inactive after Clerk deletion:', user.id);
    } else {
      console.log('No matching user found for deleted Clerk user:', id);
    }
  } catch (error) {
    console.error('Error handling user deletion:', error);
    throw error;
  }
} 