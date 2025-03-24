export interface Resume {
  id: number
  title: string
  lastUpdated: string
  score: number
  status: "draft" | "complete" | "needs_review"
  template: string
}
