"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  Star,
  Play,
  Heart,
  Share2,
  Award,
  Target,
  Gift,
  CheckCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";

const contestData = [
  {
    id: "c1",
    title: "African Storytelling Contest 2024",
    description:
      "Share your authentic African stories and help preserve our rich cultural heritage. This contest celebrates the power of storytelling in connecting communities and passing down traditions.",
    longDescription:
      "Join us in celebrating the rich tapestry of African culture through the art of storytelling. This contest is designed to showcase authentic narratives that reflect the diverse experiences, traditions, and wisdom of African communities worldwide. Whether your story is rooted in ancient folklore, contemporary experiences, or family traditions, we want to hear your unique voice.",
    banner: "/contest-banner.jpg",
    thumbnail: "/img1.jpg",
    category: "Storytelling",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    totalPrizes: "$50,000",
    participants: 1247,
    maxParticipants: 2000,
    submissions: 892,
    timeLeft: "45 days",
    creator: "IsabiTV",
    duration: "4:45",
    views: "8.2K",
    likes: "1.9K",
    uploadDate: "2 days ago",
    prizes: [
      {
        place: "1st Place",
        amount: "$20,000",
        description: "Grand Prize Winner",
      },
      { place: "2nd Place", amount: "$15,000", description: "Runner-up" },
      { place: "3rd Place", amount: "$10,000", description: "Third Place" },
      {
        place: "People's Choice",
        amount: "$5,000",
        description: "Audience Favorite",
      },
    ],
    rules: [
      "Stories must be original and authentic",
      "Maximum duration: 10 minutes",
      "Must relate to African culture or heritage",
      "Submissions in English, French, or local African languages accepted",
      "One entry per participant",
      "Must be 18+ to participate",
    ],
    criteria: [
      "Authenticity and cultural relevance (30%)",
      "Storytelling technique and engagement (25%)",
      "Video/audio quality (20%)",
      "Creativity and originality (15%)",
      "Cultural impact and message (10%)",
    ],
    featured: true,
    tags: ["Culture", "Heritage", "Storytelling", "Community"],
  },
  {
    id: "c2",
    title: "Music & Dance Heritage Contest",
    description: "Showcase traditional African music and dance forms",
    longDescription:
      "Celebrate the rhythmic heartbeat of Africa through music and dance.",
    banner: "/contest-banner.jpg",
    thumbnail: "/img2.jpg",
    category: "Music",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    totalPrizes: "$25,000",
    participants: 856,
    maxParticipants: 1500,
    submissions: 432,
    timeLeft: "30 days",
    creator: "IsabiTV",
    duration: "3:20",
    views: "5.4K",
    likes: "1.2K",
    uploadDate: "1 week ago",
    prizes: [
      {
        place: "1st Place",
        amount: "$10,000",
        description: "Grand Prize Winner",
      },
      { place: "2nd Place", amount: "$7,500", description: "Runner-up" },
      { place: "3rd Place", amount: "$5,000", description: "Third Place" },
      {
        place: "People's Choice",
        amount: "$2,500",
        description: "Audience Favorite",
      },
    ],
    rules: [
      "Must feature traditional African music or dance",
      "Maximum duration: 8 minutes",
      "Original performances preferred",
      "Cultural context explanation required",
      "One entry per participant",
    ],
    criteria: [
      "Cultural authenticity (35%)",
      "Performance quality (30%)",
      "Technical execution (20%)",
      "Creativity (15%)",
    ],
    featured: false,
    tags: ["Music", "Dance", "Traditional", "Performance"],
  },
];

export default function ContestDetailPage() {
  const params = useParams();
  const videoId = params?.id as string;
  const [contest, setContest] = useState<any>(null);

  useEffect(() => {
    const found = contestData.find((c) => c.id === videoId);
    setContest(found);
  }, [videoId]);

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">
            Loading contest details...
          </p>
        </div>
      </div>
    );
  }

  const progressPercentage =
    (contest.participants / contest.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
        <Image
          src={contest.banner || "/placeholder.svg?height=400&width=800"}
          alt={contest.title}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative container mx-auto p-6 md:p-12 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {contest.category}
              </Badge>
              {contest.featured && (
                <Badge className="bg-accent text-black">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              {contest.title}
            </h1>
            <p className="text-xl mb-6 drop-shadow-lg max-w-2xl">
              {contest.description}
            </p>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span className="font-semibold">
                  {contest.totalPrizes} in Prizes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-semibold">
                  {contest.participants.toLocaleString()}+ Participants
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-semibold">Active Contest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto p-6 md:p-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview */}
            <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src={
                  contest.thumbnail || "/placeholder.svg?height=400&width=800"
                }
                alt={contest.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Contest Intro
                </Button>
              </div>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {contest.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {contest.likes}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {contest.uploadDate}
              </div>
            </div>

            {/* Contest Overview */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Contest Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {contest.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Contest Goals
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        Preserve African cultural heritage
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        Celebrate diverse storytelling traditions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        Connect global African communities
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        Support emerging storytellers
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Contest Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {contest.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-primary text-primary"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prizes */}
            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  Prize Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {contest.prizes.map((prize: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        index === 0
                          ? "border-accent bg-accent/10"
                          : "border-muted bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">{prize.place}</h4>
                        <Award
                          className={`w-5 h-5 ${
                            index === 0
                              ? "text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <p className="text-2xl font-bold text-primary mb-1">
                        {prize.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {prize.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rules & Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Rules & Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Contest Rules</h4>
                  <ul className="space-y-2">
                    {contest.rules.map((rule: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Judging Criteria
                  </h4>
                  <ul className="space-y-2">
                    {contest.criteria.map(
                      (criterion: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                          <span>{criterion}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participation Card */}
            <Card className="border-2 border-primary/20 ">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Join the Contest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-3xl font-bold text-primary">
                    {contest.totalPrizes}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Prize Pool
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Participants</span>
                    <span className="font-semibold">
                      {contest.participants.toLocaleString()} /{" "}
                      {contest.maxParticipants.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Submissions</span>
                    <span className="font-semibold">
                      {contest.submissions.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Time Left</span>
                    <span className="font-semibold text-secondary">
                      {contest.timeLeft}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Link href="/auth/signin">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                      size="lg"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Submit Your Entry
                    </Button>
                  </Link>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contest Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-semibold">Contest Started</p>
                      <p className="text-sm text-muted-foreground">
                        January 1, 2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-semibold">Submissions Open</p>
                      <p className="text-sm text-muted-foreground">
                        Now accepting entries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <div>
                      <p className="font-semibold">Judging Period</p>
                      <p className="text-sm text-muted-foreground">
                        December 1-15, 2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div>
                      <p className="font-semibold">Winners Announced</p>
                      <p className="text-sm text-muted-foreground">
                        December 31, 2024
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle>Contest Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Countries</span>
                  <span className="font-semibold">54</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Languages</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Age Range</span>
                  <span className="font-semibold">18-65</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Contests */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Other Active Contests
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contestData
              .filter((c) => c.id !== contest.id)
              .map((relatedContest) => (
                <Link
                  key={relatedContest.id}
                  href={`/library/contest-details/${relatedContest.id}`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={
                          relatedContest.thumbnail ||
                          "/placeholder.svg?height=200&width=300"
                        }
                        alt={relatedContest.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white">Active</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">
                        {relatedContest.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedContest.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary font-semibold">
                          {relatedContest.totalPrizes} Prize
                        </span>
                        <span className="text-muted-foreground">
                          {relatedContest.timeLeft} left
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        {/* Comments Section */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <p className="text-muted-foreground">
            (Comments functionality coming soon...)
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
