import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { resume, jobDescription } = await req.json()

    if (!resume || !jobDescription) {
      return Response.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    // Use the AI SDK to analyze the resume against the job description
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze this resume against the following job description:
        
        Resume:
        ${JSON.stringify(resume)}
        
        Job Description:
        ${jobDescription}
        
        Provide a detailed analysis in JSON format with the following structure:
        {
          "score": number, // Overall match score (0-100)
          "keywordMatch": number, // Keyword match percentage (0-100)
          "missingKeywords": string[], // Keywords from the job description missing in the resume
          "suggestions": string[], // Suggestions for improving the resume
          "strengths": string[], // Strengths of the resume
          "improvements": string[] // Areas that need improvement
        }
      `,
      system:
        "You are an expert resume analyzer. Provide detailed feedback on how to improve the resume for the given job description.",
    })

    // Parse the response and return it
    const analysis = JSON.parse(text)
    return Response.json(analysis)
  } catch (error) {
    console.error("Error analyzing resume:", error)
    return Response.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}

