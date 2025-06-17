import Image from "next/image"
import Link from "next/link"
import { Edit, EditIcon, ExternalLink, Github, Trash, TrashIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/utils"
import { projectsAPI } from "@/lib/api"
import { Toast } from "./ui/toast"
import { toast } from "./ui/use-toast"
import { useState } from "react"

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export function ProjectCard({ id, title, description, tags, imageUrl, githubUrl, liveUrl }: ProjectCardProps) {

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const router = useRouter();

  const handleClick = () => router.push(`/projects/${id}`);

  const handleEditClick = (id: string) => {
    router.push(`/admin/projects/${id}/edit`);
  };

  const handleDeleteClick = (id: string) => {

    try {
      projectsAPI.deleteByID(id);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error deleting project",
        description: "An error occurred while deleting the project.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="relative overflow-hidden h-80 shadow-lg group cursor-pointer"
      onClick={handleClick}
  >
    {/* Image */}
    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
      <Image
        src={'/assets/archi-image.jpg'}
        alt={title}
        fill
        className="object-cover w-full h-full transition-all duration-300"
        />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col gap-4 px-4 py-4 items-center justify-center">
      <h3 className="text-black/70 text-base font-mono font-semibold text-center">{title}</h3>
      <p className="text-black/60 text-sm font-light text-center">
        {description.length > 40 ? `${description.slice(0, 40)}...` : description}
      </p>
      <div className="flex flex-wrap text-blue-50 gap-2 mt-4">
        {tags.map((tag, index) => (
          <Badge className="text-black/55" variant='outline' key={index}>{tag}</Badge>
        ))}
      </div>
      {isAdmin() && <div className="flex gap-4 mt-4">
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            handleEditClick(id);
          }}
        >
          <Edit className="w-5 h-5 text-black/70" />
        </button>
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            handleDeleteClick(id);
          }}
        >
          <Trash className="w-5 h-5 text-black/70" />
        </button>
      </div>}
    </div>
      
  </div>
  )
}

