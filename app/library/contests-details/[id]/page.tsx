"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  Heart,
  Clock,
  Play,
  Star,
  Trophy,
  Users,
  Calendar,
  Award,
  CheckCircle,
  Timer,
  Target,
  Gift,
  Share2,
  Bookmark,
} from "lucide-react";

interface ContestDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  videoUrl?: string;
  creator: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  uploadDate: string;
  status: "ongoing" | "closed";
  deadline: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  rules: string[];
  judgingCriteria: string[];
  prizes: {
    position: string;
    amount: string;
    description: string;
  }[];
  timeline: {
    phase: string;
    date: string;
    status: "completed" | "current" | "upcoming";
  }[];
  tags: string[];
  requirements: string[];
}

const contestsData: { [key: string]: ContestDetails } = {
  c1: {
    id: "c1",
    title: "African Storytelling Contest 2024",
    description:
      "Share your authentic African stories through compelling video narratives",
    longDescription:
      "Join our premier storytelling contest celebrating the rich tapestry of African culture, traditions, and contemporary experiences. This contest aims to amplify diverse African voices and preserve our heritage through the power of visual storytelling.",
    thumbnail: "/img3.jpg",
    videoUrl: "/sample-video.mp4",
    creator: "IsabiTV",
    duration: "5:00 max",
    views: "15.2K",
    likes: "3.1K",
    category: "Storytelling",
    uploadDate: "1 week ago",
    status: "ongoing",
    deadline: "March 15, 2024",
    prizePool: "$10,000",
    participants: 847,
    maxParticipants: 1000,
    rules: [
      "Video must be original content created by the participant",
      "Maximum duration of 5 minutes",
      "Must focus on African culture, traditions, or contemporary stories",
      "High-quality video and audio required",
      "English or local language with subtitles accepted",
      "No copyrighted music without proper licensing",
    ],
    judgingCriteria: [
      "Storytelling quality and narrative structure (30%)",
      "Cultural authenticity and relevance (25%)",
      "Video production quality (20%)",
      "Creativity and originality (15%)",
      "Audience engagement potential (10%)",
    ],
    prizes: [
      {
        position: "1st Place",
        amount: "$5,000",
        description: "Grand Prize + Featured on IsabiTV homepage",
      },
      {
        position: "2nd Place",
        amount: "$3,000",
        description: "Runner-up Prize + Creator spotlight",
      },
      {
        position: "3rd Place",
        amount: "$2,000",
        description: "Third Place Prize + Social media feature",
      },
    ],
    timeline: [
      {
        phase: "Contest Launch",
        date: "Feb 1, 2024",
        status: "completed",
      },
      {
        phase: "Submission Period",
        date: "Feb 1 - Mar 15, 2024",
        status: "current",
      },
      {
        phase: "Judging Phase",
        date: "Mar 16 - Mar 30, 2024",
        status: "upcoming",
      },
      {
        phase: "Winner Announcement",
        date: "Apr 1, 2024",
        status: "upcoming",
      },
    ],
    tags: [
      "Storytelling",
      "African Culture",
      "Heritage",
      "Documentary",
      "Short Film",
    ],
    requirements: [
      "Must be 18+ or have parental consent",
      "Original content only",
      "HD video quality (1080p minimum)",
      "Clear audio throughout",
    ],
  },
  c2: {
    id: "c2",
    title: "Music & Dance Heritage Contest",
    description:
      "Showcase traditional and contemporary African music and dance",
    longDescription:
      "Celebrate the rhythmic soul of Africa through music and dance. This contest invites creators to showcase traditional dances, contemporary interpretations, and musical performances that represent the diverse cultural heritage of the African continent.",
    thumbnail: "/img2.jpg",
    creator: "IsabiTV",
    duration: "4:00 max",
    views: "12.8K",
    likes: "2.7K",
    category: "Music & Dance",
    uploadDate: "3 days ago",
    status: "ongoing",
    deadline: "April 20, 2024",
    prizePool: "$8,000",
    participants: 623,
    maxParticipants: 800,
    rules: [
      "Performance must include African music or dance elements",
      "Maximum duration of 4 minutes",
      "Solo or group performances accepted",
      "Traditional or contemporary styles welcome",
      "Original choreography preferred",
      "Proper attire and cultural respect required",
    ],
    judgingCriteria: [
      "Technical skill and execution (35%)",
      "Cultural authenticity (25%)",
      "Creativity and choreography (20%)",
      "Stage presence and performance (20%)",
    ],
    prizes: [
      {
        position: "1st Place",
        amount: "$4,000",
        description: "Grand Prize + Performance opportunity",
      },
      {
        position: "2nd Place",
        amount: "$2,500",
        description: "Runner-up Prize + Music collaboration",
      },
      {
        position: "3rd Place",
        amount: "$1,500",
        description: "Third Place Prize + Featured playlist",
      },
    ],
    timeline: [
      {
        phase: "Contest Launch",
        date: "Mar 1, 2024",
        status: "completed",
      },
      {
        phase: "Submission Period",
        date: "Mar 1 - Apr 20, 2024",
        status: "current",
      },
      {
        phase: "Public Voting",
        date: "Apr 21 - Apr 30, 2024",
        status: "upcoming",
      },
      {
        phase: "Winner Announcement",
        date: "May 5, 2024",
        status: "upcoming",
      },
    ],
    tags: ["Music", "Dance", "Traditional", "Contemporary", "Performance"],
    requirements: [
      "Performance rights for music used",
      "Appropriate cultural representation",
      "Good lighting and camera angles",
      "Clear audio quality",
    ],
  },
};

export default function ContestDetailsPage() {
  const params = useParams();
  const [contest, setContest] = useState<ContestDetails | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const contestId = params.id as string;
    const contestData = contestsData[contestId];
    if (contestData) {
      setContest(contestData);
    }
  }, [params.id]);

  if (!contest) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Contest Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The contest you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/library/contests">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Back to Contests
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const participationProgress =
    (contest.participants / contest.maxParticipants) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {contest.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {contest.title}
            </h1>
            <p className="text-xl mb-8 text-white/90">{contest.description}</p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span>{contest.prizePool} Prize Pool</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{contest.participants} Participants</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Ends {contest.deadline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={contest.thumbnail || "/placeholder.svg"}
                    alt={contest.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full bg-white/90 text-black hover:bg-white"
                    >
                      <Play className="h-6 w-6 mr-2 fill-current" />
                      Watch Sample
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contest Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Contest Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {contest.longDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {contest.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-green-100 text-green-700 border-green-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prizes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  Prize Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {contest.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        index === 0
                          ? "border-yellow-400 bg-yellow-50"
                          : index === 1
                          ? "border-gray-400 bg-gray-50"
                          : "border-orange-400 bg-orange-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Award
                            className={`h-6 w-6 ${
                              index === 0
                                ? "text-yellow-600"
                                : index === 1
                                ? "text-gray-600"
                                : "text-orange-600"
                            }`}
                          />
                          <div>
                            <h3 className="font-semibold">{prize.position}</h3>
                            <p className="text-sm text-muted-foreground">
                              {prize.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {prize.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules & Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Rules & Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Contest Rules</h3>
                  <ul className="space-y-2">
                    {contest.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Judging Criteria</h3>
                  <ul className="space-y-2">
                    {contest.judgingCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-green-600" />
                  Contest Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contest.timeline.map((phase, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          phase.status === "completed"
                            ? "bg-green-600 border-green-600"
                            : phase.status === "current"
                            ? "bg-yellow-400 border-yellow-400"
                            : "bg-gray-200 border-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <span className="text-sm text-muted-foreground">
                            {phase.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participation Card */}
            <Card className=" top-24">
              <CardHeader>
                <CardTitle className="text-center">Join the Contest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={contest.status === "closed"}
                >
                  {contest.status === "ongoing"
                    ? "Submit Entry"
                    : "Contest Closed"}
                </Button>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span>
                      {contest.participants}/{contest.maxParticipants}
                    </span>
                  </div>
                  <Progress value={participationProgress} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={
                        contest.status === "ongoing" ? "default" : "secondary"
                      }
                      className={
                        contest.status === "ongoing"
                          ? "bg-green-600 text-white"
                          : ""
                      }
                    >
                      {contest.status === "ongoing" ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span>{contest.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Prize Pool</span>
                    <span className="font-semibold text-green-600">
                      {contest.prizePool}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Max Duration</span>
                    <span>{contest.duration}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark
                      className={`h-4 w-4 mr-1 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Contest Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Views</span>
                  </div>
                  <span className="font-medium">{contest.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Likes</span>
                  </div>
                  <span className="font-medium">{contest.likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Entries</span>
                  </div>
                  <span className="font-medium">{contest.participants}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created</span>
                  </div>
                  <span className="font-medium">{contest.uploadDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {contest.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
