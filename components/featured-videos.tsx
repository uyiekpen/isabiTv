import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Heart } from "lucide-react";

const featuredVideos = [
  {
    id: "1",
    title: "Amazing Sunset Timelapse",
    creator: "NatureFilms",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "2:34",
    views: "12.5K",
    likes: "1.2K",
    category: "Nature",
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
  },
];

export function FeaturedVideos() {
  return (
    <section className="p-6 flex justify-center mt-8">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Featured Videos
          </h2>
          <p className="text-muted-foreground">
            Discover the most popular content from our amazing creators
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden">
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
                  <p className="mb-3 text-sm text-muted-foreground">
                    by {video.creator}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/library"
            className="inline-flex items-center justify-center rounded-md bg-[#228201] px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View All Videos
          </Link>
        </div>
      </div>
    </section>
  );
}
