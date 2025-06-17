import { Suspense } from "react"
import { ProjectCard } from "@/components/project-card"
import { ProjectCardSkeleton } from "@/components/project-card-skeleton"
import { projectsAPI } from "@/lib/api"

export function FeaturedProjects() {
  return (
    <Suspense fallback={<FeaturedProjectsSkeleton />}>
      <FeaturedProjectsContent />
    </Suspense>
  )
}

async function FeaturedProjectsContent() {
  try {
    // Fetch featured projects from the API
    const projects = await projectsAPI.getFeatured()

    if (!projects || projects.length === 0) {
      return (
        <div className="py-8">
          <p className="text-muted-foreground">No featured projects available at the moment.</p>
        </div>
      )
    }

    // Limit to 4 projects for the homepage
    const displayProjects = projects.slice(0, 4)

    return (
      <div className="grid gap-8 md:grid-cols-2">
        {displayProjects.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageUrl={project.imageUrl}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            id={project._id}
          />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return (
      <div className="py-8">
        <p className="text-muted-foreground">Failed to load projects. Please try again later.</p>
      </div>
    )
  }
}

function FeaturedProjectsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}

