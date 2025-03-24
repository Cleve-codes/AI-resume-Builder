import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url)
    const query = url.searchParams.get("query") || ""
    const matchScore = Number.parseInt(url.searchParams.get("matchScore") || "0")
    const jobType = url.searchParams.get("jobType") || "all"
    const sortBy = url.searchParams.get("sortBy") || "match"

    // In a real implementation, you would query a database or external API
    // based on the parameters and the user's resume data

    // Mock job data
    const jobs = [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        type: "full-time",
        salary: "$120,000 - $150,000",
        posted: "2 days ago",
        description:
          "We are seeking a Senior Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications using React, Node.js, and AWS.",
        requirements: [
          "5+ years of experience in software development",
          "Strong proficiency in JavaScript, TypeScript, React, and Node.js",
          "Experience with AWS services",
          "Bachelor's degree in Computer Science or related field",
        ],
        matchScore: 92,
        skills: {
          matching: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
          missing: ["Docker", "Kubernetes"],
        },
        saved: false,
        applied: false,
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "Digital Solutions",
        location: "Remote",
        type: "full-time",
        salary: "$100,000 - $130,000",
        posted: "1 week ago",
        description:
          "Join our team as a Full Stack Developer to build and maintain web applications. You will work with both frontend and backend technologies to deliver high-quality software solutions.",
        requirements: [
          "3+ years of experience in full stack development",
          "Proficiency in JavaScript, React, and Node.js",
          "Experience with MongoDB or other NoSQL databases",
          "Good understanding of RESTful APIs",
        ],
        matchScore: 85,
        skills: {
          matching: ["JavaScript", "React", "Node.js", "MongoDB"],
          missing: ["TypeScript", "GraphQL"],
        },
        saved: true,
        applied: false,
      },
      // More job listings...
    ]

    // Filter jobs based on query parameters
    let filteredJobs = [...jobs]

    if (query) {
      const searchQuery = query.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery) ||
          job.company.toLowerCase().includes(searchQuery) ||
          job.location.toLowerCase().includes(searchQuery),
      )
    }

    if (matchScore > 0) {
      filteredJobs = filteredJobs.filter((job) => job.matchScore >= matchScore)
    }

    if (jobType !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.type === jobType)
    }

    // Sort jobs
    filteredJobs.sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore
        case "recent":
          // This is a simplification - in a real app, you'd parse the dates
          return a.posted.includes("day") ? -1 : 1
        case "salary":
          // This is a simplification - in a real app, you'd parse the salary ranges
          const aMin = Number.parseInt(a.salary.split(" - ")[0].replace(/\D/g, ""))
          const bMin = Number.parseInt(b.salary.split(" - ")[0].replace(/\D/g, ""))
          return bMin - aMin
        default:
          return 0
      }
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return Response.json({
      success: true,
      data: filteredJobs,
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return Response.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

