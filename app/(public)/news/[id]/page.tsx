'use client'
import MultiImageViewer from "@/components/multi-image-viewer";
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
      <h1 className="text-4xl font-sans font-normal text-center mb-4">{news.title}</h1>
      <p className="text-gray-500 text-sm text-center mb-12">Published on {new Date(news?.createdAt ?? '').toDateString()}</p>
      <MultiImageViewer urls={news?.images?.map(item => item.url)}/>
      <p className="font-raleway text-base leading-relaxed text-justify text-gray-700 mt-12">{news.description}</p>
    </div>
  );
}
