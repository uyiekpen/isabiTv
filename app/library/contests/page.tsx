"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Clock, Play } from "lucide-react";

interface ContestVideo {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  uploadDate: string;
  description: string;
  status: "ongoing" | "closed";
}

const contestVideos: ContestVideo[] = [
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
  {
    id: "c2",
    title: "Music Video Challenge",
    creator: "SoundWave",
    thumbnail: "/thumbnails/musicvideo.jpg",
    duration: "3:15",
    views: "12.1K",
    likes: "2.5K",
    category: "Contests",
    uploadDate: "5 days ago",
    description:
      "An upbeat and colorful music video created for the summer challenge, showcasing choreography and rhythm.",
    status: "closed",
  },
  {
    id: "c3",
    title: "Animation Showdown",
    creator: "PixelCraft",
    thumbnail: "/thumbnails/animation.jpg",
    duration: "6:30",
    views: "5.7K",
    likes: "1.1K",
    category: "Contests",
    uploadDate: "1 day ago",
    description:
      "A 2D animation short full of humor, crafted with intricate frame-by-frame motion and an engaging story arc.",
    status: "ongoing",
  },
  {
    id: "c4",
    title: "Drone Footage Finals",
    creator: "SkyHighVisuals",
    thumbnail: "/thumbnails/drone.jpg",
    duration: "2:50",
    views: "22.4K",
    likes: "3.3K",
    category: "Contests",
    uploadDate: "2 weeks ago",
    description:
      "Breathtaking aerial footage captured with a drone, exploring landscapes during golden hour.",
    status: "closed",
  },
];

export default function ContestPage() {
  const [videos, setVideos] = useState<ContestVideo[]>([]);

  useEffect(() => {
    setVideos(contestVideos);
  }, []);

  const ongoing = videos.filter((video) => video.status === "ongoing");
  const closed = videos.filter((video) => video.status === "closed");

  const renderSection = (title: string, videosToRender: ContestVideo[]) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {videosToRender.length === 0 ? (
        <p className="text-muted-foreground">No videos in this section.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {videosToRender.map((video) => (
            <Link
              key={video.id}
              href={`/library/contest-details/${video.id}`}
              className="group w-full max-w-sm"
            >
              <div className="overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-3">
                      <Play className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {video.category}
                  </Badge>
                  <h3 className="mb-1 font-semibold line-clamp-2 group-hover:text-primary">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {video.description}
                  </p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    by {video.creator}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contest Entries</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Explore amazing entries submitted by creators for our ongoing video
          contests.
        </p>

        {renderSection("Ongoing Contests", ongoing)}
        {renderSection("Closed Contests", closed)}
      </main>
      <Footer />
    </div>
  );
}
