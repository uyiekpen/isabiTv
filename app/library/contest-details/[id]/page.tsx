"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Clock } from "lucide-react";
import Link from "next/link";

const contestVideos = [
  {
    id: "c1",
    title: "Short Film Contest Entry",
    creator: "FilmWizard",
    thumbnail: "/thumbnails/shortfilm.jpg",
    duration: "4:45",
    views: "8.2K",
    likes: "1.9K",
    category: "Contests",
    uploadDate: "2 days ago",
    description:
      "A dramatic tale of resilience told in under five minutes, featuring clever camera work and emotional storytelling.",
    status: "ongoing",
  },
  // ...include more videos
];

export default function ContestDetailPage() {
  const params = useParams();
  const videoId = params?.id as string;
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const found = contestVideos.find((v) => v.id === videoId);
    setVideo(found);
  }, [videoId]);

  if (!video) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container px-4 py-10 max-w-4xl mx-auto">
        <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover"
          />
        </div>

        <Badge variant="secondary" className="mb-2">
          {video.category}
        </Badge>
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-muted-foreground mb-4">by {video.creator}</p>

        <div className="flex gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {video.views}
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {video.likes}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {video.uploadDate}
          </div>
        </div>

        <p className="mb-8 text-gray-700 dark:text-gray-300">
          {video.description}
        </p>

        {video.status === "ongoing" && (
          <div className="mb-10">
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-[#2DA105] text-white rounded-full"
              >
                Apply for Contest
              </Button>
            </Link>
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <p className="text-muted-foreground">
            (Comments functionality coming soon...)
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Recommended Videos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {contestVideos
              .filter((v) => v.id !== video.id)
              .slice(0, 2)
              .map((rec) => (
                <div key={rec.id} className="border rounded-lg p-3">
                  <div className="relative aspect-video mb-3 rounded overflow-hidden">
                    <Image
                      src={rec.thumbnail}
                      alt={rec.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{rec.creator}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
