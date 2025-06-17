'use client'
import { newsAPI } from "@/lib/api";
import { News } from "@/lib/models";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsDetailsProps {
  params: {
    id: string;
  }
}

export default function NewsDetail({ params }: NewsDetailsProps) {
  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await newsAPI.getById(params.id);
        setNews(res);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (!news) {
    return <p className="text-center text-lg font-semibold">News article not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 text-sm mb-4">Published on {new Date(news?.createdAt ?? '').toDateString()}</p>
      <Image src='/assets/archi-image.jpg' alt={news.title} width={700} height={300} className="rounded-lg" />
      <p className="mt-6 text-base leading-relaxed text-justify text-gray-700">{news.description}</p>
    </div>
  );
}
