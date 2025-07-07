"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Trophy,
  Crown,
  Medal,
  Award,
  Star,
  CheckCircle,
  Send,
  Play,
} from "lucide-react";

interface ContestEntry {
  id: string;
  contestId: string;
  contestTitle: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
    username: string;
    verified: boolean;
    avatar: string;
  };
  judgeScore: number;
  views: number;
  likes: number;
  comments: number;
  submissionDate: string;
  thumbnail: string;
  duration: string;
}

interface Contest {
  id: string;
  title: string;
  status: "active" | "judging" | "completed";
  endDate: string;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  totalEntries: number;
  winners?: {
    first?: string;
    second?: string;
    third?: string;
  };
}

const mockContests: Contest[] = [
  {
    id: "1",
    title: "Black History Educational Content",
    status: "judging",
    endDate: "2024-02-15",
    prizes: {
      first: "$1000 + Featured Placement",
      second: "$500 + Channel Promotion",
      third: "$250 + Badge",
    },
    totalEntries: 45,
  },
  {
    id: "2",
    title: "Young Entrepreneurs Showcase",
    status: "completed",
    endDate: "2024-01-30",
    prizes: {
      first: "$2000 + Mentorship",
      second: "$1000 + Business Resources",
      third: "$500 + Networking Access",
    },
    totalEntries: 28,
    winners: {
      first: "1",
      second: "2",
      third: "3",
    },
  },
];

const mockEntries: ContestEntry[] = [
  {
    id: "1",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "Hidden Figures: The Untold Story of Katherine Johnson",
    description:
      "An educational deep-dive into the life and contributions of mathematician Katherine Johnson",
    creator: {
      id: "u1",
      name: "Marcus Johnson",
      username: "marcusj",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    judgeScore: 9.2,
    views: 15420,
    likes: 892,
    comments: 156,
    submissionDate: "2024-01-20",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:34",
  },
  {
    id: "2",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "The Harlem Renaissance: Art, Music, and Culture",
    description:
      "Exploring the cultural explosion of the Harlem Renaissance period",
    creator: {
      id: "u2",
      name: "Aisha Williams",
      username: "aishaw",
      verified: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    judgeScore: 8.8,
    views: 8930,
    likes: 445,
    comments: 89,
    submissionDate: "2024-01-22",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
  },
  {
    id: "3",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "Civil Rights Movement: Voices of Change",
    description: "Personal stories and testimonies from the Civil Rights era",
    creator: {
      id: "u3",
      name: "Jamal Davis",
      username: "jamald",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    judgeScore: 8.5,
    views: 12100,
    likes: 678,
    comments: 123,
    submissionDate: "2024-01-25",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:20",
  },
  {
    id: "4",
    contestId: "1",
    contestTitle: "Black History Educational Content",
    title: "African Kingdoms: The Untold History",
    description: "Exploring the rich history of ancient African civilizations",
    creator: {
      id: "u4",
      name: "Keisha Brown",
      username: "keishab",
      verified: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    judgeScore: 8.1,
    views: 9850,
    likes: 523,
    comments: 87,
    submissionDate: "2024-01-28",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "14:12",
  },
];

export default function WinnerSelection() {
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [selectedContest, setSelectedContest] = useState<string>("");
  const [selectedWinners, setSelectedWinners] = useState<{
    first?: string;
    second?: string;
    third?: string;
  }>({});
  const [announcement, setAnnouncement] = useState("");

  const selectedContestData = contests.find((c) => c.id === selectedContest);
  const contestEntries = mockEntries
    .filter((entry) => entry.contestId === selectedContest)
    .sort((a, b) => b.judgeScore - a.judgeScore);

  const handleWinnerSelection = (
    position: "first" | "second" | "third",
    entryId: string
  ) => {
    setSelectedWinners((prev) => ({
      ...prev,
      [position]: entryId,
    }));
  };

  const handlePublishResults = () => {
    if (!selectedContest || !selectedWinners.first) {
      toast({
        title: "Error",
        description: "Please select at least a first place winner.",
        variant: "destructive",
      });
      return;
    }

    setContests(
      contests.map((contest) =>
        contest.id === selectedContest
          ? {
              ...contest,
              status: "completed" as const,
              winners: selectedWinners,
            }
          : contest
      )
    );

    toast({
      title: "Winners announced!",
      description: "Contest results have been published and winners notified.",
    });

    // Reset form
    setSelectedContest("");
    setSelectedWinners({});
    setAnnouncement("");
  };

  const getPositionIcon = (position: "first" | "second" | "third") => {
    switch (position) {
      case "first":
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case "second":
        return <Medal className="h-5 w-5 text-gray-400" />;
      case "third":
        return <Award className="h-5 w-5 text-amber-600" />;
    }
  };

  const getPositionColor = (position: "first" | "second" | "third") => {
    switch (position) {
      case "first":
        return "bg-yellow-50 border-yellow-200";
      case "second":
        return "bg-gray-50 border-gray-200";
      case "third":
        return "bg-amber-50 border-amber-200";
    }
  };

  return (
    <AdminGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Winner Selection
              </h1>
              <p className="text-gray-600">
                Select and announce contest winners
              </p>
            </div>
          </div>

          {/* Contest Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Contest</CardTitle>
              <CardDescription>
                Choose a contest to select winners for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedContest}
                onValueChange={setSelectedContest}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a contest" />
                </SelectTrigger>
                <SelectContent>
                  {contests
                    .filter(
                      (contest) =>
                        contest.status === "judging" ||
                        contest.status === "completed"
                    )
                    .map((contest) => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.title} - {contest.status}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedContestData && (
            <>
              {/* Contest Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    {selectedContestData.title}
                  </CardTitle>
                  <CardDescription>
                    Contest ended on {selectedContestData.endDate} •{" "}
                    {selectedContestData.totalEntries} entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <p className="font-semibold">1st Place</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedContestData.prizes.first}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="font-semibold">2nd Place</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedContestData.prizes.second}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                      <p className="font-semibold">3rd Place</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedContestData.prizes.third}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Winner Selection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Entries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Entries (Ranked by Score)</CardTitle>
                    <CardDescription>
                      Select winners from the highest-scoring entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contestEntries.slice(0, 10).map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`p-4 border rounded-lg ${
                          Object.values(selectedWinners).includes(entry.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="relative w-24 h-16 bg-gray-200 rounded overflow-hidden">
                              <img
                                src={entry.thumbnail || "/placeholder.svg"}
                                alt={entry.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <Play className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-sm">
                                  {entry.title}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  by {entry.creator.name}
                                  {entry.creator.verified && (
                                    <CheckCircle className="inline h-3 w-3 text-blue-500 ml-1" />
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Star className="h-3 w-3" />
                                    {entry.judgeScore}/10
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    #{index + 1} ranked
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant={
                              selectedWinners.first === entry.id
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleWinnerSelection("first", entry.id)
                            }
                          >
                            <Crown className="h-3 w-3 mr-1" />
                            1st
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              selectedWinners.second === entry.id
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleWinnerSelection("second", entry.id)
                            }
                          >
                            <Medal className="h-3 w-3 mr-1" />
                            2nd
                          </Button>
                          <Button
                            size="sm"
                            variant={
                              selectedWinners.third === entry.id
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleWinnerSelection("third", entry.id)
                            }
                          >
                            <Award className="h-3 w-3 mr-1" />
                            3rd
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Selected Winners */}
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Winners</CardTitle>
                    <CardDescription>
                      Review your winner selections
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(["first", "second", "third"] as const).map((position) => {
                      const winnerId = selectedWinners[position];
                      const winner = winnerId
                        ? contestEntries.find((e) => e.id === winnerId)
                        : null;

                      return (
                        <div
                          key={position}
                          className={`p-4 border rounded-lg ${getPositionColor(
                            position
                          )}`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {getPositionIcon(position)}
                            <h4 className="font-semibold capitalize">
                              {position} Place
                            </h4>
                          </div>
                          {winner ? (
                            <div className="flex gap-3">
                              <img
                                src={winner.thumbnail || "/placeholder.svg"}
                                alt={winner.title}
                                className="w-16 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-sm">
                                  {winner.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  by {winner.creator.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    <Star className="h-3 w-3" />
                                    {winner.judgeScore}/10
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No winner selected
                            </p>
                          )}
                        </div>
                      );
                    })}

                    {/* Announcement */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">
                        Winner Announcement
                      </label>
                      <Textarea
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        placeholder="Write a congratulatory message for the winners..."
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={handlePublishResults}
                      disabled={!selectedWinners.first}
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Publish Results & Notify Winners
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Winners (if completed) */}
              {selectedContestData.status === "completed" &&
                selectedContestData.winners && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contest Results</CardTitle>
                      <CardDescription>
                        This contest has been completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(["first", "second", "third"] as const).map(
                          (position) => {
                            const winnerId =
                              selectedContestData.winners?.[position];
                            const winner = winnerId
                              ? contestEntries.find((e) => e.id === winnerId)
                              : null;

                            return (
                              <div
                                key={position}
                                className={`p-4 border rounded-lg ${getPositionColor(
                                  position
                                )}`}
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  {getPositionIcon(position)}
                                  <h4 className="font-semibold capitalize">
                                    {position} Place
                                  </h4>
                                </div>
                                {winner ? (
                                  <div className="flex gap-3">
                                    <img
                                      src={
                                        winner.thumbnail || "/placeholder.svg"
                                      }
                                      alt={winner.title}
                                      className="w-16 h-12 object-cover rounded"
                                    />
                                    <div>
                                      <p className="font-medium text-sm">
                                        {winner.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        by {winner.creator.name}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                          variant="outline"
                                          className="flex items-center gap-1"
                                        >
                                          <Star className="h-3 w-3" />
                                          {winner.judgeScore}/10
                                        </Badge>
                                        <Badge variant="default">Winner</Badge>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">
                                    No winner selected
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </>
          )}

          {!selectedContest && (
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Contest</h3>
                <p className="text-muted-foreground">
                  Choose a contest from the dropdown above to start selecting
                  winners.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
