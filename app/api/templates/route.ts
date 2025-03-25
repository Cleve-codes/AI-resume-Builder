import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // First get the current user (optional)
    const user = await getCurrentUserFromRequest(request);
    
    // Fetch all active templates
    const templates = await prisma.template.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    // Return the templates
    return NextResponse.json(templates, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
} 