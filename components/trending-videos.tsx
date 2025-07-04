import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";

const featuredVideos = [
  {
    id: "1",
    title: "Beats & Vibes: Inside Afrobeats Culture",
    creator: "DJ Tolu",
    thumbnail: "/img1.jpg",
    duration: "5:34",
    year: "2025",
    rating: "9.1",
    category: "Music",
  },
  {
    id: "2",
    title: "Melanin Glow: Skincare for Black Women",
    creator: "GlowByNia",
    thumbnail: "/img2.jpg",
    duration: "12:20",
    year: "2025",
    rating: "9.4",
    category: "Beauty",
  },
  {
    id: "3",
    title: "How I Launched My Fashion Brand in Lagos",
    creator: "Zuri Threads",
    thumbnail: "/img3.jpg",
    duration: "14:05",
    year: "2025",
    rating: "8.8",
    category: "Entrepreneurship",
  },
  {
    id: "4",
    title: "Black Hair, Bold Stories: A Natural Hair Journey",
    creator: "Curls & Coils",
    thumbnail: "/auth.jpg",
    duration: "10:45",
    year: "2025",
    rating: "9.0",
    category: "Culture",
  },
  {
    id: "5",
    title: "My First Nollywood Short Film",
    creator: "FilmsByKelechi",
    thumbnail: "/a.jpg",
    duration: "17:30",
    year: "2025",
    rating: "8.6",
    category: "Film",
  },
  {
    id: "6",
    title: "From Side Hustle to Tech CEO",
    creator: "CodeBlack",
    thumbnail: "/2.jpg",
    duration: "13:58",
    year: "2025",
    rating: "9.2",
    category: "Tech",
  },
];


export function TrendingVideo() {
  return (
    <section className="p-6 md:p-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-black">
            Trending Videos
          </h2>
          <p className="text-muted-foreground">
            Discover the most popular content from our amazing creators
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredVideos.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/library/video/${video.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-white/90 p-3 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-black fill-black" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white text-xs"
                      >
                        {video.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                </Link>

                <div className="p-3">
                  <Link href={`/library/video/${video.id}`}>
                    <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors mb-1">
                      {video.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {video.year} • {video.duration}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{video.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <Link
            href="/library"
            className="inline-flex items-center justify-center rounded-lg bg-[#228201] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a6501] shadow-lg hover:shadow-xl"
          >
            View All Videos
          </Link>
        </div> */}
      </div>
    </section>
  );
}
