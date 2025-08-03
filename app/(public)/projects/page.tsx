'use client'
import { Suspense, useState } from "react";
import { ProjectsList } from "@/components/projects-list";
import { ProjectsSkeleton } from "@/components/projects-skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isAdmin, PROJECT_TYPE } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const [selectedValue, setSelectedValue] = useState<PROJECT_TYPE>(PROJECT_TYPE.ALL);

  const handleCreateNewClick = () => {
    window.location.href = "/admin/projects/new";
  };

  return (
    <div className="p-4 sm:px-0 container mx-auto flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 sm:flex-row justify-between w-full">
        <div className="w-64 flex flex-row gap-2 items-center">
          <label>Type</label>
          <Select value={selectedValue} onValueChange={(value) => setSelectedValue(value as PROJECT_TYPE)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            {/* Content (Dropdown) */}
            <SelectContent className="w-64">
              <SelectItem value={PROJECT_TYPE.ALL}>All</SelectItem>
              <SelectItem value={PROJECT_TYPE.BUILDING }>BUILDING</SelectItem>
              <SelectItem value={PROJECT_TYPE.INTERIOR}>Interior</SelectItem>
              <SelectItem value={PROJECT_TYPE.LANDSCAPE}>LANDSCAPE</SelectItem>
              <SelectItem value={PROJECT_TYPE.OTHERS}>OTHERS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isAdmin() && <Button variant="default" className="w-32" onClick={handleCreateNewClick}>Create New</Button> }
      </div>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsList type={selectedValue} />
      </Suspense>
    </div>
  );
}