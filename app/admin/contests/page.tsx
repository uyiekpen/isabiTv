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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Plus,
  Calendar,
  DollarSign,
  Users,
  Video,
  Edit,
  Trash2,
  Eye,
  Award,
  Clock,
  Target,
  Star,
  Crown,
  Medal,
  Play,
  CheckCircle,
  XCircle,
  Flag,
  Search,
  Download,
  Send,
  Gift,
  Zap,
  TrendingUp,
} from "lucide-react";

interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  prizes: {
    first: string;
    second: string;
    third: string;
    participationReward?: string;
  };
  maxEntries: number;
  currentEntries: number;
  status: "draft" | "active" | "judging" | "completed" | "cancelled";
  rules: string[];
  eligibility: string;
  judgesCriteria: string[];
  createdAt: string;
  createdBy: string;
  tags: string[];
  featuredPrize: boolean;
  allowTeams: boolean;
  minVideoDuration: number;
  maxVideoDuration: number;
  requiredHashtags: string[];
  sponsorInfo?: {
    name: string;
    logo: string;
    website: string;
  };
}

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
    email: string;
  };
  status: "pending" | "approved" | "rejected" | "flagged" | "winner";
  submissionDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  judgeScore?: number;
  judgeNotes?: string;
  moderatorNotes?: string;
  category: string;
  duration: string;
  tags: string[];
  hashtags: string[];
  teamMembers?: string[];
  isTeamEntry: boolean;
}

const mockContests: Contest[] = [
  {
    id: "1",
    title: "African Heritage Storytelling Contest 2024",
    description:
      "Share powerful stories that celebrate African culture, history, and heritage through engaging video content that educates and inspires.",
    category: "Education",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    submissionDeadline: "2024-02-28",
    prizes: {
      first: "$2,000 + Featured Channel Placement",
      second: "$1,000 + Channel Promotion",
      third: "$500 + Creator Badge",
      participationReward: "Certificate of Participation",
    },
    maxEntries: 100,
    currentEntries: 67,
    status: "active",
    rules: [
      "Video must be 3-15 minutes long",
      "Content must be family-friendly and appropriate",
      "Original content only - no copyrighted material",
      "Must include educational or cultural value",
      "English or native language with subtitles",
      "Submit only one entry per creator",
    ],
    eligibility: "Open to all verified creators worldwide",
    judgesCriteria: [
      "Educational Value (25%)",
      "Production Quality (20%)",
      "Storytelling & Engagement (25%)",
      "Cultural Authenticity (20%)",
      "Creativity & Originality (10%)",
    ],
    createdAt: "2024-01-15",
    createdBy: "Admin User",
    tags: ["heritage", "culture", "education", "storytelling"],
    featuredPrize: true,
    allowTeams: false,
    minVideoDuration: 3,
    maxVideoDuration: 15,
    requiredHashtags: ["#AfricanHeritage2024", "#IsabiTVContest"],
    sponsorInfo: {
      name: "Cultural Heritage Foundation",
      logo: "/sponsor-logo.png",
      website: "https://culturalheritage.org",
    },
  },
  {
    id: "2",
    title: "Young Entrepreneurs Showcase",
    description:
      "Showcase inspiring stories of young Black entrepreneurs and share practical business advice for the next generation.",
    category: "Business",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    submissionDeadline: "2024-03-30",
    prizes: {
      first: "$1,500 + Business Mentorship Session",
      second: "$750 + Networking Access",
      third: "$350 + Business Resources Package",
    },
    maxEntries: 50,
    currentEntries: 23,
    status: "draft",
    rules: [
      "Video must be 5-20 minutes long",
      "Must feature real entrepreneurs or business advice",
      "Include actionable tips or insights",
      "Professional presentation required",
      "No promotional content for specific products",
    ],
    eligibility: "Creators with business-focused content",
    judgesCriteria: [
      "Inspiration Factor (30%)",
      "Practical Value (25%)",
      "Storytelling Quality (20%)",
      "Production Quality (15%)",
      "Impact Potential (10%)",
    ],
    createdAt: "2024-01-20",
    createdBy: "Admin User",
    tags: ["business", "entrepreneurship", "youth", "mentorship"],
    featuredPrize: false,
    allowTeams: true,
    minVideoDuration: 5,
    maxVideoDuration: 20,
    requiredHashtags: ["#YoungEntrepreneurs", "#BusinessStories"],
  },
];

const mockEntries: ContestEntry[] = [
  {
    id: "1",
    contestId: "1",
    contestTitle: "African Heritage Storytelling Contest 2024",
    title: "The Wisdom of Ancestral Proverbs: Lessons from Yoruba Culture",
    description:
      "An exploration of traditional Yoruba proverbs and their relevance in modern life, featuring interviews with elders and cultural experts.",
    videoUrl: "/videos/entry1.mp4",
    thumbnail: "/img1.jpg",
    creator: {
      id: "u1",
      name: "Adunni Okafor",
      username: "adunnio",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
      email: "adunni@example.com",
    },
    status: "approved",
    submissionDate: "2024-02-15",
    views: 8420,
    likes: 567,
    comments: 89,
    shares: 34,
    judgeScore: 8.7,
    judgeNotes:
      "Excellent cultural authenticity and educational value. Beautiful storytelling with great production quality.",
    category: "Education",
    duration: "12:34",
    tags: ["yoruba", "proverbs", "culture", "wisdom"],
    hashtags: ["#AfricanHeritage2024", "#IsabiTVContest", "#YorubaWisdom"],
    isTeamEntry: false,
  },
  {
    id: "2",
    contestId: "1",
    contestTitle: "African Heritage Storytelling Contest 2024",
    title: "From Kente to Runway: The Evolution of African Fashion",
    description:
      "A documentary-style video tracing the journey of traditional African textiles and their influence on contemporary fashion.",
    videoUrl: "/videos/entry2.mp4",
    thumbnail: "/img2.jpg",
    creator: {
      id: "u2",
      name: "Kwame Asante",
      username: "kwamea",
      verified: false,
      avatar: "/placeholder.svg?height=40&width=40",
      email: "kwame@example.com",
    },
    status: "pending",
    submissionDate: "2024-02-18",
    views: 3210,
    likes: 234,
    comments: 45,
    shares: 12,
    category: "Education",
    duration: "14:22",
    tags: ["fashion", "kente", "textiles", "design"],
    hashtags: ["#AfricanHeritage2024", "#IsabiTVContest", "#AfricanFashion"],
    isTeamEntry: true,
    teamMembers: ["Kwame Asante", "Ama Boateng", "Kofi Mensah"],
  },
  {
    id: "3",
    contestId: "1",
    contestTitle: "African Heritage Storytelling Contest 2024",
    title: "The Rhythms of Home: Traditional Music Across Africa",
    description:
      "A musical journey showcasing traditional instruments and songs from different African regions and their cultural significance.",
    videoUrl: "/videos/entry3.mp4",
    thumbnail: "/img3.jpg",
    creator: {
      id: "u3",
      name: "Fatima Diallo",
      username: "fatimad",
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
      email: "fatima@example.com",
    },
    status: "flagged",
    submissionDate: "2024-02-20",
    views: 5670,
    likes: 389,
    comments: 67,
    shares: 23,
    moderatorNotes:
      "Flagged for potential copyright issues with background music. Needs review.",
    category: "Education",
    duration: "11:45",
    tags: ["music", "instruments", "traditional", "culture"],
    hashtags: ["#AfricanHeritage2024", "#IsabiTVContest", "#AfricanMusic"],
    isTeamEntry: false,
  },
];

export default function ContestManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [contests, setContests] = useState<Contest[]>(mockContests);
  const [entries, setEntries] = useState<ContestEntry[]>(mockEntries);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [selectedContest, setSelectedContest] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Contest form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    submissionDeadline: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    participationReward: "",
    maxEntries: 100,
    rules: "",
    eligibility: "",
    judgesCriteria: "",
    tags: "",
    featuredPrize: false,
    allowTeams: false,
    minVideoDuration: 3,
    maxVideoDuration: 15,
    requiredHashtags: "",
    sponsorName: "",
    sponsorWebsite: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateContest = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newContest: Contest = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        submissionDeadline: formData.submissionDeadline,
        prizes: {
          first: formData.firstPrize,
          second: formData.secondPrize,
          third: formData.thirdPrize,
          participationReward: formData.participationReward || undefined,
        },
        maxEntries: formData.maxEntries,
        currentEntries: 0,
        status: "draft",
        rules: formData.rules.split("\n").filter((rule) => rule.trim()),
        eligibility: formData.eligibility,
        judgesCriteria: formData.judgesCriteria
          .split("\n")
          .filter((criteria) => criteria.trim()),
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: "Current Admin",
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        featuredPrize: formData.featuredPrize,
        allowTeams: formData.allowTeams,
        minVideoDuration: formData.minVideoDuration,
        maxVideoDuration: formData.maxVideoDuration,
        requiredHashtags: formData.requiredHashtags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        sponsorInfo: formData.sponsorName
          ? {
              name: formData.sponsorName,
              logo: "/sponsor-logo.png",
              website: formData.sponsorWebsite,
            }
          : undefined,
      };

      setContests((prev) => [...prev, newContest]);
      setShowCreateForm(false);
      resetForm();

      toast({
        title: "Contest created successfully!",
        description: `"${formData.title}" has been created and saved as draft.`,
      });
    } catch (error) {
      toast({
        title: "Error creating contest",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      startDate: "",
      endDate: "",
      submissionDeadline: "",
      firstPrize: "",
      secondPrize: "",
      thirdPrize: "",
      participationReward: "",
      maxEntries: 100,
      rules: "",
      eligibility: "",
      judgesCriteria: "",
      tags: "",
      featuredPrize: false,
      allowTeams: false,
      minVideoDuration: 3,
      maxVideoDuration: 15,
      requiredHashtags: "",
      sponsorName: "",
      sponsorWebsite: "",
    });
    setEditingContest(null);
  };

  const handleEditContest = (contest: Contest) => {
    setEditingContest(contest);
    setFormData({
      title: contest.title,
      description: contest.description,
      category: contest.category,
      startDate: contest.startDate,
      endDate: contest.endDate,
      submissionDeadline: contest.submissionDeadline,
      firstPrize: contest.prizes.first,
      secondPrize: contest.prizes.second,
      thirdPrize: contest.prizes.third,
      participationReward: contest.prizes.participationReward || "",
      maxEntries: contest.maxEntries,
      rules: contest.rules.join("\n"),
      eligibility: contest.eligibility,
      judgesCriteria: contest.judgesCriteria.join("\n"),
      tags: contest.tags.join(", "),
      featuredPrize: contest.featuredPrize,
      allowTeams: contest.allowTeams,
      minVideoDuration: contest.minVideoDuration,
      maxVideoDuration: contest.maxVideoDuration,
      requiredHashtags: contest.requiredHashtags.join(", "),
      sponsorName: contest.sponsorInfo?.name || "",
      sponsorWebsite: contest.sponsorInfo?.website || "",
    });
    setShowCreateForm(true);
  };

  const handleDeleteContest = async (contestId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setContests((prev) => prev.filter((contest) => contest.id !== contestId));
      toast({
        title: "Contest deleted",
        description: "Contest has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Error deleting contest",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLaunchContest = async (contestId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setContests((prev) =>
        prev.map((contest) =>
          contest.id === contestId
            ? { ...contest, status: "active" as const }
            : contest
        )
      );
      toast({
        title: "Contest launched!",
        description: "Contest is now live and accepting submissions.",
      });
    } catch (error) {
      toast({
        title: "Error launching contest",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryAction = async (
    entryId: string,
    action: string,
    notes?: string
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === entryId
            ? {
                ...entry,
                status: action as ContestEntry["status"],
                moderatorNotes: notes || entry.moderatorNotes,
              }
            : entry
        )
      );

      toast({
        title: "Entry updated",
        description: `Entry has been ${action}.`,
      });
    } catch (error) {
      toast({
        title: "Error updating entry",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (
    status: Contest["status"] | ContestEntry["status"]
  ) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      case "judging":
        return "secondary";
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "flagged":
        return "destructive";
      case "winner":
        return "default";
      default:
        return "secondary";
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || entry.status === filterStatus;
    const matchesContest =
      selectedContest === "" || entry.contestId === selectedContest;
    return matchesSearch && matchesStatus && matchesContest;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contest Management
            </h1>
            <p className="text-gray-600">
              Create, manage, and monitor platform contests
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Contests
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contests.length}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +2 this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Contests
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contests.filter((c) => c.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Entries
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contests.reduce(
                  (sum, contest) => sum + contest.currentEntries,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +15 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,500+</div>
              <p className="text-xs text-muted-foreground">
                Across all contests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="entries">Entries</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contest Performance</CardTitle>
                  <CardDescription>
                    Analytics and engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Participation Rate
                      </span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Average Entries per Contest
                      </span>
                      <span className="text-sm font-bold">45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Creator Satisfaction
                      </span>
                      <span className="text-sm font-bold">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Completion Rate
                      </span>
                      <span className="text-sm font-bold">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest contest updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">
                          New entry submitted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          African Heritage Contest • 2 min ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Contest launched</p>
                        <p className="text-xs text-muted-foreground">
                          Young Entrepreneurs Showcase • 1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">
                          Entry flagged for review
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Music & Culture Contest • 3 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Winners announced</p>
                        <p className="text-xs text-muted-foreground">
                          Tech Innovation Contest • 1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contest Categories Performance</CardTitle>
                <CardDescription>Engagement by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      Education
                    </div>
                    <div className="text-sm text-muted-foreground">
                      67 entries • 89% completion
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      Business
                    </div>
                    <div className="text-sm text-muted-foreground">
                      23 entries • 78% completion
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      Arts & Culture
                    </div>
                    <div className="text-sm text-muted-foreground">
                      34 entries • 92% completion
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Contests</CardTitle>
                  <CardDescription>
                    Manage existing contests and create new ones
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contests.map((contest) => (
                    <Card key={contest.id} className="relative">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">
                                {contest.title}
                              </h3>
                              <Badge variant={getStatusColor(contest.status)}>
                                {contest.status}
                              </Badge>
                              <Badge variant="outline">
                                {contest.category}
                              </Badge>
                              {contest.featuredPrize && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                                >
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>

                            <p className="text-muted-foreground mb-4 line-clamp-2">
                              {contest.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {contest.startDate} - {contest.endDate}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span>{contest.prizes.first}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {contest.currentEntries}/{contest.maxEntries}{" "}
                                  entries
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-muted-foreground" />
                                <span>{contest.eligibility}</span>
                              </div>
                            </div>

                            {contest.sponsorInfo && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Gift className="h-4 w-4" />
                                <span>
                                  Sponsored by {contest.sponsorInfo.name}
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1">
                              {contest.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>{contest.title}</DialogTitle>
                                  <DialogDescription>
                                    Contest details and information
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Contest Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Category:</strong>{" "}
                                        {contest.category}
                                      </div>
                                      <div>
                                        <strong>Duration:</strong>{" "}
                                        {contest.startDate} to {contest.endDate}
                                      </div>
                                      <div>
                                        <strong>Submission Deadline:</strong>{" "}
                                        {contest.submissionDeadline}
                                      </div>
                                      <div>
                                        <strong>Max Entries:</strong>{" "}
                                        {contest.maxEntries}
                                      </div>
                                      <div>
                                        <strong>Video Length:</strong>{" "}
                                        {contest.minVideoDuration}-
                                        {contest.maxVideoDuration} minutes
                                      </div>
                                      <div>
                                        <strong>Teams Allowed:</strong>{" "}
                                        {contest.allowTeams ? "Yes" : "No"}
                                      </div>
                                    </div>

                                    <h4 className="font-medium mb-2 mt-4">
                                      Prizes
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <div>
                                        <strong>1st Place:</strong>{" "}
                                        {contest.prizes.first}
                                      </div>
                                      <div>
                                        <strong>2nd Place:</strong>{" "}
                                        {contest.prizes.second}
                                      </div>
                                      <div>
                                        <strong>3rd Place:</strong>{" "}
                                        {contest.prizes.third}
                                      </div>
                                      {contest.prizes.participationReward && (
                                        <div>
                                          <strong>Participation:</strong>{" "}
                                          {contest.prizes.participationReward}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Rules & Criteria
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Rules:</strong>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                          {contest.rules.map((rule, index) => (
                                            <li key={index}>{rule}</li>
                                          ))}
                                        </ul>
                                      </div>

                                      <div>
                                        <strong>Judging Criteria:</strong>
                                        <ul className="list-disc list-inside mt-1 space-y-1">
                                          {contest.judgesCriteria.map(
                                            (criteria, index) => (
                                              <li key={index}>{criteria}</li>
                                            )
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <strong>Required Hashtags:</strong>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {contest.requiredHashtags.map(
                                            (hashtag, index) => (
                                              <Badge
                                                key={index}
                                                variant="outline"
                                                className="text-xs"
                                              >
                                                {hashtag}
                                              </Badge>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditContest(contest)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>

                            {contest.status === "draft" && (
                              <Button
                                size="sm"
                                onClick={() => handleLaunchContest(contest.id)}
                                disabled={isLoading}
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                Launch
                              </Button>
                            )}

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Contest
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the contest and all
                                    associated entries.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteContest(contest.id)
                                    }
                                  >
                                    Delete Contest
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entries Tab */}
          <TabsContent value="entries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contest Entries</CardTitle>
                <CardDescription>
                  Review and manage all contest submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entries by title or creator..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="winner">Winner</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedContest}
                    onValueChange={setSelectedContest}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by contest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Contests</SelectItem>
                      {contests.map((contest) => (
                        <SelectItem key={contest.id} value={contest.id}>
                          {contest.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                                  <Badge variant="outline">
                                    {entry.category}
                                  </Badge>
                                  {entry.isTeamEntry && (
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-50 text-blue-700"
                                    >
                                      <Users className="h-3 w-3 mr-1" />
                                      Team Entry
                                    </Badge>
                                  )}
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
                                  src={
                                    entry.creator.avatar || "/placeholder.svg"
                                  }
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
                                <Star className="h-4 w-4" />
                                {entry.likes.toLocaleString()}
                              </div>
                              <span>Submitted: {entry.submissionDate}</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {entry.hashtags.map((hashtag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {hashtag}
                                </Badge>
                              ))}
                            </div>

                            {entry.isTeamEntry && entry.teamMembers && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-blue-800">
                                  Team Members:
                                </p>
                                <p className="text-sm text-blue-700">
                                  {entry.teamMembers.join(", ")}
                                </p>
                              </div>
                            )}

                            {entry.judgeNotes && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-green-800">
                                  Judge Notes:
                                </p>
                                <p className="text-sm text-green-700">
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
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3 mr-2" />
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Review Entry: {entry.title}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete entry review and moderation
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                                      <img
                                        src={
                                          entry.thumbnail || "/placeholder.svg"
                                        }
                                        alt={entry.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Creator:</strong>{" "}
                                        {entry.creator.name} (
                                        {entry.creator.email})
                                      </div>
                                      <div>
                                        <strong>Duration:</strong>{" "}
                                        {entry.duration}
                                      </div>
                                      <div>
                                        <strong>Submission Date:</strong>{" "}
                                        {entry.submissionDate}
                                      </div>
                                      <div>
                                        <strong>Team Entry:</strong>{" "}
                                        {entry.isTeamEntry ? "Yes" : "No"}
                                      </div>
                                      {entry.teamMembers && (
                                        <div>
                                          <strong>Team Members:</strong>{" "}
                                          {entry.teamMembers.join(", ")}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Performance Metrics
                                    </h4>
                                    <div className="space-y-2 text-sm mb-4">
                                      <div>
                                        <strong>Views:</strong>{" "}
                                        {entry.views.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Likes:</strong>{" "}
                                        {entry.likes.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Comments:</strong>{" "}
                                        {entry.comments.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Shares:</strong>{" "}
                                        {entry.shares.toLocaleString()}
                                      </div>
                                    </div>

                                    <h4 className="font-medium mb-2">
                                      Moderation Actions
                                    </h4>
                                    <div className="space-y-2">
                                      <Button
                                        size="sm"
                                        className="w-full"
                                        onClick={() =>
                                          handleEntryAction(
                                            entry.id,
                                            "approved"
                                          )
                                        }
                                        disabled={isLoading}
                                      >
                                        <CheckCircle className="h-3 w-3 mr-2" />
                                        Approve Entry
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        className="w-full"
                                        onClick={() =>
                                          handleEntryAction(
                                            entry.id,
                                            "rejected",
                                            "Entry does not meet contest requirements"
                                          )
                                        }
                                        disabled={isLoading}
                                      >
                                        <XCircle className="h-3 w-3 mr-2" />
                                        Reject Entry
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full bg-transparent"
                                        onClick={() =>
                                          handleEntryAction(
                                            entry.id,
                                            "flagged",
                                            "Flagged for further review"
                                          )
                                        }
                                        disabled={isLoading}
                                      >
                                        <Flag className="h-3 w-3 mr-2" />
                                        Flag for Review
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button
                              size="sm"
                              onClick={() =>
                                handleEntryAction(entry.id, "approved")
                              }
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleEntryAction(entry.id, "rejected")
                              }
                              disabled={isLoading}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
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
                      <h3 className="text-lg font-semibold mb-2">
                        No entries found
                      </h3>
                      <p className="text-muted-foreground">
                        {searchTerm || filterStatus !== "all" || selectedContest
                          ? "Try adjusting your search or filters."
                          : "No contest entries have been submitted yet."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Winners Tab */}
          <TabsContent value="winners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Winner Selection</CardTitle>
                <CardDescription>
                  Select and announce contest winners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedContest}
                      onValueChange={setSelectedContest}
                    >
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select a contest to pick winners" />
                      </SelectTrigger>
                      <SelectContent>
                        {contests
                          .filter(
                            (c) =>
                              c.status === "active" || c.status === "judging"
                          )
                          .map((contest) => (
                            <SelectItem key={contest.id} value={contest.id}>
                              {contest.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedContest && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Top Entries */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Top Entries</CardTitle>
                          <CardDescription>
                            Highest scoring entries for winner selection
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {entries
                              .filter(
                                (entry) =>
                                  entry.contestId === selectedContest &&
                                  entry.status === "approved"
                              )
                              .sort(
                                (a, b) =>
                                  (b.judgeScore || 0) - (a.judgeScore || 0)
                              )
                              .slice(0, 10)
                              .map((entry, index) => (
                                <div
                                  key={entry.id}
                                  className="flex items-center gap-3 p-3 border rounded-lg"
                                >
                                  <div className="w-8 h-8 bg-[#2DA105]/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-[#2DA105]">
                                      #{index + 1}
                                    </span>
                                  </div>
                                  <img
                                    src={entry.thumbnail || "/placeholder.svg"}
                                    alt={entry.title}
                                    className="w-16 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">
                                      {entry.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      by {entry.creator.name}
                                    </p>
                                    {entry.judgeScore && (
                                      <div className="flex items-center gap-1 mt-1">
                                        <Star className="h-3 w-3 text-yellow-400" />
                                        <span className="text-xs">
                                          {entry.judgeScore}/10
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline">
                                      <Crown className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Medal className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Award className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Winner Selection */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Selected Winners</CardTitle>
                          <CardDescription>
                            Choose winners for each position
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Crown className="h-5 w-5 text-yellow-600" />
                                <h4 className="font-semibold">
                                  1st Place Winner
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Prize:{" "}
                                {
                                  contests.find((c) => c.id === selectedContest)
                                    ?.prizes.first
                                }
                              </p>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                Select 1st Place Winner
                              </Button>
                            </div>

                            <div className="p-4 border-2 border-gray-200 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Medal className="h-5 w-5 text-gray-600" />
                                <h4 className="font-semibold">
                                  2nd Place Winner
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Prize:{" "}
                                {
                                  contests.find((c) => c.id === selectedContest)
                                    ?.prizes.second
                                }
                              </p>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                Select 2nd Place Winner
                              </Button>
                            </div>

                            <div className="p-4 border-2 border-amber-200 bg-amber-50 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Award className="h-5 w-5 text-amber-600" />
                                <h4 className="font-semibold">
                                  3rd Place Winner
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Prize:{" "}
                                {
                                  contests.find((c) => c.id === selectedContest)
                                    ?.prizes.third
                                }
                              </p>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                Select 3rd Place Winner
                              </Button>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                              <Label>Winner Announcement Message</Label>
                              <Textarea
                                placeholder="Write a congratulatory message for the winners..."
                                rows={4}
                              />
                              <div className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                  <Switch id="email-winners" />
                                  <Label htmlFor="email-winners">
                                    Email Winners
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch id="public-announcement" />
                                  <Label htmlFor="public-announcement">
                                    Public Announcement
                                  </Label>
                                </div>
                              </div>
                              <Button className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Announce Winners
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {!selectedContest && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Select a Contest
                        </h3>
                        <p className="text-muted-foreground">
                          Choose a contest from the dropdown above to start
                          selecting winners.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Content Tab */}
          <TabsContent value="flagged" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Contest Entries</CardTitle>
                <CardDescription>
                  Review entries that have been flagged for content violations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries
                    .filter((entry) => entry.status === "flagged")
                    .map((entry) => (
                      <Card key={entry.id} className="border-red-200">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
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
                                <div className="absolute top-2 left-2">
                                  <Badge
                                    variant="destructive"
                                    className="flex items-center gap-1"
                                  >
                                    <Flag className="h-3 w-3" />
                                    Flagged
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {entry.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {entry.contestTitle}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="destructive">Flagged</Badge>
                                  <Badge variant="outline">
                                    {entry.category}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-sm">{entry.description}</p>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <img
                                    src={
                                      entry.creator.avatar || "/placeholder.svg"
                                    }
                                    alt={entry.creator.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span>{entry.creator.name}</span>
                                </div>
                                <span>Submitted: {entry.submissionDate}</span>
                              </div>

                              {entry.moderatorNotes && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                  <p className="text-sm font-medium text-red-800">
                                    Flag Reason:
                                  </p>
                                  <p className="text-sm text-red-700">
                                    {entry.moderatorNotes}
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-3 w-3 mr-2" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Review Flagged Entry: {entry.title}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Detailed review of flagged content
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                                        <img
                                          src={
                                            entry.thumbnail ||
                                            "/placeholder.svg"
                                          }
                                          alt={entry.title}
                                          className="w-full h-full object-cover rounded-lg"
                                        />
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div>
                                          <strong>Creator:</strong>{" "}
                                          {entry.creator.name}
                                        </div>
                                        <div>
                                          <strong>Email:</strong>{" "}
                                          {entry.creator.email}
                                        </div>
                                        <div>
                                          <strong>Contest:</strong>{" "}
                                          {entry.contestTitle}
                                        </div>
                                        <div>
                                          <strong>Submission Date:</strong>{" "}
                                          {entry.submissionDate}
                                        </div>
                                        <div>
                                          <strong>Duration:</strong>{" "}
                                          {entry.duration}
                                        </div>
                                        <div>
                                          <strong>Views:</strong>{" "}
                                          {entry.views.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Flag Details
                                      </h4>
                                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                        <p className="text-sm font-medium text-red-800">
                                          Reason for Flag:
                                        </p>
                                        <p className="text-sm text-red-700">
                                          {entry.moderatorNotes}
                                        </p>
                                      </div>

                                      <h4 className="font-medium mb-2">
                                        Resolution Actions
                                      </h4>
                                      <div className="space-y-2">
                                        <Button
                                          size="sm"
                                          className="w-full"
                                          onClick={() =>
                                            handleEntryAction(
                                              entry.id,
                                              "approved",
                                              "Reviewed and approved after flag resolution"
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          <CheckCircle className="h-3 w-3 mr-2" />
                                          Approve Entry
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          className="w-full"
                                          onClick={() =>
                                            handleEntryAction(
                                              entry.id,
                                              "rejected",
                                              "Entry rejected due to content violations"
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          <XCircle className="h-3 w-3 mr-2" />
                                          Reject Entry
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="w-full bg-transparent"
                                          onClick={() =>
                                            handleEntryAction(
                                              entry.id,
                                              "pending",
                                              "Requires additional review"
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          <Clock className="h-3 w-3 mr-2" />
                                          Request More Review
                                        </Button>
                                      </div>

                                      <div className="mt-4">
                                        <Label htmlFor="resolution-notes">
                                          Resolution Notes
                                        </Label>
                                        <Textarea
                                          id="resolution-notes"
                                          placeholder="Add notes about your decision..."
                                          rows={3}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Button
                                size="sm"
                                onClick={() =>
                                  handleEntryAction(
                                    entry.id,
                                    "approved",
                                    "Approved after review"
                                  )
                                }
                                disabled={isLoading}
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                  handleEntryAction(
                                    entry.id,
                                    "rejected",
                                    "Rejected due to violations"
                                  )
                                }
                                disabled={isLoading}
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {entries.filter((entry) => entry.status === "flagged")
                    .length === 0 && (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No Flagged Content
                        </h3>
                        <p className="text-muted-foreground">
                          Great! There are no contest entries currently flagged
                          for review.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contest Creation Form Modal */}
        {showCreateForm && (
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingContest ? "Edit Contest" : "Create New Contest"}
                </DialogTitle>
                <DialogDescription>
                  {editingContest
                    ? "Update contest details and settings"
                    : "Set up a new contest for creators to participate in"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Contest Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter contest title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Arts">Arts & Culture</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Health">
                          Health & Wellness
                        </SelectItem>
                        <SelectItem value="Entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="Sports">Sports & Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Contest Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe the contest theme, objectives, and what you're looking for in submissions"
                    rows={4}
                  />
                </div>

                {/* Dates and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="submissionDeadline">
                      Submission Deadline *
                    </Label>
                    <Input
                      id="submissionDeadline"
                      type="date"
                      value={formData.submissionDeadline}
                      onChange={(e) =>
                        handleInputChange("submissionDeadline", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Prizes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Prize Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstPrize">1st Place Prize *</Label>
                      <Input
                        id="firstPrize"
                        value={formData.firstPrize}
                        onChange={(e) =>
                          handleInputChange("firstPrize", e.target.value)
                        }
                        placeholder="e.g., $2,000 + Featured Placement"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondPrize">2nd Place Prize *</Label>
                      <Input
                        id="secondPrize"
                        value={formData.secondPrize}
                        onChange={(e) =>
                          handleInputChange("secondPrize", e.target.value)
                        }
                        placeholder="e.g., $1,000 + Channel Promotion"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="thirdPrize">3rd Place Prize *</Label>
                      <Input
                        id="thirdPrize"
                        value={formData.thirdPrize}
                        onChange={(e) =>
                          handleInputChange("thirdPrize", e.target.value)
                        }
                        placeholder="e.g., $500 + Creator Badge"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="participationReward">
                        Participation Reward (Optional)
                      </Label>
                      <Input
                        id="participationReward"
                        value={formData.participationReward}
                        onChange={(e) =>
                          handleInputChange(
                            "participationReward",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Certificate of Participation"
                      />
                    </div>
                  </div>
                </div>

                {/* Contest Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contest Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxEntries">Maximum Entries</Label>
                      <Input
                        id="maxEntries"
                        type="number"
                        value={formData.maxEntries}
                        onChange={(e) =>
                          handleInputChange(
                            "maxEntries",
                            Number.parseInt(e.target.value)
                          )
                        }
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minVideoDuration">
                        Min Video Duration (minutes)
                      </Label>
                      <Input
                        id="minVideoDuration"
                        type="number"
                        value={formData.minVideoDuration}
                        onChange={(e) =>
                          handleInputChange(
                            "minVideoDuration",
                            Number.parseInt(e.target.value)
                          )
                        }
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxVideoDuration">
                        Max Video Duration (minutes)
                      </Label>
                      <Input
                        id="maxVideoDuration"
                        type="number"
                        value={formData.maxVideoDuration}
                        onChange={(e) =>
                          handleInputChange(
                            "maxVideoDuration",
                            Number.parseInt(e.target.value)
                          )
                        }
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowTeams"
                          checked={formData.allowTeams}
                          onCheckedChange={(checked) =>
                            handleInputChange("allowTeams", checked)
                          }
                        />
                        <Label htmlFor="allowTeams">Allow Team Entries</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featuredPrize"
                          checked={formData.featuredPrize}
                          onCheckedChange={(checked) =>
                            handleInputChange("featuredPrize", checked)
                          }
                        />
                        <Label htmlFor="featuredPrize">
                          Featured Prize Contest
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules and Criteria */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rules">
                      Contest Rules (one per line) *
                    </Label>
                    <Textarea
                      id="rules"
                      value={formData.rules}
                      onChange={(e) =>
                        handleInputChange("rules", e.target.value)
                      }
                      placeholder="Video must be 3-15 minutes long&#10;Content must be family-friendly&#10;Original content only&#10;Must include educational value"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eligibility">
                      Eligibility Requirements *
                    </Label>
                    <Input
                      id="eligibility"
                      value={formData.eligibility}
                      onChange={(e) =>
                        handleInputChange("eligibility", e.target.value)
                      }
                      placeholder="e.g., Open to all verified creators worldwide"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="judgesCriteria">
                      Judging Criteria (one per line) *
                    </Label>
                    <Textarea
                      id="judgesCriteria"
                      value={formData.judgesCriteria}
                      onChange={(e) =>
                        handleInputChange("judgesCriteria", e.target.value)
                      }
                      placeholder="Educational Value (25%)&#10;Production Quality (20%)&#10;Engagement (25%)&#10;Originality (20%)&#10;Cultural Authenticity (10%)"
                      rows={5}
                    />
                  </div>
                </div>

                {/* Tags and Hashtags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Contest Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        handleInputChange("tags", e.target.value)
                      }
                      placeholder="heritage, culture, education, storytelling"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requiredHashtags">
                      Required Hashtags (comma-separated)
                    </Label>
                    <Input
                      id="requiredHashtags"
                      value={formData.requiredHashtags}
                      onChange={(e) =>
                        handleInputChange("requiredHashtags", e.target.value)
                      }
                      placeholder="#ContestName2024, #IsabiTVContest"
                    />
                  </div>
                </div>

                {/* Sponsor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Sponsor Information (Optional)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sponsorName">Sponsor Name</Label>
                      <Input
                        id="sponsorName"
                        value={formData.sponsorName}
                        onChange={(e) =>
                          handleInputChange("sponsorName", e.target.value)
                        }
                        placeholder="e.g., Cultural Heritage Foundation"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sponsorWebsite">Sponsor Website</Label>
                      <Input
                        id="sponsorWebsite"
                        value={formData.sponsorWebsite}
                        onChange={(e) =>
                          handleInputChange("sponsorWebsite", e.target.value)
                        }
                        placeholder="https://sponsor-website.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    onClick={
                      editingContest ? handleCreateContest : handleCreateContest
                    }
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        {editingContest ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        {editingContest ? "Update Contest" : "Create Contest"}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      resetForm();
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
