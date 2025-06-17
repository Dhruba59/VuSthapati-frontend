'use client';
import { ConfirmDeleteDialog } from '@/components/confirmation-dialog';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/lib/models';
import { PROJECT_TYPE } from '@/lib/utils';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const router = useRouter();

    const loadProjects = async () => {
        try {
            setIsLoading(true);
            const res = await projectsAPI.getAll(PROJECT_TYPE.ALL);
            setProjects(res);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {

        try {
            setIsLoading(true);
            await projectsAPI.deleteByID(selectedProject?._id ?? '');
            const res = await projectsAPI.getAll(PROJECT_TYPE.ALL);
            toast({
                title: "Project deleted",
                description: "The project has been deleted successfully.",
                variant: "success",
            });
            loadProjects();
            setIsLoading(false);
            setDialogOpen(false);
            setSelectedProject(null);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }
    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <ProtectedRoute>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <Button onClick={() => router.push("/admin/projects/new")}>
                        + Add Project
                    </Button>
                </div>

                <ScrollArea className="rounded-lg border shadow-sm">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Client</th>
                                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:block">Type</th>
                                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="border-t hover:bg-accent transition-colors"
                                >
                                    <td className="py-3 px-4">{project.title}</td>
                                    <td className="py-3 px-4">{project.client}</td>
                                    <td className="py-3 px-4 hidden md:block">{PROJECT_TYPE[project.type as keyof typeof PROJECT_TYPE]}</td>

                                    <td className="py-3 px-4 text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(`/admin/projects/${project._id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedProject(project);
                                                setDialogOpen(true);
                                            }
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ConfirmDeleteDialog
                        open={dialogOpen}
                        onCancel={() => setDialogOpen(false)}
                        onConfirm={handleDelete}
                        title={selectedProject?.title ?? ''}
                    />
                </ScrollArea>
            </div>
        </ProtectedRoute>

    )
}

export default Projects;


{/* <div className="w-64 flex flex-row gap-2 items-center">
          <label>Type</label>
          <Select value={selectedValue} onValueChange={(value) => setSelectedValue(value as PROJECT_TYPE)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>

            <SelectContent className="w-64">
              <SelectItem value={PROJECT_TYPE.ALL}>All</SelectItem>
              <SelectItem value={PROJECT_TYPE.ARCHITECTURE}>Architecture</SelectItem>
              <SelectItem value={PROJECT_TYPE.INTERIOR}>Interior</SelectItem>
              <SelectItem value={PROJECT_TYPE.PUBLIC_SPACE}>Public space</SelectItem>
              <SelectItem value={PROJECT_TYPE.PLANNING}>Planning</SelectItem>
              <SelectItem value={PROJECT_TYPE.RESEARCH_AND_STUDY}>Research and study</SelectItem>
              <SelectItem value={PROJECT_TYPE.ACHIEVEMENTS}>Achievements</SelectItem>
            </SelectContent>
          </Select>
        </div> */}