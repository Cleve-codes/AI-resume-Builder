import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getCurrentUserFromRequest } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Verify user is authenticated
    const user = getCurrentUserFromRequest(req)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, fetch the user's billing information from a database or payment provider
    // For now, return mock data
    return NextResponse.json({
      plan: {
        id: "free",
        name: "Free Plan",
        price: 0,
        interval: "month",
        features: [
          { name: "3 Resume Slots", included: true },
          { name: "5 PDF Exports/month", included: true },
          { name: "Basic Templates", included: true },
          { name: "3 AI Analyses/month", included: true }
        ],
        limits: {
          resumeSlots: 3,
          monthlyExports: 5,
          monthlyAnalyses: 3
        }
      },
      availablePlans: [
        {
          id: "pro",
          name: "Pro Plan",
          price: 9.99,
          interval: "month",
          features: [
            { name: "Unlimited Resumes", included: true },
            { name: "Unlimited PDF Exports", included: true },
            { name: "Premium Templates", included: true },
            { name: "Unlimited AI Analyses", included: true },
            { name: "Priority Support", included: true },
            { name: "Version History", included: true }
          ]
        },
        {
          id: "enterprise",
          name: "Enterprise Plan",
          price: null,
          priceLabel: "Custom pricing",
          interval: "month",
          features: [
            { name: "Team Management", included: true },
            { name: "Custom Templates", included: true },
            { name: "Advanced Analytics", included: true },
            { name: "Dedicated Support", included: true },
            { name: "Custom Integrations", included: true }
          ]
        }
      ],
      paymentMethods: [],
      billingHistory: []
    })
  } catch (error) {
    console.error("Error fetching billing information:", error)
    return NextResponse.json({ error: "Failed to fetch billing information" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Verify user is authenticated
    const user = getCurrentUserFromRequest(req)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { planId } = await req.json()

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Validate the plan ID
    // 2. Check if payment info is needed
    // 3. Update the user's subscription in the payment provider
    // 4. Update the subscription in your database

    // For this mock implementation, we'll simulate a delay and return success
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Subscription updated successfully",
      plan: {
        id: planId,
        name: planId === "pro" ? "Pro Plan" : "Enterprise Plan",
        price: planId === "pro" ? 9.99 : null,
        priceLabel: planId === "pro" ? "$9.99/month" : "Custom pricing",
        interval: "month"
      }
    })
  } catch (error) {
    console.error("Error updating subscription:", error)
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
} 