"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Eye, Heart, Upload, Trophy, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider-safe";

// Mock data for user's videos
const userVideos = [
  {
    id: "1",
    title: "My Amazing Sunset Timelapse",
    thumbnail: "/placeholder.svg",
    views: "1.2K",
    likes: "89",
    status: "Published",
    uploadDate: "2 days ago",
  },
  {
    id: "2",
    title: "Cooking Tutorial: Homemade Pizza",
    thumbnail: "/placeholder.svg",
    views: "3.5K",
    likes: "234",
    status: "Published",
    uploadDate: "1 week ago",
  },
  {
    id: "3",
    title: "Contest Entry: Best Short Film",
    thumbnail: "/placeholder.svg",
    views: "856",
    likes: "67",
    status: "In Contest",
    uploadDate: "3 days ago",
  },
];

const contestEntries = [
  {
    id: "3",
    title: "Contest Entry: Best Short Film",
    contestName: "December Short Film Contest",
    status: "Submitted",
    ranking: "Top 10",
    thumbnail: "/placeholder.svg",
  },
];

export default function DashboardPage() {
  const { user, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      isLoaded &&
      (!user || (user.role !== "creator" && user.role !== "admin"))
    ) {
      router.push("/auth/signin");
    }
  }, [user, isLoaded, router]);

  // Show loading while auth state is being determined
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authorized, don't render anything (redirect will happen)
  if (!user || (user.role !== "creator" && user.role !== "admin")) {
    return null;
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="p-4 md:p-10 mt-[100px] max-w-full">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your videos, track performance, and view contest entries
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-10">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Total Videos</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.6K</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">390</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Contest Entries</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <TabsList>
              <TabsTrigger value="videos">My Videos</TabsTrigger>
              <TabsTrigger value="contests">Contest Entries</TabsTrigger>
            </TabsList>
            <Button asChild>
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Video
              </Link>
            </Button>
          </div>

          {/* ✅ Responsive Video Section */}
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>My Videos</CardTitle>
                <CardDescription>
                  Manage and track the performance of your uploaded videos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col md:flex-row gap-4 rounded-lg border p-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-full md:w-[120px] shrink-0">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={120}
                        height={80}
                        className="w-full h-auto rounded object-cover"
                      />
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-lg">{video.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{video.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{video.likes} likes</span>
                        </div>
                        <span>Uploaded {video.uploadDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col items-start md:items-end gap-2">
                      <Badge
                        variant={
                          video.status === "Published" ? "default" : "secondary"
                        }
                      >
                        {video.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contest Entries */}
          <TabsContent value="contests">
            <Card>
              <CardHeader>
                <CardTitle>Contest Entries</CardTitle>
                <CardDescription>
                  Track your contest submissions and rankings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contestEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col md:flex-row items-center gap-4 rounded-lg border p-4"
                  >
                    <Image
                      src={entry.thumbnail || "/placeholder.svg"}
                      alt={entry.title}
                      width={120}
                      height={80}
                      className="rounded object-cover w-full md:w-[120px] h-auto"
                    />
                    <div className="flex-1 space-y-1 text-center md:text-left">
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {entry.contestName}
                      </p>
                      <div className="flex justify-center md:justify-start gap-2">
                        <Badge variant="outline">{entry.status}</Badge>
                        <Badge variant="secondary">{entry.ranking}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/library/contests/current`}>
                        View Contest
                      </Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
