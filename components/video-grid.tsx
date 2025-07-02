import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock } from "lucide-react"

const allVideos = [
  {
    id: "1",
    title: "Amazing Sunset Timelapse",
    creator: "NatureFilms",
    thumbnail: "/img1.jpg",
    duration: "2:34",
    views: "12.5K",
    likes: "1.2K",
    category: "Nature",
    uploadDate: "2 days ago",
    year: "2024",
    rating: "8.2",
  },
  {
    id: "2",
    title: "Cooking Masterclass: Italian Pasta",
    creator: "ChefMario",
    thumbnail: "/img1.jpg",
    duration: "15:42",
    views: "45.2K",
    likes: "3.8K",
    category: "Cooking",
    uploadDate: "1 week ago",
    year: "2024",
    rating: "9.1",
  },
  {
    id: "3",
    title: "Urban Photography Tips",
    creator: "StreetLens",
    thumbnail: "/img1.jpg",
    duration: "8:15",
    views: "28.1K",
    likes: "2.1K",
    category: "Photography",
    uploadDate: "3 days ago",
    year: "2024",
    rating: "7.8",
  },
  {
    id: "4",
    title: "DIY Home Studio Setup",
    creator: "TechCreator",
    thumbnail: "/img1.jpg",
    duration: "12:08",
    views: "67.3K",
    likes: "5.4K",
    category: "Technology",
    uploadDate: "5 days ago",
    year: "2024",
    rating: "8.5",
  },
  {
    id: "5",
    title: "Epic Movie Trailer Recreation",
    creator: "FilmMaker",
    thumbnail: "/img1.jpg",
    duration: "3:45",
    views: "89.1K",
    likes: "7.2K",
    category: "Movies",
    uploadDate: "1 day ago",
    year: "2024",
    rating: "9.3",
  },
  {
    id: "6",
    title: "Contest Entry: Best Short Film",
    creator: "IndieCreator",
    thumbnail: "/img1.jpg",
    duration: "4:22",
    views: "15.3K",
    likes: "2.8K",
    category: "Contests",
    uploadDate: "4 days ago",
    year: "2024",
    rating: "8.7",
  },
];

interface VideoGridProps {
  category: string
  searchQuery: string
}

export function VideoGrid({ category, searchQuery }: VideoGridProps) {
  const filteredVideos = allVideos.filter((video) => {
    const matchesCategory = category === "All" || video.category === category
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (filteredVideos.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No videos found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredVideos.map((video) => (
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
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
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

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>by {video.creator}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>

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
      </div>
    </div>
  )
}
