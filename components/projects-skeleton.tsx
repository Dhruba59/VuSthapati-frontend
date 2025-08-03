import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProjectsListViewSkeleton() {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="overflow-hidden h-[330px]">
          <CardContent className="mt-24">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


//  <Card key={i} className="overflow-hidden">
//           <Skeleton className="aspect-video w-full" />
//           <CardHeader>
//             <Skeleton className="h-6 w-2/3" />
//           </CardHeader>
//           <CardContent>
//             <Skeleton className="h-4 w-full mb-2" />
//             <Skeleton className="h-4 w-5/6 mb-4" />
//             <div className="flex flex-wrap gap-2 mt-4">
//               {[1, 2, 3].map((j) => (
//                 <Skeleton key={j} className="h-6 w-16 rounded-full" />
//               ))}
//             </div>
//           </CardContent>
//           <CardFooter className="flex gap-2">
//             <Skeleton className="h-9 w-24" />
//             <Skeleton className="h-9 w-24" />
//           </CardFooter>
//         </Card>

