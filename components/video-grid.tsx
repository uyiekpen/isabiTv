import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Heart, Clock } from "lucide-react";

const allVideos = [
  {
    id: "1",
    title: "Amazing Sunset Timelapse",
    creator: "NatureFilms",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "2:34",
    views: "12.5K",
    likes: "1.2K",
    category: "Nature",
    uploadDate: "2 days ago",
  },
  {
    id: "2",
    title: "Cooking Masterclass: Italian Pasta",
    creator: "ChefMario",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "15:42",
    views: "45.2K",
    likes: "3.8K",
    category: "Cooking",
    uploadDate: "1 week ago",
  },
  {
    id: "3",
    title: "Urban Photography Tips",
    creator: "StreetLens",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "8:15",
    views: "28.1K",
    likes: "2.1K",
    category: "Photography",
    uploadDate: "3 days ago",
  },
  {
    id: "4",
    title: "DIY Home Studio Setup",
    creator: "TechCreator",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "12:08",
    views: "67.3K",
    likes: "5.4K",
    category: "Technology",
    uploadDate: "5 days ago",
  },
  {
    id: "5",
    title: "Epic Movie Trailer Recreation",
    creator: "FilmMaker",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "3:45",
    views: "89.1K",
    likes: "7.2K",
    category: "Movies",
    uploadDate: "1 day ago",
  },
  {
    id: "6",
    title: "Contest Entry: Best Short Film",
    creator: "IndieCreator",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "4:22",
    views: "15.3K",
    likes: "2.8K",
    category: "Contests",
    uploadDate: "4 days ago",
  },
];

interface VideoGridProps {
  category: string;
  searchQuery: string;
}

export function VideoGrid({ category, searchQuery }: VideoGridProps) {
  const filteredVideos = allVideos.filter((video) => {
    const matchesCategory = category === "All" || video.category === category;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredVideos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No videos found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden w-full max-w-sm"
            >
              <CardContent className="p-0">
                <Link href={`/library/video/${video.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-white/90 p-3">
                        <Play className="h-6 w-6 text-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <Badge variant="secondary" className="mb-2">
                      {video.category}
                    </Badge>
                  </div>
                  <Link href={`/library/video/${video.id}`}>
                    <h3 className="mb-2 font-semibold line-clamp-2 hover:text-primary">
                      {video.title}
                    </h3>
                  </Link>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
