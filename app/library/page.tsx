"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VideoGrid } from "@/components/video-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const categories = [
  "All",
  "Afrobeats",
  "Nollywood",
  "Comedy",
  "Fashion & Style",
  "Food & Culture",
  "Dance",
  "Spoken Word",
  "Documentary",
];

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black">
            Explore African Creativity
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover original content from Black creators across the globe. From
            music to storytelling — find your next inspiration.
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search creators, topics or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-12 bg-transparent text-black"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
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
                content
                {searchQuery && (
                  <>
                    {" "}
                    matching{" "}
                    <span className="font-medium">"{searchQuery}"</span>
                  </>
                )}
              </span>
            )}
            {selectedCategory === "All" && searchQuery && (
              <span>
                Search results for{" "}
                <span className="font-medium">"{searchQuery}"</span>
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
