import { projectsAPI } from "@/lib/api";
import { notFound } from "next/navigation";
import MultiImageViewer from "./multi-image-viewer";
import { ArrowLeft, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
  
const ProjectDetailPage = async ({ id }: { id: string }) => {
    try {
      const project = await projectsAPI.getById(id);
  
      if (!project) {
        notFound();
      }
  
      return (
        <section className="mx-auto py-12 md:py-16 max-w-7xl">
          <div className="px-4 md:px-6">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <MultiImageViewer urls={project.images.map(item => item.url)}/>
  
            <div className="">
              <div className="font-sans tracking-wider">
                
                <div className="p-8 mx-auto">
                  <h1 className="text-2xl lg:text-4xl my-10 text-center font-sans text-black/80 font-semibold">{project.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-4">
                        <h2 className="font-semibold text-neutral-800 text-lg">Location:</h2>
                        <p className="text-neutral-600">{project.location}</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-semibold text-neutral-800 text-lg">
                          Architects Competition Stage:
                        </h2>
                        <p className="text-neutral-600">2018</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-semibold text-neutral-800 text-lg">
                          Architects Design and Implementation:
                        </h2>
                        <p className="text-neutral-600">Vu - Sthapati</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-semibold text-neutral-800 text-lg">Client:</h2>
                        <p className="text-neutral-600">{project.client}</p>
                      </div>
                    </div>
                    <div className="text-justify">
                      <p className="font-sans text-neutral-600 font-normal leading-loose tracking-widest mb-4">
                        {project.description}
                      </p>
                    </div>
                    <div className="w-fit space-x-2">
                      {project.tags.map((tag: any) => (
                      <Badge className="w-fit" key={tag} variant="default">
                        {tag}
                      </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } catch (error) {
      console.error("Error fetching project:", error);
      notFound();
    }
  }

  export default ProjectDetailPage;