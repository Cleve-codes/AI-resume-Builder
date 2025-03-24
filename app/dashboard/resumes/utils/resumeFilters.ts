interface Resume {
  id: number
  title: string
  lastUpdated: string
  score: number
  status: "draft" | "complete" | "needs_review"
  template: string
}

export function filterAndSortResumes(
  resumes: Resume[],
  searchQuery: string,
  filterStatus: string,
  sortBy: string
): Resume[] {
  return resumes
    .filter((resume) => {
      // Filter by search query
      if (searchQuery && !resume.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Filter by status
      if (filterStatus !== "all" && resume.status !== filterStatus) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected option
      switch (sortBy) {
        case "last_updated":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case "title_asc":
          return a.title.localeCompare(b.title)
        case "title_desc":
          return b.title.localeCompare(a.title)
        case "score_high":
          return b.score - a.score
        case "score_low":
          return a.score - b.score
        default:
          return 0
      }
    })
}
