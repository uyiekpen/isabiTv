"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Eye, Heart, Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Dummy video data for example
const dummyVideos = [
  {
    id: "1",
    title: "Nature Walk",
    description: "Experience the serene beauty of nature on this calming walk.",
    url: "/videos/nature.mp4",
    thumbnail: "/thumbnails/nature.jpg",
    genre: "Nature",
    year: 2024,
    duration: "12:35",
    creator: "NatureFilms",
    views: "12.5K",
    likes: "1.2K",
    uploadDate: "2 days ago",
  },
  {
    id: "2",
    title: "Tech Trends",
    description: "A quick dive into 2025's latest tech innovations.",
    url: "/videos/tech.mp4",
    thumbnail: "/thumbnails/tech.jpg",
    genre: "Technology",
    year: 2025,
    duration: "09:21",
    creator: "TechCreator",
    views: "67.3K",
    likes: "5.4K",
    uploadDate: "5 days ago",
  },
];

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [recommended, setRecommended] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      const foundVideo = dummyVideos.find((v) => v.id === id);
      setVideo(foundVideo);
      const others = dummyVideos.filter((v) => v.id !== id);
      setRecommended(others);
    }
  }, [id]);

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Video not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container p-6 max-w-6xl mx-auto">
        {/* Video Player */}
        <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
        <video controls className="w-full rounded-lg mb-4">
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Metadata */}
        <div className="mb-6">
          <p className="text-muted-foreground mb-2">{video.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <Badge variant="secondary">{video.genre}</Badge>
            <span>
              By <span className="font-medium">{video.creator}</span>
            </span>
            <span>{video.year}</span>
            <span>{video.duration}</span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {video.likes}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {video.uploadDate}
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <div className="border rounded-lg p-4 mb-2 bg-gray-50">
            <p className="text-sm text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          </div>
          <textarea
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-500"
          />
          <button className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg">
            Post Comment
          </button>
        </div>

        {/* Recommended Videos */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {recommended.map((vid) => (
              <Link
                key={vid.id}
                href={`/library/video/${vid.id}`}
                className="group w-full max-w-sm"
              >
                <div className="overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={vid.thumbnail || "/placeholder.svg"}
                      alt={vid.title}
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
                      {vid.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {vid.genre}
                    </Badge>
                    <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-primary">
                      {vid.title}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      by {vid.creator}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{vid.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{vid.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{vid.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
