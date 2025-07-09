"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    thumbnail: "/img3.jpg",
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
    thumbnail: "/img3.jpg",
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
    thumbnail: "/img2.jpg",
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
    thumbnail: "/img1.jpg",
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
      <h2 className="text-3xl font-bold mb-6 text-[#2DA105]">{title}</h2>
      {videosToRender.length === 0 ? (
        <p className="text-muted-foreground">No videos in this section.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videosToRender.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden border border-border bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/library/contests-details/${video.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-black fill-black" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className="bg-[#2DA105]/90 text-white text-xs"
                      >
                        {video.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/library/contest-details/${video.id}`}>
                    <h3 className="font-semibold text-base line-clamp-2 hover:text-[#2DA105] transition-colors mb-2">
                      {video.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>by {video.creator}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{video.views} views</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container p-6 md:p-12 mt-20">
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
