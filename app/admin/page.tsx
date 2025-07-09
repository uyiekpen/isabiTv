"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  Users,
  Video,
  Flag,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Search,
  Download,
  Mail,
  Bell,
  DollarSign,
  TrendingUp,
  UserCheck,
  Play,
  Ban,
  Trash2,
  Plus,
  Filter,
  Calendar,
  Award,
  Shield,
  AlertTriangle,
  Clock,
  MessageSquare,
  Upload,
  Star,
  Activity,
  Database,
  Zap,
  Globe,
  Lock,
  RefreshCw,
  FileText,
  PieChart,
  BarChart,
  LineChart,
} from "lucide-react";

// Enhanced mock data with more realistic information
const mockUsers = [
  {
    id: "1",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    username: "marcusj",
    status: "active",
    role: "creator",
    joinDate: "2024-01-15",
    videos: 12,
    subscribers: 1250,
    verified: true,
    lastActive: "2 hours ago",
    totalViews: 45000,
    earnings: 1250.5,
    location: "Atlanta, GA",
    accountType: "premium",
  },
  {
    id: "2",
    name: "Aisha Williams",
    email: "aisha@example.com",
    username: "aishaw",
    status: "suspended",
    role: "creator",
    joinDate: "2024-02-20",
    videos: 8,
    subscribers: 890,
    verified: false,
    lastActive: "1 week ago",
    totalViews: 23000,
    earnings: 450.25,
    location: "Chicago, IL",
    accountType: "basic",
    suspensionReason: "Community guidelines violation",
  },
  {
    id: "3",
    name: "Jamal Davis",
    email: "jamal@example.com",
    username: "jamald",
    status: "active",
    role: "viewer",
    joinDate: "2024-03-10",
    videos: 0,
    subscribers: 0,
    verified: true,
    lastActive: "30 minutes ago",
    totalViews: 0,
    earnings: 0,
    location: "Houston, TX",
    accountType: "basic",
  },
  {
    id: "4",
    name: "Keisha Brown",
    email: "keisha@example.com",
    username: "keishab",
    status: "pending",
    role: "creator",
    joinDate: "2024-01-28",
    videos: 3,
    subscribers: 156,
    verified: false,
    lastActive: "1 day ago",
    totalViews: 5600,
    earnings: 89.75,
    location: "Detroit, MI",
    accountType: "basic",
  },
];

const mockVideos = [
  {
    id: "1",
    title: "Black History: Untold Stories",
    creator: "Marcus Johnson",
    creatorId: "1",
    status: "published",
    views: 15420,
    duration: "12:34",
    uploadDate: "2024-01-20",
    flags: 0,
    category: "Education",
    likes: 892,
    comments: 156,
    shares: 45,
    thumbnail: "/img1.jpg",
    description:
      "An educational deep-dive into lesser-known figures in Black history",
    tags: ["history", "education", "culture"],
    monetized: true,
    revenue: 234.5,
    quality: "1080p",
    fileSize: "245 MB",
  },
  {
    id: "2",
    title: "Cooking with Grandma's Recipes",
    creator: "Aisha Williams",
    creatorId: "2",
    status: "under_review",
    views: 8930,
    duration: "18:45",
    uploadDate: "2024-01-22",
    flags: 2,
    category: "Lifestyle",
    likes: 445,
    comments: 89,
    shares: 23,
    thumbnail: "/img2.jpg",
    description:
      "Traditional soul food recipes passed down through generations",
    tags: ["cooking", "recipes", "family"],
    monetized: false,
    revenue: 0,
    quality: "720p",
    fileSize: "189 MB",
  },
  {
    id: "3",
    title: "Youth Entrepreneurship Tips",
    creator: "Marcus Johnson",
    creatorId: "1",
    status: "published",
    views: 22100,
    duration: "15:20",
    uploadDate: "2024-01-25",
    flags: 0,
    category: "Business",
    likes: 1205,
    comments: 234,
    shares: 67,
    thumbnail: "/img3.jpg",
    description:
      "Practical advice for young entrepreneurs starting their journey",
    tags: ["business", "entrepreneurship", "youth"],
    monetized: true,
    revenue: 445.75,
    quality: "1080p",
    fileSize: "312 MB",
  },
];

interface Report {
  id: string;
  videoId: string;
  videoTitle: string;
  reporter: string;
  reporterEmail: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  reportDate: string;
  severity: "low" | "medium" | "high";
  category: string;
  evidence: string[];
  moderatorAssigned: string | null;
  resolution?: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    videoId: "2",
    videoTitle: "Cooking with Grandma's Recipes",
    reporter: "Anonymous",
    reporterEmail: "user@example.com",
    reason: "Inappropriate content",
    description:
      "Contains content that may not align with family-friendly guidelines",
    status: "pending",
    reportDate: "2024-01-23",
    severity: "medium",
    category: "content_violation",
    evidence: [
      "Timestamp 2:34 - inappropriate language",
      "Timestamp 5:12 - suggestive content",
    ],
    moderatorAssigned: null,
  },
  {
    id: "2",
    videoId: "1",
    videoTitle: "Black History: Untold Stories",
    reporter: "User123",
    reporterEmail: "concerned@example.com",
    reason: "Copyright violation",
    description: "Uses copyrighted music without permission",
    status: "resolved",
    reportDate: "2024-01-21",
    severity: "low",
    category: "copyright",
    evidence: ["Background music from 1:20-3:45"],
    moderatorAssigned: "Admin User",
    resolution: "Creator provided license proof",
  },
];

const mockAnalytics = {
  totalUsers: 12847,
  totalVideos: 3421,
  totalViews: 2456789,
  totalRevenue: 45231.5,
  monthlyGrowth: {
    users: 12,
    videos: 8,
    views: 23,
    revenue: 15,
  },
  topCategories: [
    { name: "Education", count: 1245, percentage: 36 },
    { name: "Lifestyle", count: 892, percentage: 26 },
    { name: "Business", count: 678, percentage: 20 },
    { name: "Entertainment", count: 456, percentage: 13 },
    { name: "Technology", count: 150, percentage: 5 },
  ],
  recentActivity: [
    {
      type: "user_signup",
      message: "New user registered: Marcus Johnson",
      time: "2 min ago",
      icon: Users,
    },
    {
      type: "video_upload",
      message: "Video uploaded: 'Black History Stories'",
      time: "5 min ago",
      icon: Video,
    },
    {
      type: "content_report",
      message: "Content reported for review",
      time: "10 min ago",
      icon: Flag,
    },
    {
      type: "user_suspension",
      message: "User suspended: Policy violation",
      time: "15 min ago",
      icon: Ban,
    },
    {
      type: "contest_entry",
      message: "New contest entry submitted",
      time: "20 min ago",
      icon: Award,
    },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");
  const [users, setUsers] = useState(mockUsers);
  const [videos, setVideos] = useState(mockVideos);
  const [reports, setReports] = useState(mockReports);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [platformSettings, setPlatformSettings] = useState({
    userRegistration: true,
    contentAutoApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
    maxVideoLength: 30,
    maxFileSize: 500,
    allowedFormats: "mp4, mov, avi",
    strictContentFilter: true,
  });

  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [videoSearchTerm, setVideoSearchTerm] = useState("");
  const [reportSearchTerm, setReportSearchTerm] = useState("");

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setAnalytics((prev) => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 1000),
        recentActivity: [
          {
            type: "refresh",
            message: "Dashboard data refreshed",
            time: "now",
            icon: RefreshCw,
          },
          ...prev.recentActivity.slice(0, 4),
        ],
      }));
      setIsLoading(false);
      toast({
        title: "Dashboard refreshed",
        description: "All data has been updated successfully.",
      });
    }, 1000);
  };

  // Real-time data refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setAnalytics((prev) => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 100),
        recentActivity: [
          {
            type: "live_update",
            message: `${Math.floor(
              Math.random() * 50
            )} new views in the last minute`,
            time: "now",
            icon: Eye,
          },
          ...prev.recentActivity.slice(0, 4),
        ],
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Enhanced user management functions
  const handleUserAction = async (userId: string, action: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                status:
                  action === "suspend"
                    ? "suspended"
                    : action === "activate"
                    ? "active"
                    : user.status,
                verified: action === "verify" ? true : user.verified,
              }
            : user
        )
      );

      toast({
        title: "Action completed",
        description: `User ${action} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced video management functions
  const handleVideoAction = async (videoId: string, action: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId
            ? {
                ...video,
                status:
                  action === "approve"
                    ? "published"
                    : action === "reject"
                    ? "rejected"
                    : video.status,
              }
            : video
        )
      );

      toast({
        title: "Video updated",
        description: `Video ${action} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced report management
  const handleReportAction = async (
    reportId: string,
    action: "resolved" | "dismissed",
    resolution = ""
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: action,
                resolution: resolution || report.resolution,
                moderatorAssigned: "Current Admin",
              }
            : report
        )
      );

      toast({
        title: "Report updated",
        description: `Report has been ${action}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Platform settings update
  const handleSettingsUpdate = async (setting: string, value: string | number | boolean) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPlatformSettings((prev) => ({
        ...prev,
        [setting]: value,
      }));

      toast({
        title: "Settings updated",
        description: `${setting} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk actions
  const handleBulkAction = async (items: string | any[], action: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Bulk action completed",
        description: `${action} applied to ${items.length} items.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Bulk action failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Export data function
  const handleExportData = async (dataType: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate file download
      const data =
        dataType === "users" ? users : dataType === "videos" ? videos : reports;
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${dataType}_export_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export completed",
        description: `${dataType} data exported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Send announcement function
  const handleSendAnnouncement = async (title: string, message: string, channels: any[]) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Announcement sent",
        description: `Announcement "${title}" sent via ${channels.join(", ")}.`,
      });
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Announcement could not be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your iSabiTV platform</p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                System Status: Online
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {analytics.totalUsers.toLocaleString()} Active Users
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportData("analytics")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+
                {analytics.monthlyGrowth.users}% from last month
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Videos
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.totalVideos.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+
                {analytics.monthlyGrowth.videos}% from last month
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+
                {analytics.monthlyGrowth.views}% from last month
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${analytics.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+
                {analytics.monthlyGrowth.revenue}% from last month
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Enhanced Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Real-time Activity Feed */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Real-time Activity</CardTitle>
                    <CardDescription>
                      Live platform activities and updates
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {analytics.recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <activity.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("users")}
                  >
                    <UserCheck className="h-4 w-4 mr-2" />
                    Review Pending Users (
                    {users.filter((u) => u.status === "pending").length})
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("reports")}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Review Reports (
                    {reports.filter((r) => r.status === "pending").length})
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("content")}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Moderate Content (
                    {videos.filter((v) => v.status === "under_review").length})
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full justify-start bg-transparent"
                        variant="outline"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Announcement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send Platform Announcement</DialogTitle>
                        <DialogDescription>
                          Send a message to all platform users
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="announcement-title">Title</Label>
                          <Input
                            id="announcement-title"
                            placeholder="Announcement title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="announcement-message">Message</Label>
                          <Textarea
                            id="announcement-message"
                            placeholder="Your announcement message..."
                            rows={4}
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="email-notification" />
                            <Label htmlFor="email-notification">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="push-notification" />
                            <Label htmlFor="push-notification">Push</Label>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            handleSendAnnouncement("Test", "Test message", [
                              "email",
                            ])
                          }
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          Send Announcement
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => handleExportData("analytics")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>
                    Platform performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Server Uptime</span>
                    <Badge variant="outline" className="text-green-600">
                      99.9%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <Badge variant="outline">1.2s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Used</span>
                    <Badge variant="outline">2.1TB / 5TB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bandwidth</span>
                    <Badge variant="outline">45.2 GB/day</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                  <CardDescription>
                    Content breakdown by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2DA105] transition-all duration-300"
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {category.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>
                    System notifications and warnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          High Storage Usage
                        </p>
                        <p className="text-xs text-gray-500">
                          Storage is 85% full
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-50">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Security Update</p>
                        <p className="text-xs text-gray-500">
                          System updated successfully
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Backup Complete</p>
                        <p className="text-xs text-gray-500">
                          Daily backup finished
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage platform users and their permissions
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportData("users")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Enhanced Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name, email, or username..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Enhanced Users Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div>User</div>
                    <div>Status</div>
                    <div>Role</div>
                    <div>Content</div>
                    <div>Engagement</div>
                    <div>Earnings</div>
                    <div>Last Active</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  {users
                    .filter(
                      (user) =>
                        (filterStatus === "all" ||
                          user.status === filterStatus) &&
                        (userSearchTerm === "" ||
                          user.name
                            .toLowerCase()
                            .includes(userSearchTerm.toLowerCase()) ||
                          user.email
                            .toLowerCase()
                            .includes(userSearchTerm.toLowerCase()) ||
                          user.username
                            .toLowerCase()
                            .includes(userSearchTerm.toLowerCase()))
                    )
                    .map((user) => (
                      <div key={user.id}>
                        <div className="grid grid-cols-8 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#2DA105]/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-[#2DA105]">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  @{user.username}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {user.location}
                                </p>
                              </div>
                              {user.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "suspended"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                            {user.accountType === "premium" && (
                              <Badge variant="outline" className="ml-1 text-xs">
                                Premium
                              </Badge>
                            )}
                          </div>
                          <div>
                            <Badge variant="outline">{user.role}</Badge>
                          </div>
                          <div className="text-sm">
                            <div>{user.videos} videos</div>
                            <div className="text-xs text-muted-foreground">
                              {user.totalViews.toLocaleString()} views
                            </div>
                          </div>
                          <div className="text-sm">
                            <div>{user.subscribers.toLocaleString()} subs</div>
                            <div className="text-xs text-muted-foreground">
                              Joined {user.joinDate}
                            </div>
                          </div>
                          <div className="text-sm">
                            <div>${user.earnings.toFixed(2)}</div>
                          </div>
                          <div className="text-sm">{user.lastActive}</div>
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    User Details: {user.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete user information and activity
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Basic Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Email:</strong> {user.email}
                                      </div>
                                      <div>
                                        <strong>Username:</strong> @
                                        {user.username}
                                      </div>
                                      <div>
                                        <strong>Location:</strong>{" "}
                                        {user.location}
                                      </div>
                                      <div>
                                        <strong>Account Type:</strong>{" "}
                                        {user.accountType}
                                      </div>
                                      <div>
                                        <strong>Verified:</strong>{" "}
                                        {user.verified ? "Yes" : "No"}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Activity Stats
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Videos:</strong> {user.videos}
                                      </div>
                                      <div>
                                        <strong>Total Views:</strong>{" "}
                                        {user.totalViews.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Subscribers:</strong>{" "}
                                        {user.subscribers.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Earnings:</strong> $
                                        {user.earnings.toFixed(2)}
                                      </div>
                                      <div>
                                        <strong>Last Active:</strong>{" "}
                                        {user.lastActive}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {user.suspensionReason && (
                                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-medium text-red-800">
                                      Suspension Reason
                                    </h4>
                                    <p className="text-sm text-red-700">
                                      {user.suspensionReason}
                                    </p>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUserAction(
                                  user.id,
                                  user.status === "active"
                                    ? "suspend"
                                    : "activate"
                                )
                              }
                              disabled={isLoading}
                            >
                              {user.status === "active" ? (
                                <Ban className="h-3 w-3" />
                              ) : (
                                <UserCheck className="h-3 w-3" />
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete User Account
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete {user.name}'s account and
                                    all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleUserAction(user.id, "delete")
                                    }
                                  >
                                    Delete Account
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>
                    Review and moderate platform content
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportData("videos")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Content Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search videos by title, creator, or description..."
                      value={videoSearchTerm}
                      onChange={(e) => setVideoSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Videos</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced Videos Table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div>Video</div>
                    <div>Creator</div>
                    <div>Status</div>
                    <div>Performance</div>
                    <div>Engagement</div>
                    <div>Revenue</div>
                    <div>Upload Date</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  {videos
                    .filter(
                      (video) =>
                        videoSearchTerm === "" ||
                        video.title
                          .toLowerCase()
                          .includes(videoSearchTerm.toLowerCase()) ||
                        video.creator
                          .toLowerCase()
                          .includes(videoSearchTerm.toLowerCase()) ||
                        video.description
                          .toLowerCase()
                          .includes(videoSearchTerm.toLowerCase())
                    )
                    .map((video) => (
                      <div key={video.id}>
                        <div className="grid grid-cols-8 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                                <img
                                  src={video.thumbnail || "/placeholder.svg"}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-sm line-clamp-2">
                                  {video.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {video.category}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {video.duration} • {video.quality}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">{video.creator}</div>
                          <div>
                            <Badge
                              variant={
                                video.status === "published"
                                  ? "default"
                                  : video.status === "under_review"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {video.status.replace("_", " ")}
                            </Badge>
                            {video.flags > 0 && (
                              <Badge
                                variant="destructive"
                                className="ml-1 text-xs"
                              >
                                {video.flags} flags
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm">
                            <div>{video.views.toLocaleString()} views</div>
                            <div className="text-xs text-muted-foreground">
                              {video.fileSize}
                            </div>
                          </div>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400" />
                              {video.likes.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {video.comments.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-sm">
                            <div>${video.revenue.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">
                              {video.monetized ? "Monetized" : "Not monetized"}
                            </div>
                          </div>
                          <div className="text-sm">{video.uploadDate}</div>
                          <div className="flex items-center gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Video Details: {video.title}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete video information and moderation
                                    tools
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <div className="aspect-video bg-gray-200 rounded-lg mb-4">
                                      <img
                                        src={
                                          video.thumbnail || "/placeholder.svg"
                                        }
                                        alt={video.title}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Description:</strong>{" "}
                                        {video.description}
                                      </div>
                                      <div>
                                        <strong>Tags:</strong>{" "}
                                        {video.tags.join(", ")}
                                      </div>
                                      <div>
                                        <strong>File Size:</strong>{" "}
                                        {video.fileSize}
                                      </div>
                                      <div>
                                        <strong>Quality:</strong>{" "}
                                        {video.quality}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Performance Metrics
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Views:</strong>{" "}
                                        {video.views.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Likes:</strong>{" "}
                                        {video.likes.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Comments:</strong>{" "}
                                        {video.comments.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Shares:</strong>{" "}
                                        {video.shares.toLocaleString()}
                                      </div>
                                      <div>
                                        <strong>Revenue:</strong> $
                                        {video.revenue.toFixed(2)}
                                      </div>
                                      <div>
                                        <strong>Monetized:</strong>{" "}
                                        {video.monetized ? "Yes" : "No"}
                                      </div>
                                    </div>
                                  </div>

                                  <h4 className="font-medium mb-2 mt-4">
                                    Moderation Actions
                                  </h4>
                                  <div className="space-y-2">
                                    <Button
                                      size="sm"
                                      className="w-full"
                                      onClick={() =>
                                        handleVideoAction(video.id, "approve")
                                      }
                                      disabled={isLoading}
                                    >
                                      <CheckCircle className="h-3 w-3 mr-2" />
                                      Approve Video
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="w-full"
                                      onClick={() =>
                                        handleVideoAction(video.id, "reject")
                                      }
                                      disabled={isLoading}
                                    >
                                      <XCircle className="h-3 w-3 mr-2" />
                                      Reject Video
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full bg-transparent"
                                    >
                                      <Flag className="h-3 w-3 mr-2" />
                                      Flag for Review
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleVideoAction(video.id, "approve")
                              }
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleVideoAction(video.id, "reject")
                              }
                              disabled={isLoading}
                            >
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
                <CardDescription>
                  Review and resolve user reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card
                      key={report.id}
                      className={
                        report.severity === "high" ? "border-red-200" : ""
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={
                                  report.severity === "high"
                                    ? "destructive"
                                    : report.severity === "medium"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {report.severity} priority
                              </Badge>
                              <Badge
                                variant={
                                  report.status === "pending"
                                    ? "secondary"
                                    : "default"
                                }
                              >
                                {report.status}
                              </Badge>
                              <Badge variant="outline">{report.category}</Badge>
                            </div>
                            <h4 className="font-medium text-lg">
                              {report.videoTitle}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Reported by {report.reporter} (
                              {report.reporterEmail}) • {report.reportDate}
                            </p>
                            <p className="text-sm mb-2">
                              <strong>Reason:</strong> {report.reason}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {report.description}
                            </p>

                            {report.evidence && report.evidence.length > 0 && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                                <p className="text-sm font-medium text-amber-800 mb-2">
                                  Evidence:
                                </p>
                                <ul className="text-sm text-amber-700 space-y-1">
                                  {report.evidence.map((evidence, index) => (
                                    <li key={index}>• {evidence}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {report.resolution && (
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-green-800">
                                  Resolution:
                                </p>
                                <p className="text-sm text-green-700">
                                  {report.resolution}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  Resolved by: {report.moderatorAssigned}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleReportAction(
                                  report.id,
                                  "resolved",
                                  "Report reviewed and resolved"
                                )
                              }
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-3 w-3 mr-2" />
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleReportAction(
                                  report.id,
                                  "dismissed",
                                  "Report dismissed after review"
                                )
                              }
                              disabled={isLoading}
                            >
                              <XCircle className="h-3 w-3 mr-2" />
                              Dismiss
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-2" />
                              View Content
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    User Growth Trends
                  </CardTitle>
                  <CardDescription>
                    Monthly user registration and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">User Growth Chart</p>
                      <p className="text-sm">
                        Interactive chart showing user growth over time
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-2xl font-bold text-[#2DA105]">
                            +{analytics.monthlyGrowth.users}%
                          </div>
                          <div>Monthly Growth</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            89.2%
                          </div>
                          <div>Retention Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            4.7min
                          </div>
                          <div>Avg Session</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Content Performance
                  </CardTitle>
                  <CardDescription>
                    Video views and engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">
                        Content Engagement Chart
                      </p>
                      <p className="text-sm">
                        Views, likes, comments, and shares analysis
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-2xl font-bold text-[#2DA105]">
                            {analytics.totalViews.toLocaleString()}
                          </div>
                          <div>Total Views</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            12.3%
                          </div>
                          <div>Engagement Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            96.8%
                          </div>
                          <div>Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Content Categories
                  </CardTitle>
                  <CardDescription>
                    Distribution of content by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                            }}
                          />
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {category.count}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {category.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>
                    Platform monetization metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="text-lg font-bold">
                        ${analytics.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Creator Earnings
                      </span>
                      <span className="text-sm font-medium">$32,162</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Platform Revenue
                      </span>
                      <span className="text-sm font-medium">$13,069</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg. RPM</span>
                      <span className="text-sm font-medium">$1.84</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Monetized Videos
                      </span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>
                    System performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Uptime</span>
                      <Badge variant="outline" className="text-green-600">
                        99.9%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Avg Response Time
                      </span>
                      <Badge variant="outline">1.2s</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Used</span>
                      <Badge variant="outline">2.1TB / 5TB</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Active Sessions
                      </span>
                      <Badge variant="outline">1,247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Error Rate</span>
                      <Badge variant="outline" className="text-green-600">
                        0.02%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Contests Tab */}
          <TabsContent value="contests" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contest Management</CardTitle>
                  <CardDescription>
                    Create and manage platform contests
                  </CardDescription>
                </div>
                <Button asChild>
                  <a href="/admin/contests">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Contest
                  </a>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Contests
                      </CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        2 ending this week
                      </p>
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
                      <div className="text-2xl font-bold">127</div>
                      <p className="text-xs text-muted-foreground">
                        +23 this week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Prize Pool
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$15,000</div>
                      <p className="text-xs text-muted-foreground">
                        Across all contests
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              African Storytelling Contest 2024
                            </h3>
                            <Badge variant="default">Active</Badge>
                            <Badge variant="outline">Education</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Share stories that celebrate African culture,
                            history, and heritage through engaging video
                            content.
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Feb 1 - Feb 29, 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>$5,000 Prize Pool</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>67 entries</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>15 days left</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Award className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              Music & Dance Heritage Contest
                            </h3>
                            <Badge variant="secondary">Draft</Badge>
                            <Badge variant="outline">Arts</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Showcase traditional and contemporary African music
                            and dance forms in creative video presentations.
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Mar 1 - Mar 31, 2024</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>$3,000 Prize Pool</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>0 entries</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Not started</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() => setActiveTab("contests")}
                            asChild
                          >
                            <a href="/admin/contests">
                              <Play className="h-3 w-3 mr-1" />
                              Launch
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription>
                    Configure platform-wide settings and features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        User Registration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <Switch
                      checked={platformSettings.userRegistration}
                      onCheckedChange={(checked) =>
                        handleSettingsUpdate("userRegistration", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Content Auto-Approval
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve uploaded content
                      </p>
                    </div>
                    <Switch
                      checked={platformSettings.contentAutoApproval}
                      onCheckedChange={(checked) =>
                        handleSettingsUpdate("contentAutoApproval", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications to users
                      </p>
                    </div>
                    <Switch
                      checked={platformSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingsUpdate("emailNotifications", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Maintenance Mode
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode for updates
                      </p>
                    </div>
                    <Switch
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        handleSettingsUpdate("maintenanceMode", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Strict Content Filter
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable enhanced content filtering
                      </p>
                    </div>
                    <Switch
                      checked={platformSettings.strictContentFilter}
                      onCheckedChange={(checked) =>
                        handleSettingsUpdate("strictContentFilter", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Moderation Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Content Moderation
                  </CardTitle>
                  <CardDescription>
                    Configure content moderation rules and limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="max-video-length">
                      Max Video Length (minutes)
                    </Label>
                    <Input
                      id="max-video-length"
                      type="number"
                      value={platformSettings.maxVideoLength}
                      onChange={(e) =>
                        handleSettingsUpdate(
                          "maxVideoLength",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                    <Input
                      id="max-file-size"
                      type="number"
                      value={platformSettings.maxFileSize}
                      onChange={(e) =>
                        handleSettingsUpdate(
                          "maxFileSize",
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowed-formats">
                      Allowed Video Formats
                    </Label>
                    <Input
                      id="allowed-formats"
                      value={platformSettings.allowedFormats}
                      onChange={(e) =>
                        handleSettingsUpdate("allowedFormats", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content Review Queue</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Auto-assign reviewers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-assign</SelectItem>
                        <SelectItem value="manual">
                          Manual assignment
                        </SelectItem>
                        <SelectItem value="ai">AI-assisted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Update Moderation Rules
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Administration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  System Administration
                </CardTitle>
                <CardDescription>
                  Advanced system management and maintenance tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Database Management</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Database className="h-4 w-4 mr-2" />
                        Backup Database
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Optimize Tables
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Logs
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Cache Management</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Rebuild Index
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        Performance Report
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Security</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Security Scan
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Update Firewall
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        View Threats
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
