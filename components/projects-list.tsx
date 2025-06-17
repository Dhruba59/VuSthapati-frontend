'use client'
import { ProjectCard } from "@/components/project-card"
import { projectsAPI } from "@/lib/api"
import { useEffect, useState } from "react";
import { ProjectsSkeleton } from "./projects-skeleton";
import { useData } from "./data-provider";
import { PROJECT_TYPE } from "@/lib/utils";

interface Project {}

interface ProjectListProps {
  type: PROJECT_TYPE;
}

export function ProjectsList({ type }: ProjectListProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        console.log(type);
        const res = await projectsAPI.getAll(type);
        setProjects(res);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [type]);

  if (isLoading) {
    return (
      <ProjectsSkeleton key="loading"  />
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div key="no-projects"  className="text-center py-12">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {projects.map((project: any) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          description={project.description}
          tags={project.tags}
          imageUrl={project.imageUrl}
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
        />
      ))}
    </div>
  )
}
