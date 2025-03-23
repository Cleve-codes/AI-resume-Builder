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

    // In a real implementation, fetch the user's billing history from a payment provider
    // For now, return an empty array for free users, and mock data for paid users

    // For demo purposes, we'll return an empty array as the default profile is on the free plan
    return NextResponse.json([
      // Example format for when we have billing history:
      // {
      //   id: "in_1234567890",
      //   amount: 999, // in cents
      //   currency: "usd",
      //   status: "paid",
      //   description: "Pro Plan - Monthly Subscription",
      //   created: "2023-10-15T00:00:00Z",
      //   periodStart: "2023-10-15T00:00:00Z",
      //   periodEnd: "2023-11-15T00:00:00Z",
      //   invoiceUrl: "#",
      //   receiptUrl: "#"
      // }
    ])
  } catch (error) {
    console.error("Error fetching billing history:", error)
    return NextResponse.json({ error: "Failed to fetch billing history" }, { status: 500 })
  }
} 