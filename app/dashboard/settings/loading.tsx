import { Skeleton } from "@/components/ui/skeleton"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <DashboardSidebar /> */}

      <div className="flex-1">
        {/* <DashboardHeader /> */}

        <main className="p-6">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-10 w-full max-w-md" />
          </div>

          <div className="space-y-6">
            <Skeleton className="h-10 w-full rounded-md mb-6" />

            <div className="bg-card rounded-lg border shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-48 mb-3" />
                  <Skeleton className="h-4 w-full max-w-md mb-2" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>

                <Skeleton className="h-px w-full my-6" />

                <div>
                  <Skeleton className="h-6 w-36 mb-3" />
                  <Skeleton className="h-10 w-full max-w-md" />
                </div>

                <Skeleton className="h-px w-full my-6" />

                <div>
                  <Skeleton className="h-6 w-40 mb-3" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-5 w-36 mb-1" />
                        <Skeleton className="h-4 w-52" />
                      </div>
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}