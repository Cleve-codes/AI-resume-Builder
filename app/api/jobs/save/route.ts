import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { jobId, saved } = await req.json()

    if (typeof jobId !== "number") {
      return Response.json({ error: "Job ID is required" }, { status: 400 })
    }

    // In a real implementation, you would update the database
    // to save or unsave the job for the current user

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return Response.json({
      success: true,
      message: saved ? "Job saved successfully" : "Job removed from saved jobs",
      jobId,
      saved,
    })
  } catch (error) {
    console.error("Error saving job:", error)
    return Response.json({ error: "Failed to save job" }, { status: 500 })
  }
}

