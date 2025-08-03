import Image from "next/image"
import Link from "next/link"
import { Edit, Github, Trash, TrashIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/utils"
import { projectsAPI } from "@/lib/api"
import { Toast } from "./ui/toast"
import { toast } from "./ui/use-toast"
import { useState } from "react"
import { UploadedFile } from "@/lib/models"

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: UploadedFile[];
  githubUrl: string;
  liveUrl: string;
}

export function ProjectCard({ id, title, description, tags, images, githubUrl, liveUrl }: ProjectCardProps) {

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
        src={images[0]?.url}
        alt={title}
        fill
        className="object-cover w-full h-full transition-all duration-300"
        />
    </div>

    {/* Overlay */}
    <div className="font-sans absolute inset-0 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col gap-4 px-4 py-4 items-center justify-center">
      <h3 className="text-black/70 text-base font-semibold text-center">{title}</h3>
      <p className="text-black/60 text-sm font-light text-center font-raleway px-4  ">
        {description.length > 80 ? `${description.slice(0, 80)}...` : description}
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

