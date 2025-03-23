import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// This is a simplified mock version of the profile API that doesn't
// require authentication, useful for testing when there are auth issues

export async function GET(req: NextRequest) {
  try {
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return mock user profile data
    const profile = {
      id: "user_123",
      name: "Test User",
      email: "test@example.com",
      jobTitle: "Software Developer",
      location: "San Francisco, CA",
      phone: "(555) 123-4567",
      websiteUrl: "example.com",
      linkedinUrl: "linkedin.com/in/testuser",
      githubUrl: "github.com/testuser",
      bio: "This is a mock biography for testing purposes.",
      profileImage: null,
      createdAt: "2023-01-15T00:00:00Z",
      statistics: {
        resumesCreated: 3,
        resumesExported: 8,
        analysesRun: 5,
        lastActive: new Date().toISOString(),
      },
      settings: {
        notifications: {
          emailUpdates: true,
          newTemplates: true,
          resumeTips: true,
          jobAlerts: false,
        },
        privacy: {
          publicProfile: false,
          shareAnalytics: true,
          allowAiImprovement: true,
        },
      },
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Error in mock profile API:", error)
    return NextResponse.json({ error: "Failed to get mock profile" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const data = await req.json()

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully (mock)",
      data,
    })
  } catch (error) {
    console.error("Error in mock profile API:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
} 