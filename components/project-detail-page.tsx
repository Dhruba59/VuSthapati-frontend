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
        <section className="py-12 md:py-16">
          <div className="px-4 md:px-6">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <MultiImageViewer urls={project.imageUrls}/>
  
            <div className="">
              <div className="">
                
                <div className="p-8 mx-auto">
                  <h1 className="text-3xl font-bold my-10">{project.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="mb-4">
                        <h2 className="font-bold">Location:</h2>
                        <p>{project.location}</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-bold">
                          Architects Competition Stage:
                        </h2>
                        <p>2018</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-bold">
                          Architects Design and Implementation:
                        </h2>
                        <p>Vu - Sthapati</p>
                      </div>
                      <div className="mb-4">
                        <h2 className="font-bold">Client:</h2>
                        <p>{project.client}</p>
                      </div>
                    </div>
                    <div className="text-justify">
                      <p className="mb-4 font-mono">
                        {project.description}
                      </p>
                      {/* <p className="font-mono">
                        The traditional Bengali courtyard is one such space
                        created by the ensemble of huts and household elements,
                        showing life in symbiosis with nature. A space enlivened
                        by social, community and family activities. The courtyard
                        is also the place where, over the years, activities of
                        Panigram community initiatives have taken place, engaging
                        with neighboring villages. The household elements in the
                        installation come from the villagers who had generously
                        donated to the biennial.
                      </p> */}
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