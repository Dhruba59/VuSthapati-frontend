import { Suspense } from "react"
import { Code } from "lucide-react"
import { SkillBadge } from "@/components/skill-badge"
import { SkillsSkeleton } from "@/components/skills-skeleton"
import { skillsAPI } from "@/lib/api"

export interface Skill {
  _id: string
  name: string
  category: string
  level: number
  order: number
}

export function SkillsSection() {
  return (
    <div className="flex-1 rounded-lg bg-muted p-6">
      <div className="mb-6 flex items-center gap-2">
        <Code className="h-5 w-5 text-primary" />
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
      </div>
      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsList />
      </Suspense>
    </div>
  )
}

async function SkillsList() {
  try {
    // Fetch skills from the API
    const skills = await skillsAPI.getAll()

    if (!skills || skills.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No skills available.</p>
        </div>
      )
    }

    // Group skills by category
    const groupedSkills: Record<string, Skill[]> = {}

    skills.forEach((skill: Skill) => {
      if (!groupedSkills[skill.category]) {
        groupedSkills[skill.category] = []
      }
      groupedSkills[skill.category].push(skill)
    })

    // Get frontend skills first, then others
    const frontendSkills = groupedSkills["frontend"] || []

    // Flatten all skills for display
    const allSkills = [
      ...frontendSkills,
      ...Object.entries(groupedSkills)
        .filter(([category]) => category !== "frontend")
        .flatMap(([_, skills]) => skills),
    ]

    return (
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => (
          <SkillBadge key={skill._id} name={skill.name} level={skill.level} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching skills:", error)
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Failed to load skills. Please try again later.</p>
      </div>
    )
  }
}

