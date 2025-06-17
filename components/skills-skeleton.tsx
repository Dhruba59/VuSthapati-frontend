import { Skeleton } from "@/components/ui/skeleton"

export function SkillsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 15 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
  )
}

