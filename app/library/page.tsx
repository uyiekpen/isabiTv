"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VideoGrid } from "@/components/video-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";

const categories = [
  "All",
  "Movies",
  "Contests",
  "Nature",
  "Cooking",
  "Technology",
  "Photography",
  "Music",
];

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black">
            Video Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing content from creators around the world. Browse by
            category or search for specific topics.
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search videos, creators, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-12 bg-transparent text-black">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              {/* <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none h-12 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none h-12 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div> */}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategory === category ? "default" : "secondary"
                }
                className={`cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-[#228201] hover:bg-[#1a6501]"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            {selectedCategory !== "All" && (
              <span>
                Showing <span className="font-medium">{selectedCategory}</span>{" "}
                videos
                {searchQuery && (
                  <span>
                    {" "}
                    matching "<span className="font-medium">{searchQuery}</span>
                    "
                  </span>
                )}
              </span>
            )}
            {selectedCategory === "All" && searchQuery && (
              <span>
                Search results for "
                <span className="font-medium">{searchQuery}</span>"
              </span>
            )}
            {selectedCategory === "All" && !searchQuery && (
              <span>Showing all videos</span>
            )}
          </p>
        </div>

        {/* Video Grid */}
        <VideoGrid category={selectedCategory} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}
