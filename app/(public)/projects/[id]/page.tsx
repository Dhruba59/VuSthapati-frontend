import { Suspense } from "react";
import { projectsAPI } from "@/lib/api";
import ProjectDetailPage from "@/components/project-detail-page";
import ProjectDetailSkeleton from "@/components/skeleton/project-detail-skeleton";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  try {
    const project = await projectsAPI.getById(params.id);

    return {
      title: `${project.title} | Vu-Sthapatui - Architect`,
      description: project.description,
    };
  } catch (error) {
    return {
      title: "Project | Vu-Sthapatui - Architect",
      description: "Project details",
    };
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<ProjectDetailSkeleton />}>
        <ProjectDetailPage id={params.id} />
      </Suspense>
    </main>
  );
}



