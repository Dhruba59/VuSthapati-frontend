'use client'
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { newsAPI } from "@/lib/api";
import { News as NewsType } from "@/lib/models";
import { isAdmin } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const res = await newsAPI.getAll();
        setNews(res);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [])

  const handleCreateNewClick = () => {
    window.location.href = "/admin/news/new" 
  }

  const handleEditClick = (id: string) => {
      router.push(`/admin/news/${id}/edit`)
  }

  const handleDeleteClick = (id: string) => {
    try {
      newsAPI.delete(id);
    } catch(error) {
      toast({
        title: "Error deleting news",
        description: "An error occurred while deleting the project.",
        variant: "error",
      });
    }
  }

  if(news.length === 0) {
    return (
      <section className="px-4 sm:px-0 container mx-auto">
        <div className="mx-auto space-y-2">
          <h2 className="text-header font-extrabold my-3 text-black/60">News</h2>
          <p className="text-gray-500">No news available at the moment.</p>
        </div>
      </section>
    );
  }


  return (
    <section className="px-4 sm:px-0 container mx-auto">
      <div className="mx-auto space-y-2">
        <div className="flex justify-end">
          {isAdmin() && <Button variant="default" className="w-32" onClick={handleCreateNewClick}>Create New</Button>}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((news) => (
            <div key={news._id} onClick={() => router.push(`/news/${news._id}`)} className="bg-white shadow-lg overflow-hidden h-[330px] cursor-pointer">
              <Image
                src={news.images[0]?.url}
                alt={news.title}
                width={400}
                height={200}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between"> 
                <p className="text-gray-600 text-xs font-sans mb-2">{new Date(news?.createdAt ?? '').toDateString()}</p>

                {isAdmin() && <div className="flex gap-4 ">
                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    handleEditClick(news._id as any);
                  }}
                >
                  <Edit className="w-3 h-3 text-black/70" />
                </button>
                <button
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    handleDeleteClick(news._id as any);
                  }}
                >
                  <Trash className="w-3 h-3 text-black/70" />
                </button>
              </div>}
                </div>
                <h3 className="font-sans text-xl font-semibold truncate text-black/75">{news.title}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
