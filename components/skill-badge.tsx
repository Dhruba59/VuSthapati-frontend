import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
  level?: number
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  // Add visual indicator for skill level if provided
  const renderLevel = () => {
    if (!level) return null

    return (
      <span className="ml-1 text-xs">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`inline-block ${i < level ? "text-primary" : "text-muted-foreground opacity-30"}`}>
            •
          </span>
        ))}
      </span>
    )
  }

  return (
    <Badge variant="outline" className="px-3 py-1 text-sm flex items-center">
      {name}
      {renderLevel()}
    </Badge>
  )
}

