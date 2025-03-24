import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromRequest } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/templates/[id]
// Fetch a specific template by ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch template
    const template = await prisma.template.findUnique({
      where: { id }
    });
    
    // Check if template exists
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Get current user's premium status to determine if template is locked
    const user = getCurrentUserFromRequest(req);
    const userIsPremium = user?.isPremium || false;
    
    // If user is not premium and template is premium, mark as locked
    const processedTemplate = {
      ...template,
      isLocked: template.isPremium && !userIsPremium
    };
    
    return NextResponse.json(processedTemplate);
  } catch (error) {
    console.error(`Error fetching template with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PATCH /api/templates/[id]
// Update a specific template (admin only)
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user is authenticated
    const user = getCurrentUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is an admin
    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email
      },
      select: {
        isAdmin: true
      }
    });
    
    if (!userDetails?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }
    
    // Check if template exists
    const existingTemplate = await prisma.template.findUnique({
      where: { id }
    });
    
    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Parse update data from request body
    const updateData = await req.json();
    
    // Update template
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json(updatedTemplate);
  } catch (error) {
    console.error(`Error updating template with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id]
// Delete a specific template (admin only)
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user is authenticated
    const user = getCurrentUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if user is an admin
    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email
      },
      select: {
        isAdmin: true
      }
    });
    
    if (!userDetails?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }
    
    // Check if template exists
    const existingTemplate = await prisma.template.findUnique({
      where: { id }
    });
    
    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Check if template is in use by any resumes
    const templateInUse = await prisma.resume.findFirst({
      where: { templateId: id }
    });
    
    if (templateInUse) {
      return NextResponse.json(
        { error: 'Template is in use by one or more resumes and cannot be deleted' },
        { status: 400 }
      );
    }
    
    // Delete template
    await prisma.template.delete({
      where: { id }
    });
    
    return NextResponse.json(
      { message: 'Template deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting template with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
} 