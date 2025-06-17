"use client"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const images = [
  "/assets/archi-image.jpg",
  "/assets/collage2.png",
  "/assets/random-user-photo.jpg",
];

export default function ImageSlider({imageUrls}: {imageUrls?: string[]}) {
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Images */}
      <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <img key={index} src={src} onClick={() => router.push('/projects/1')} alt={`Slide ${index}`} className="w-full object-cover cursor-pointer" />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
