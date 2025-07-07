"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { AdminGuard } from "./admin-middleware";
import {
  Play,
  Eye,
  CheckCircle,
  XCircle,
  Flag,
  Star,
  Search,
  Video,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

interface ContestEntry {
  id: string;
  contestId: string;
  contestTitle: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  creator: {
    id: string;
    name: string;
    username: string;
    verified: boolean;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected" | "flagged";
  submissionDate: string;
  views: number;
  likes: number;
  comments: number;
  judgeScore?: number;
  judgeNotes?: string;
  moderatorNotes?: string;
  category: string;
  duration: string;
  tags: string[];
}

const mockEntries: ContestEntry[] = [
  {
    id: "1",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "Hidden Figures: The Untold Story of Katherine Johnson",
    description:
      "An educational deep-dive into the life and contributions of mathematician Katherine Johnson",
    videoUrl: "/videos/entry1.mp4",
    thumbnail: "/placeholder.svg?height=180&width=320",
    creator: {
      id: "u1",
      name: "Marcus Johnson",
      username: "marcusj",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "approved",
    submissionDate: "2024-01-20",
    views: 15420,
    likes: 892,
    comments: 156,
    judgeScore: 8.5,
    judgeNotes: "Excellent research and presentation. Very engaging content.",
    category: "Education",
    duration: "12:34",
    tags: ["history", "mathematics", "women", "nasa"],
  },
  {
    id: "2",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "The Harlem Renaissance: Art, Music, and Culture",
    description:
      "Exploring the cultural explosion of the Harlem Renaissance period",
    videoUrl: "/videos/entry2.mp4",
    thumbnail: "/placeholder.svg?height=180&width=320",
    creator: {
      id: "u2",
      name: "Aisha Williams",
      username: "aishaw",
      verified: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "pending",
    submissionDate: "2024-01-22",
    views: 8930,
    likes: 445,
    comments: 89,
    category: "Education",
    duration: "18:45",
    tags: ["culture", "art", "music", "harlem"],
  },
  {
    id: "3",
    contestId: "2",
    contestTitle: "Young Entrepreneurs Showcase",
    title: "From Idea to Empire: My Tech Startup Journey",
    description:
      "Sharing my journey from college dropout to successful tech entrepreneur",
    videoUrl: "/videos/entry3.mp4",
    thumbnail: "/placeholder.svg?height=180&width=320",
    creator: {
      id: "u3",
      name: "Jamal Davis",
      username: "jamald",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "flagged",
    submissionDate: "2024-01-25",
    views: 22100,
    likes: 1205,
    comments: 234,
    moderatorNotes: "Flagged for potential promotional content. Needs review.",
    category: "Business",
    duration: "15:20",
    tags: ["entrepreneurship", "tech", "startup", "business"],
  },
];

export default function EntryManagement() {
  const [entries, setEntries] = useState<ContestEntry[]>(mockEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterContest, setFilterContest] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<ContestEntry | null>(null);
  const [judgeScore, setJudgeScore] = useState("");
  const [judgeNotes, setJudgeNotes] = useState("");

  const handleStatusChange = (
    entryId: string,
    newStatus: ContestEntry["status"],
    notes?: string
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              status: newStatus,
              moderatorNotes: notes || entry.moderatorNotes,
              judgeScore: judgeScore
                ? Number.parseFloat(judgeScore)
                : entry.judgeScore,
              judgeNotes: judgeNotes || entry.judgeNotes,
            }
          : entry
      )
    );

    setSelectedEntry(null);
    setJudgeScore("");
    setJudgeNotes("");

    toast({
      title: "Entry updated",
      description: `Entry has been ${newStatus}.`,
    });
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || entry.status === filterStatus;
    const matchesContest =
      filterContest === "all" || entry.contestId === filterContest;
    return matchesSearch && matchesStatus && matchesContest;
  });

  const getStatusColor = (status: ContestEntry["status"]) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "flagged":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const uniqueContests = Array.from(
    new Set(entries.map((entry) => entry.contestTitle))
  );

  return (
    <AdminGuard requiredRole="moderator">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Entry Management
              </h1>
              <p className="text-gray-600">Review and manage contest entries</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Entries
                </CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{entries.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Review
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {entries.filter((e) => e.status === "pending").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {entries.filter((e) => e.status === "approved").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flagged</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {entries.filter((e) => e.status === "flagged").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterContest} onValueChange={setFilterContest}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by contest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contests</SelectItem>
                    {uniqueContests.map((contest) => (
                      <SelectItem key={contest} value={contest}>
                        {contest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Video Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="relative w-48 h-28 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={entry.thumbnail || "/placeholder.svg"}
                          alt={entry.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {entry.duration}
                        </div>
                      </div>
                    </div>

                    {/* Entry Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.contestTitle}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={getStatusColor(entry.status)}>
                              {entry.status}
                            </Badge>
                            <Badge variant="outline">{entry.category}</Badge>
                            {entry.judgeScore && (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Star className="h-3 w-3" />
                                {entry.judgeScore}/10
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm">{entry.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <img
                            src={entry.creator.avatar || "/placeholder.svg"}
                            alt={entry.creator.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{entry.creator.name}</span>
                          {entry.creator.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {entry.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {entry.likes.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {entry.comments.toLocaleString()}
                        </div>
                        <span>Submitted: {entry.submissionDate}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {entry.judgeNotes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-800">
                            Judge Notes:
                          </p>
                          <p className="text-sm text-blue-700">
                            {entry.judgeNotes}
                          </p>
                        </div>
                      )}

                      {entry.moderatorNotes && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-amber-800">
                            Moderator Notes:
                          </p>
                          <p className="text-sm text-amber-700">
                            {entry.moderatorNotes}
                          </p>
                        </div>
                      )}

                      {selectedEntry?.id === entry.id && (
                        <div className="space-y-3 border-t pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">
                                Judge Score (1-10)
                              </label>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                step="0.1"
                                value={judgeScore}
                                onChange={(e) => setJudgeScore(e.target.value)}
                                placeholder="Enter score"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Judge Notes
                            </label>
                            <Textarea
                              value={judgeNotes}
                              onChange={(e) => setJudgeNotes(e.target.value)}
                              placeholder="Add judging notes..."
                              rows={3}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setSelectedEntry(
                            selectedEntry?.id === entry.id ? null : entry
                          )
                        }
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        {selectedEntry?.id === entry.id ? "Close" : "Review"}
                      </Button>

                      {selectedEntry?.id === entry.id && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusChange(entry.id, "approved")
                            }
                          >
                            <CheckCircle className="h-3 w-3 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleStatusChange(entry.id, "rejected")
                            }
                          >
                            <XCircle className="h-3 w-3 mr-2" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleStatusChange(
                                entry.id,
                                "flagged",
                                "Flagged for review"
                              )
                            }
                          >
                            <Flag className="h-3 w-3 mr-2" />
                            Flag
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No entries found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterStatus !== "all" ||
                  filterContest !== "all"
                    ? "Try adjusting your search or filters."
                    : "No contest entries have been submitted yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
