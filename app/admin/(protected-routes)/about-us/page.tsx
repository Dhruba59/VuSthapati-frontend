"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";
import { aboutAPI, contactApi, UploadAPI } from "@/lib/api";
import { UploadedFile } from "@/lib/models";
import { toast } from "@/hooks/use-toast";

function FileUploadSection({
  title,
  prevFiles,
  refetchFiles,
}: {
  title: string;
  refetchFiles: () => void;
  prevFiles: UploadedFile[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFiles(prevFiles);
  }, [prevFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setSelectedFiles(Array.from(files));
  };

  const handleUpload = async () => {
    setLoading(true);
    if (selectedFiles.length === 0) return;
    try {
      const res = await UploadAPI.uploadMultipleImages(selectedFiles);
      const newFiles: UploadedFile[] = res.map((file: UploadedFile, index) => ({
        url: file.url,
        deleteUrl: file.deleteUrl ? file.deleteUrl : undefined,
      }));
      if (title === "Upload Featured Images") {
        await aboutAPI.updateFeaturedImage([...uploadedFiles, ...newFiles]);
        setUploadedFiles([...uploadedFiles, ...newFiles]);
      } else {
        await aboutAPI.updateAboutUsImages([...uploadedFiles, ...newFiles]);
        setUploadedFiles([...uploadedFiles, ...newFiles]);
      }
      // refetchFiles();
      setSelectedFiles([]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading files:", error);
      return;
    } finally {
      setLoading(false);
      toast({
        title: "Upload Successful",
        description: "Your files have been uploaded successfully.",
      });
    }
  };

  const handleRemoveSelectedFile = (file: File) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };

  const handleDelete = async (file: UploadedFile) => {
    if (file.deleteUrl) {
      try {
        // ImgBB API deleteURL not working, so we will just remove from state
        // const res = await fetch(file.deleteUrl, { method: "DELETE" });  
        setUploadedFiles(uploadedFiles.filter((f) => f.url !== file.url)); 
      } catch (error : any) {
        console.error("Error deleting file:", error);
      }
    }
  };

  return (
    <section className="mb-8 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="mb-2"
        onChange={handleFileChange}
      />
      <div className="flex flex-wrap gap-4">
        {uploadedFiles.map((file, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 border rounded overflow-hidden flex flex-col items-center"
          >
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full p-1 z-10"
              onClick={() => handleDelete(file)}
              aria-label="Delete image"
            >
              <X size={16} />
            </button>
            <img
              src={file.url}
              alt="Images"
              className="object-cover w-full h-16"
            />
          </div>
        ))}
        {selectedFiles.map((file, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 border rounded overflow-hidden flex flex-col items-center"
          >
            <button
              type="button"
              className="absolute top-1 right-1 bg-white rounded-full p-1 z-10"
              onClick={() => handleRemoveSelectedFile(file)}
              aria-label="Delete image"
            >
              <X size={16} />
            </button>
            <img
              src={file ? URL.createObjectURL(file) : ""}
              alt={file.name}
              className="object-cover mx-auto my-auto w-full h-16"
            />
          </div>
        ))}
      </div>
      <Button
        className="mt-2 h-8 w-20"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0}
        loading={loading}
      >
        Save
      </Button>
    </section>
  );
}

export default function AboutUsManagement() {
  const [featuredImages, setFeaturedImages] = useState<UploadedFile[]>([]);
  const [aboutImages, setAboutImages] = useState<UploadedFile[]>([]);

  // Fetch already uploaded images from API on mount
  async function fetchImages() {
    try {
      aboutAPI.getAll().then((data) => {
        setFeaturedImages(data.featuredImages || []);
        setAboutImages(data.aboutUsImages || []);
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="mx-auto">
      <DescriptionsFields />
      <h1 className="text-2xl font-bold mb-3 md:mb-6">Files Management</h1>
      <FileUploadSection
        title="Upload Featured Images"
        prevFiles={featuredImages}
        refetchFiles={fetchImages}
      />
      <FileUploadSection
        title="Upload About Section Images"
        prevFiles={aboutImages}
        refetchFiles={fetchImages}
      />
    </div>
  );
}

const DescriptionsFields = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await aboutAPI.getAll();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await aboutAPI.update({
        ...aboutData,
        description1: aboutData?.description1 || "",
        description2: aboutData?.description2 || "",
        description3: aboutData?.description3 || "",
      });
    } catch (error) {
      console.error("Error updating about section:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 md:mb-6">About Section Management</h2>
      {/* Render about section data here */}
      <form className="flex flex-col mb-8 p-4 gap-4 border rounded" onSubmit={onSubmit}>
        <label className="flex flex-col">
          Description 1
          <textarea
            className="border rounded px-2 py-1"
            value={aboutData?.description1 || ""}
            onChange={(e) =>
              setAboutData((prev: any) => ({
                ...prev,
                description1: e.target.value,
              }))
            }
            rows={2}
          />
        </label>
        <label className="flex flex-col">
          Description 2
          <textarea
            className="border rounded px-2 py-1"
            value={aboutData?.description2 || ""}
            onChange={(e) =>
              setAboutData((prev: any) => ({
                ...prev,
                description2: e.target.value,
              }))
            }
            rows={2}
          />
        </label>
        <label className="flex flex-col">
          Description 3
          <textarea
            className="border rounded px-2 py-1"
            value={aboutData?.description3 || ""}
            onChange={(e) =>
              setAboutData((prev: any) => ({
            ...prev,
            description3: e.target.value,
              }))
            }
            rows={2}
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-8 w-20"
          loading={isLoading}
        >
          Save
        </Button>
      </form>
      <ContactFields />
    </div>
  );
};


const ContactFields = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await contactApi.getAll(); 
        setContactData(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactData();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await contactApi.update(contactData);
      toast({
        title: "Saved",
        description: "Contact information updated successfully.",
      });
    } catch (error) {
      console.error("Error updating contact info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">Contact Info Management</h2>

    <form className="flex flex-col mb-8 gap-4 border rounded" onSubmit={onSubmit}>

      <input
        className="border px-2 py-1 rounded"
        placeholder="Business Name"
        value={contactData?.name || ""}
        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
      />

      <input
        className="border px-2 py-1 rounded"
        placeholder="Primary Email"
        value={contactData?.primaryEmail || ""}
        onChange={(e) => setContactData({ ...contactData, primaryEmail: e.target.value })}
      />

      <input
        className="border px-2 py-1 rounded"
        placeholder="Secondary Emails (comma separated)"
        value={contactData?.secondaryEmails?.join(", ") || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            secondaryEmails: e.target.value.split(",").map((s) => s.trim()),
          })
        }
      />

      <input
        className="border px-2 py-1 rounded"
        placeholder="Primary Phone"
        value={contactData?.primaryPhone || ""}
        onChange={(e) => setContactData({ ...contactData, primaryPhone: e.target.value })}
      />

      <input
        className="border px-2 py-1 rounded"
        placeholder="Secondary Phones (comma separated)"
        value={contactData?.secondaryPhones?.join(", ") || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            secondaryPhones: e.target.value.split(",").map((p) => p.trim()),
          })
        }
      />

      <fieldset className="border rounded p-2">
        <legend className="font-semibold">Address</legend>
        <input
          className="border px-2 py-1 rounded"
          placeholder="Street"
          value={contactData?.address?.street || ""}
          onChange={(e) =>
            setContactData({
              ...contactData,
              address: { ...contactData.address, street: e.target.value },
            })
          }
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="City"
          value={contactData?.address?.city || ""}
          onChange={(e) =>
            setContactData({
              ...contactData,
              address: { ...contactData.address, city: e.target.value },
            })
          }
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Postal Code"
          value={contactData?.address?.postalCode || ""}
          onChange={(e) =>
            setContactData({
              ...contactData,
              address: { ...contactData.address, postalCode: e.target.value },
            })
          }
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Country"
          value={contactData?.address?.country || ""}
          onChange={(e) =>
            setContactData({
              ...contactData,
              address: { ...contactData.address, country: e.target.value },
            })
          }
        />
      </fieldset>

      <input
        className="border px-2 py-1 rounded"
        placeholder="Google Map Embed URL"
        value={contactData?.googleMapAddress?.embedUrl || ""}
        onChange={(e) =>
          setContactData({
            ...contactData,
            googleMapAddress: {
              ...contactData.googleMapAddress,
              embedUrl: e.target.value,
            },
          })
        }
      />

      <fieldset className="border rounded p-2">
        <legend className="font-semibold">Social Links</legend>
        {["website", "facebook", "linkedin", "twitter", "instagram"].map((platform) => (
          <input
            key={platform}
            className="border px-2 py-1 rounded mb-1"
            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
            value={contactData?.[platform] || ""}
            onChange={(e) => setContactData({ ...contactData, [platform]: e.target.value })}
          />
        ))}
      </fieldset>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-8 w-24"
        loading={isLoading}
      >
        Save
      </Button>
    </form>
    </div>
  );
};
