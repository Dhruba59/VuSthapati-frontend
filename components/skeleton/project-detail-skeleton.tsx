import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectDetailSkeleton() {
  return (
    <Card className="max-w-3xl mx-auto p-6">
       <Skeleton className="h-6 w-2/3 mb-4" />
         <Skeleton className="h-6 w-2/3 mb-4" />
        <CardHeader>
          <Skeleton className="h-6 w-2/3 mb-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <div className="flex flex-wrap gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </CardContent>
    </Card>
  );
}