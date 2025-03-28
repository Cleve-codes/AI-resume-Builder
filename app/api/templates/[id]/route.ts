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
export async function GET(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    // Access id directly from params to avoid destructuring warning
    const id = params.params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    // Get the current user (optional)
    const user = await getCurrentUserFromRequest(request);
    const userIsPremium = user?.isPremium || false;

    // Fetch the template
    const template = await prisma.template.findUnique({
      where: {
        id: id,
      },
    });

    // If template doesn't exist, return 404
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // If template is premium and user is not premium, mark it as locked
    if (template.isPremium && !userIsPremium) {
      return NextResponse.json(
        {
          ...template,
          isLocked: true,
        },
        { status: 200 }
      );
    }

    // Return the template
    return NextResponse.json(template, { status: 200 });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PATCH /api/templates/[id]
// Update a specific template (admin only)
export async function PATCH(req: NextRequest, params: RouteParams) {
  try {
    // Access id directly from params to avoid destructuring warning
    const id = params.params.id;
    
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
    console.error(`Error updating template with ID ${params.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id]
// Delete a specific template (admin only)
export async function DELETE(req: NextRequest, params: RouteParams) {
  try {
    // Access id directly from params to avoid destructuring warning
    const id = params.params.id;
    
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
    console.error(`Error deleting template with ID ${params.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
} 