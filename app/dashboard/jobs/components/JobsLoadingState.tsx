"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function JobsLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-[200px] rounded-lg" />
          <Skeleton className="h-[400px] rounded-lg" />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Skeleton className="h-10 w-full md:w-80" />
            <Skeleton className="h-10 w-[180px]" />
          </div>

          <Skeleton className="h-10 w-[300px] mb-6" />

          <div className="space-y-4 mb-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[120px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  )
}
