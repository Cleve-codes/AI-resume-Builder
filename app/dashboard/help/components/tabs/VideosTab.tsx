"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function VideosTab() {
  const videos = [
    {
      title: "Platform Overview",
      duration: "5:32",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: "2.4K",
    },
    {
      title: "Creating Your First Resume",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: "3.1K",
    },
    {
      title: "Job Matching Tutorial",
      duration: "6:47",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: "1.8K",
    },
    {
      title: "AI Resume Analysis",
      duration: "7:23",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: "2.7K",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Tutorials</CardTitle>
        <CardDescription>Watch our video guides to learn how to use our platform effectively</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm">{video.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
