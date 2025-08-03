"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ImageSlider({ imageUrls }: { imageUrls?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!imageUrls) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    if (!imageUrls) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  if (!imageUrls || imageUrls.length === 0) {
    return <div>No images found</div>;
  }

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Image container */}
      <div
        className="flex h-full transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageUrls.map((src, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={src}
              onClick={() => router.push("/projects/1")}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 z-10"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
