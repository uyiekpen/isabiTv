"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { AdminGuard } from "./admin-middleware"
import {
  Flag,
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  User,
  Clock,
  Search,
  Filter,
  Play,
  MessageSquare,
  Shield,
  Trash2,
} from "lucide-react"

interface FlaggedContent {
  id: string
  type: "video" | "comment" | "user"
  contentId: string
  title: string
  creator: {
    id: string
    name: string
    username: string
    verified: boolean
  }
  reporter: {
    id: string
    name: string
    username: string
  }
  reason: string
  category: "inappropriate" | "spam" | "harassment" | "copyright" | "violence" | "hate_speech" | "misinformation"
  description: string
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "reviewing" | "resolved" | "dismissed" | "escalated"
  reportDate: string
  reviewDate?: string
  moderatorNotes?: string
  actionTaken?: string
  evidence?: string[]
}

const mockFlaggedContent: FlaggedContent[] = [
  {
    id: "1",
    type: "video",
    contentId: "v123",
    title: "Cooking with Grandma's Recipes",
    creator: {
      id: "u2",
      name: "Aisha Williams",
      username: "aishaw",
      verified: false,
    },
    reporter: {
      id: "u5",
      name: "Anonymous User",
      username: "anonymous",
    },
    reason: "Inappropriate content",
    category: "inappropriate",
    description:
      "Video contains content that may not align with family-friendly guidelines. Specifically, there are suggestive comments and inappropriate language used throughout the video.",
    severity: "high",
    status: "pending",
    reportDate: "2024-01-23",
    evidence: ["timestamp: 2:34 - inappropriate language", "timestamp: 5:12 - suggestive content"],
  },
  {
    id: "2",
    type: "comment",
    contentId: "c456",
    title: "Comment on 'Black History: Untold Stories'",
    creator: {
      id: "u4",
      name: "John Doe",
      username: "johnd",
      verified: false,
    },
    reporter: {
      id: "u1",
      name: "Marcus Johnson",
      username: "marcusj",
    },
    reason: "Hate speech",
    category: "hate_speech",
    description: "Comment contains racist language and hate speech targeting the Black community.",
    severity: "critical",
    status: "reviewing",
    reportDate: "2024-01-24",
    reviewDate: "2024-01-24",
    moderatorNotes: "Reviewing for immediate action. Content clearly violates community guidelines.",
  },
  {
    id: "3",
    type: "video",
    contentId: "v789",
    title: "Educational Content About Science",
    creator: {
      id: "u6",
      name: "Sarah Johnson",
      username: "sarahj",
      verified: true,
    },
    reporter: {
      id: "u7",
      name: "Mike Wilson",
      username: "mikew",
    },
    reason: "Misinformation",
    category: "misinformation",
    description: "Video spreads false scientific information that could be harmful to viewers.",
    severity: "medium",
    status: "resolved",
    reportDate: "2024-01-20",
    reviewDate: "2024-01-22",
    moderatorNotes: "Reviewed content. Creator was contacted to add disclaimer. Issue resolved.",
    actionTaken: "Warning issued, disclaimer added",
  },
]

export default function ContentModeration() {
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>(mockFlaggedContent)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(null)
  const [moderatorNotes, setModeratorNotes] = useState("")

  const handleStatusChange = (contentId: string, newStatus: FlaggedContent["status"], action?: string) => {
    setFlaggedContent((prev) =>
      prev.map((content) =>
        content.id === contentId
          ? {
              ...content,
              status: newStatus,
              reviewDate: new Date().toISOString().split("T")[0],
              moderatorNotes,
              actionTaken: action,
            }
          : content,
      ),
    )

    setModeratorNotes("")
    setSelectedContent(null)

    toast({
      title: "Content moderated",
      description: `Content has been ${newStatus}.`,
    })
  }

  const getSeverityColor = (severity: FlaggedContent["severity"]) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: FlaggedContent["status"]) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "reviewing":
        return "default"
      case "resolved":
        return "default"
      case "dismissed":
        return "outline"
      case "escalated":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getCategoryIcon = (category: FlaggedContent["category"]) => {
    switch (category) {
      case "inappropriate":
        return <AlertTriangle className="h-4 w-4" />
      case "spam":
        return <MessageSquare className="h-4 w-4" />
      case "harassment":
        return <Ban className="h-4 w-4" />
      case "copyright":
        return <Shield className="h-4 w-4" />
      case "violence":
        return <XCircle className="h-4 w-4" />
      case "hate_speech":
        return <Flag className="h-4 w-4" />
      case "misinformation":
        return <Eye className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const filteredContent = flaggedContent.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || content.status === filterStatus
    const matchesSeverity = filterSeverity === "all" || content.severity === filterSeverity
    const matchesCategory = filterCategory === "all" || content.category === filterCategory

    return matchesSearch && matchesStatus && matchesSeverity && matchesCategory
  })

  return (
    <AdminGuard requiredRole="moderator">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
              <p className="text-gray-600">Review and moderate flagged content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Moderation Settings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{flaggedContent.filter((c) => c.status === "pending").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {flaggedContent.filter((c) => c.severity === "high" || c.severity === "critical").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    flaggedContent.filter(
                      (c) => c.status === "resolved" && c.reviewDate === new Date().toISOString().split("T")[0],
                    ).length
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Escalated</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {flaggedContent.filter((c) => c.status === "escalated").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="inappropriate">Inappropriate</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="copyright">Copyright</SelectItem>
                    <SelectItem value="violence">Violence</SelectItem>
                    <SelectItem value="hate_speech">Hate Speech</SelectItem>
                    <SelectItem value="misinformation">Misinformation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Flagged Content List */}
          <div className="space-y-4">
            {filteredContent.map((content) => (
              <Card key={content.id} className={content.severity === "critical" ? "border-red-500" : ""}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Content Type Icon */}
                    <div className="flex-shrink-0">
                      {content.type === "video" ? (
                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <Play className="h-6 w-6 text-gray-400" />
                        </div>
                      ) : content.type === "comment" ? (
                        <div className="w-16 h-12 bg-blue-100 rounded flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-blue-500" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-green-100 rounded flex items-center justify-center">
                          <User className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{content.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getSeverityColor(content.severity)}>{content.severity} priority</Badge>
                            <Badge variant={getStatusColor(content.status)}>{content.status}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getCategoryIcon(content.category)}
                              {content.category.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p>
                            <strong>Creator:</strong> {content.creator.name} (@{content.creator.username})
                          </p>
                          <p>
                            <strong>Reporter:</strong> {content.reporter.name}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Reported:</strong> {content.reportDate}
                          </p>
                          {content.reviewDate && (
                            <p>
                              <strong>Reviewed:</strong> {content.reviewDate}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p>
                          <strong>Reason:</strong> {content.reason}
                        </p>
                        <p className="text-sm">{content.description}</p>
                      </div>

                      {content.evidence && content.evidence.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-amber-800 mb-2">Evidence:</p>
                          <ul className="text-sm text-amber-700 space-y-1">
                            {content.evidence.map((evidence, index) => (
                              <li key={index}>• {evidence}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {content.moderatorNotes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-800">Moderator Notes:</p>
                          <p className="text-sm text-blue-700">{content.moderatorNotes}</p>
                          {content.actionTaken && (
                            <p className="text-sm text-blue-700 mt-1">
                              <strong>Action Taken:</strong> {content.actionTaken}
                            </p>
                          )}
                        </div>
                      )}

                      {selectedContent?.id === content.id && (
                        <div className="space-y-3 border-t pt-4">
                          <Textarea
                            placeholder="Add moderator notes..."
                            value={moderatorNotes}
                            onChange={(e) => setModeratorNotes(e.target.value)}
                            rows={3}
                          />
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedContent(selectedContent?.id === content.id ? null : content)}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        {selectedContent?.id === content.id ? "Close" : "Review"}
                      </Button>

                      {selectedContent?.id === content.id && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(content.id, "resolved", "Content approved")}
                          >
                            <CheckCircle className="h-3 w-3 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(content.id, "resolved", "Content removed")}
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Remove
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(content.id, "dismissed", "Report dismissed")}
                          >
                            <XCircle className="h-3 w-3 mr-2" />
                            Dismiss
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(content.id, "escalated", "Escalated to senior moderator")}
                          >
                            <Flag className="h-3 w-3 mr-2" />
                            Escalate
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No flagged content found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all" || filterSeverity !== "all" || filterCategory !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Great! There's no content currently flagged for review."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
