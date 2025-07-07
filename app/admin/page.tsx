"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
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
} from "lucide-react"

// Mock data for demonstration
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
  },
]

const mockVideos = [
  {
    id: "1",
    title: "Black History: Untold Stories",
    creator: "Marcus Johnson",
    status: "published",
    views: 15420,
    duration: "12:34",
    uploadDate: "2024-01-20",
    flags: 0,
    category: "Education",
  },
  {
    id: "2",
    title: "Cooking with Grandma's Recipes",
    creator: "Aisha Williams",
    status: "under_review",
    views: 8930,
    duration: "18:45",
    uploadDate: "2024-01-22",
    flags: 2,
    category: "Lifestyle",
  },
  {
    id: "3",
    title: "Youth Entrepreneurship Tips",
    creator: "Marcus Johnson",
    status: "published",
    views: 22100,
    duration: "15:20",
    uploadDate: "2024-01-25",
    flags: 0,
    category: "Business",
  },
]

const mockReports = [
  {
    id: "1",
    videoId: "2",
    videoTitle: "Cooking with Grandma's Recipes",
    reporter: "Anonymous",
    reason: "Inappropriate content",
    description: "Contains content that may not align with family-friendly guidelines",
    status: "pending",
    reportDate: "2024-01-23",
    severity: "medium",
  },
  {
    id: "2",
    videoId: "1",
    videoTitle: "Black History: Untold Stories",
    reporter: "User123",
    reason: "Copyright violation",
    description: "Uses copyrighted music without permission",
    status: "resolved",
    reportDate: "2024-01-21",
    severity: "low",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: "Action completed",
      description: `User ${action} successfully.`,
    })
  }

  const handleVideoAction = (videoId: string, action: string) => {
    toast({
      title: "Action completed",
      description: `Video ${action} successfully.`,
    })
  }

  const handleReportAction = (reportId: string, action: string) => {
    toast({
      title: "Report updated",
      description: `Report has been ${action}.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your iSabiTV platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,421</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-15% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-muted-foreground">Marcus Johnson joined the platform</p>
                        </div>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Video uploaded</p>
                          <p className="text-xs text-muted-foreground">
                            "Black History: Untold Stories" by Marcus Johnson
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">5 min ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Content reported</p>
                          <p className="text-xs text-muted-foreground">Video flagged for review</p>
                        </div>
                        <span className="text-xs text-muted-foreground">10 min ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">User suspended</p>
                          <p className="text-xs text-muted-foreground">
                            Account temporarily suspended for policy violation
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">15 min ago</span>
                      </div>
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
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Review Pending Users
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Flag className="h-4 w-4 mr-2" />
                    Review Reported Content
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Platform Announcement
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Analytics Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Platform Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>System status and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1.2s</div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">2.1TB</div>
                    <p className="text-sm text-muted-foreground">Storage Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
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
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <div className="border rounded-lg">
                  <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div>User</div>
                    <div>Status</div>
                    <div>Role</div>
                    <div>Videos</div>
                    <div>Subscribers</div>
                    <div>Join Date</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  {mockUsers.map((user) => (
                    <div key={user.id}>
                      <div className="grid grid-cols-7 gap-4 p-4 items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-green-700">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">@{user.username}</p>
                            </div>
                            {user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
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
                        </div>
                        <div>
                          <Badge variant="outline">{user.role}</Badge>
                        </div>
                        <div className="text-sm">{user.videos}</div>
                        <div className="text-sm">{user.subscribers.toLocaleString()}</div>
                        <div className="text-sm">{user.joinDate}</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "viewed")}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "edited")}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUserAction(user.id, user.status === "active" ? "suspended" : "activated")
                            }
                          >
                            {user.status === "active" ? <Ban className="h-3 w-3" /> : <UserCheck className="h-3 w-3" />}
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

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Review and moderate platform content</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Content Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search videos..." className="pl-10" />
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
                </div>

                {/* Videos Table */}
                <div className="border rounded-lg">
                  <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div>Video</div>
                    <div>Creator</div>
                    <div>Status</div>
                    <div>Views</div>
                    <div>Duration</div>
                    <div>Upload Date</div>
                    <div>Actions</div>
                  </div>
                  <Separator />
                  {mockVideos.map((video) => (
                    <div key={video.id}>
                      <div className="grid grid-cols-7 gap-4 p-4 items-center">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                              <Play className="h-3 w-3" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{video.title}</p>
                              <p className="text-xs text-muted-foreground">{video.category}</p>
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
                            <Badge variant="destructive" className="ml-2">
                              {video.flags} flags
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm">{video.views.toLocaleString()}</div>
                        <div className="text-sm">{video.duration}</div>
                        <div className="text-sm">{video.uploadDate}</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleVideoAction(video.id, "viewed")}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleVideoAction(video.id, "approved")}>
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleVideoAction(video.id, "rejected")}>
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

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
                <CardDescription>Review and resolve user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
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
                              <Badge variant={report.status === "pending" ? "secondary" : "default"}>
                                {report.status}
                              </Badge>
                            </div>
                            <h4 className="font-medium">{report.videoTitle}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Reported by {report.reporter} • {report.reportDate}
                            </p>
                            <p className="text-sm mb-2">
                              <strong>Reason:</strong> {report.reason}
                            </p>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleReportAction(report.id, "viewed")}>
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportAction(report.id, "approved")}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportAction(report.id, "dismissed")}
                            >
                              <XCircle className="h-3 w-3" />
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mr-2" />
                    Chart placeholder - User growth over time
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Engagement</CardTitle>
                  <CardDescription>Video views and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <BarChart3 className="h-8 w-8 mr-2" />
                    Chart placeholder - Content engagement metrics
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Detailed platform metrics and KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">89.2%</div>
                    <p className="text-sm text-muted-foreground">User Retention</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.7</div>
                    <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12.3%</div>
                    <p className="text-sm text-muted-foreground">Content Violation Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">96.8%</div>
                    <p className="text-sm text-muted-foreground">User Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Content Auto-Approval</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve uploaded content</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Content Moderation */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                  <CardDescription>Configure content moderation rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="max-video-length">Max Video Length (minutes)</Label>
                    <Input id="max-video-length" type="number" defaultValue="30" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                    <Input id="max-file-size" type="number" defaultValue="500" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="allowed-formats">Allowed Video Formats</Label>
                    <Input id="allowed-formats" defaultValue="mp4, mov, avi" className="mt-1" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Strict Content Filter</Label>
                      <p className="text-sm text-muted-foreground">Enable strict content filtering</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Announcement System */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Announcements</CardTitle>
                <CardDescription>Send announcements to all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="announcement-title">Announcement Title</Label>
                  <Input id="announcement-title" placeholder="Enter announcement title" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="announcement-message">Message</Label>
                  <Textarea
                    id="announcement-message"
                    placeholder="Enter your announcement message..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-announcement" />
                    <Label htmlFor="email-announcement">Send via Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-announcement" />
                    <Label htmlFor="push-announcement">Send Push Notification</Label>
                  </div>
                </div>
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
