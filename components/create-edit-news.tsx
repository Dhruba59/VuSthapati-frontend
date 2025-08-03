"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { newsAPI, projectsAPI, UploadAPI } from "@/lib/api";
import { News, UploadedFile } from "@/lib/models";
import { PROJECT_TYPE } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  images: [],
};

const CreateEditNewsPage = ({ id }: { id?: string }) => {
  const [selectedImages, setSelectedImages] = useState<FileList>();
  const [formData, setFormData] = useState<News>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      if (id) {
        const res = await newsAPI.getById(id);
        setFormData(res);
      }
    };
    loadData();
    setIsLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImages(e.target.files as FileList);
    }
  };

  const handleImageDeleteBtnClick = async (image: UploadedFile) => {
      const updatedImages = formData.images.filter((item) => item.url !== image.url);
      if (image.deleteUrl) {
        try {
          await fetch(image.deleteUrl, { method: "POST" });
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
      setFormData({ ...formData, images: updatedImages });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      let res: UploadedFile[] = [];
      if (selectedImages) {
        res = await UploadAPI.uploadMultipleImages(selectedImages);
        // setFormData({ ...formData, images: res });
      }
      if (!id) {
        await newsAPI.create({ ...formData, images: res });
        toast({
          title: "News Created",
          description: "Your news has been created successfully.",
          variant: "success",
          position: "top",
        });
        setFormData({ ...initialFormData });
      } else {
        await newsAPI.update(id, {
          ...formData,
          images: [...formData.images, ...res],
        });
        toast({
          title: "News Updated",
          description: "Your news has been updated successfully.",
          variant: "success",
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred!",
        variant: "error",
        position: "top",
      });
    } finally {
      setIsSubmitting(false);
      router.push("/admin/news");
    }
  };

  return (
    <div className="flex items-center justify-start px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl">
        <h1 className="font-semibold mb-6 text-gray-800">Create New News</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={8}
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>
            {/* Displaying already uploaded images */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDeleteBtnClick(image)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {/* Displaying the newly selected images from the FileList (not yet uploaded) */}
              {Array.from(selectedImages ?? [])?.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file ? URL.createObjectURL(file) : ""}
                    alt={`Uploaded ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedUrls = formData.images.filter(
                        (_, i) => i !== index
                      );
                      setFormData({ ...formData, images: updatedUrls });
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
            />
          </div>
          <Button
            variant="default"
            disabled={isSubmitting}
            type="submit"
            className="w-full font-semibold transition duration-200"
          >
            {id ? "Update News" : "Create News"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditNewsPage;
