"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";

// const images = Array.from({ length: 30 }, (_, i) => `/assets/archi-image.jpg`);

export default function MultiImageViewer({ urls, ratio }: { urls: string[], ratio?: number }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % urls.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + urls.length) % urls.length);
  };

  return (
    <div className="mx-auto max-w-6xl ">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Selected Image with Arrows */}
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-lg bg-gray-50">
        <AspectRatio
          ratio={
            typeof window !== "undefined" && window.innerWidth < 640
              ? (ratio ?? 4 / 3)
              : (ratio ?? 16 / 8)
          }
        >
          <img
            src={urls[selectedIndex]}
            alt={`Selected ${selectedIndex}`}
            className="w-full h-full object-contain rounded-lg"
          />
        </AspectRatio>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2  p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2  p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Thumbnails on the Right */}
        <div
          className="flex gap-2 overflow-x-auto max-h-96 lg:flex-col"
        >
          {urls.map((src, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 shrink-0 overflow-hidden rounded-md shadow-md transition-all ${
                index === selectedIndex
                  ? "opacity-100 border-2 border-blue-500"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <div className="relative w-20 h-20">
                <Image
                  src={src}
                  alt={`Thumbnail ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
