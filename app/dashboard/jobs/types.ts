export interface Job {
  id: number
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "contract" | "remote"
  salary: string
  posted: string
  description: string
  requirements: string[]
  matchScore: number
  skills: {
    matching: string[]
    missing: string[]
  }
  saved: boolean
  applied: boolean
} 