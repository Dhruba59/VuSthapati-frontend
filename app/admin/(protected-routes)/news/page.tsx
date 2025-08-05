'use client';
import { ConfirmDeleteDialog } from '@/components/confirmation-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { newsAPI, projectsAPI } from '@/lib/api';
import { News, Project } from '@/lib/models';
import { PROJECT_TYPE } from '@/lib/utils';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Projects = () => {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<News | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const router = useRouter();

    const loadNews = async () => {
        try {
            setIsLoading(true);
            const res = await newsAPI.getAll();
            setNewsList(res);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {

        try {
            setIsLoading(true);
            await newsAPI.delete(selectedProject?._id ?? '');
            const res = await newsAPI.getAll();
            toast({
                title: "News deleted",
                description: "The News has been deleted successfully.",
                variant: "success",
            });
            loadNews();
            setIsLoading(false);
            setDialogOpen(false);
            setSelectedProject(null);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }
    useEffect(() => {
        loadNews();
    }, []);

    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl md:text-2xl font-semibold">News</h1>
                <Button onClick={() => router.push("/admin/news/new")}>
                    + Add News
                </Button>
            </div>

            <ScrollArea className="rounded-lg border shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Title</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                            <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map((news) => (
                            <tr
                                key={news._id}
                                className="border-t hover:bg-accent transition-colors"
                            >
                                <td className="py-3 px-4">{news.title}</td>
                                <td className="py-3 px-4">{new Date(news.createdAt ?? '').toLocaleString()}</td>

                                <td className="py-3 px-4 text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.push(`/admin/news/${news._id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedProject(news);
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