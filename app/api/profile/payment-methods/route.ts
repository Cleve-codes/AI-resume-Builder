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

    // In a real implementation, fetch the user's payment methods from a payment provider
    // For now, return an empty array
    return NextResponse.json([])
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Verify user is authenticated
    const user = getCurrentUserFromRequest(req)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cardNumber, cardholderName, expiryMonth, expiryYear, cvc } = await req.json()

    // Validate input
    if (!cardNumber || !cardholderName || !expiryMonth || !expiryYear || !cvc) {
      return NextResponse.json({ error: "All card details are required" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Send the card details to a payment provider like Stripe
    // 2. Store the payment method token in your database
    // 3. Return the saved payment method

    // For this mock implementation, we'll simulate a delay and return a mock payment method
    await new Promise(resolve => setTimeout(resolve, 500))

    // Create a masked version of the card number for display
    const last4 = cardNumber.slice(-4)
    const maskedNumber = `•••• •••• •••• ${last4}`

    return NextResponse.json({
      id: `pm_${Date.now()}`,
      type: "card",
      card: {
        brand: "visa", // This would be determined by the payment provider
        last4,
        expiryMonth,
        expiryYear
      },
      billingDetails: {
        name: cardholderName
      },
      created: new Date().toISOString(),
      isDefault: true
    })
  } catch (error) {
    console.error("Error adding payment method:", error)
    return NextResponse.json({ error: "Failed to add payment method" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Verify user is authenticated
    const user = getCurrentUserFromRequest(req)
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const paymentMethodId = searchParams.get('id')

    if (!paymentMethodId) {
      return NextResponse.json({ error: "Payment method ID is required" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Verify the payment method belongs to the user
    // 2. Remove it from the payment provider
    // 3. Remove it from your database

    // For this mock implementation, we'll simulate a delay and return success
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Payment method removed successfully"
    })
  } catch (error) {
    console.error("Error removing payment method:", error)
    return NextResponse.json({ error: "Failed to remove payment method" }, { status: 500 })
  }
} 