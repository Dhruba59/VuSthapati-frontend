import { Skeleton } from "../ui/skeleton";

export default function ProjectDetailSkeleton() {
    return (
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl px-4 md:px-6">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="aspect-video w-full rounded-lg mb-8" />
  
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
  
              <Skeleton className="h-8 w-40 mt-8 mb-4" />
              <div className="space-y-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
  
              <Skeleton className="h-8 w-56 mt-8 mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
  
            <div>
              <div className="bg-muted p-6 rounded-lg">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  