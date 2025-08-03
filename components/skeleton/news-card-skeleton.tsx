import { Skeleton } from "../ui/skeleton";

export function NewsCardSkeleton() {
  return (
    <div className="container grid md:grid-cols-3 gap-8 mx-auto">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white shadow-lg overflow-hidden h-[330px]">
          <Skeleton className="w-full h-56" />
          <div className="p-4">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-6 w-full mb-4" />
          </div>
        </div>
      ))}
    </div>
  );
}