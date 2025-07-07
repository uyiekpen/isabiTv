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
  Upload,
  Video,
  ImageIcon,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  Play,
} from "lucide-react"

interface UploadedContent {
  id: string
  title: string
  description: string
  type: "video" | "image" | "document"
  filename: string
  fileSize: number
  duration?: string
  thumbnail?: string
  uploader: {
    id: string
    name: string
    username: string
    verified: boolean
  }
  uploadDate: string
  status: "processing" | "approved" | "rejected" | "pending_review" | "flagged"
  category: string
  tags: string[]
  views: number
  likes: number
  comments: number
  moderatorNotes?: string
  autoApproved: boolean
  contentWarnings: string[]
  resolution?: string
  format: string
}

const mockUploads: UploadedContent[] = [
  {
    id: "1",
    title: "The History of Jazz Music",
    description: "An educational documentary about the origins and evolution of jazz music in America",
    type: "video",
    filename: "jazz-history-documentary.mp4",
    fileSize: 524288000, // 500MB
    duration: "45:32",
    thumbnail: "/placeholder.svg?height=180&width=320",
    uploader: {
      id: "u1",
      name: "Marcus Johnson",
      username: "marcusj",
      verified: true,
    },
    uploadDate: "2024-01-25",
    status: "approved",
    category: "Education",
    tags: ["jazz", "music", "history", "documentary"],
    views: 12450,
    likes: 892,
    comments: 156,
    autoApproved: false,
    contentWarnings: [],
    resolution: "1920x1080",
    format: "MP4",
  },
  {
    id: "2",
    title: "Cooking with Grandma's Recipes",
    description: "Traditional soul food recipes passed down through generations",
    type: "video",
    filename: "grandma-recipes-cooking.mp4",
    fileSize: 314572800, // 300MB
    duration: "28:15",
    thumbnail: "/placeholder.svg?height=180&width=320",
    uploader: {
      id: "u2",
      name: "Aisha Williams",
      username: "aishaw",
      verified: false,
    },
    uploadDate: "2024-01-26",
    status: "pending_review",
    category: "Lifestyle",
    tags: ["cooking", "recipes", "soul food", "family"],
    views: 0,
    likes: 0,
    comments: 0,
    autoApproved: false,
    contentWarnings: [],
    resolution: "1280x720",
    format: "MP4",
  },
  {
    id: "3",
    title: "Young Entrepreneur Success Story",
    description: "Interview with a successful young Black entrepreneur",
    type: "video",
    filename: "entrepreneur-interview.mp4",
    fileSize: 419430400, // 400MB
    duration: "35:20",
    thumbnail: "/placeholder.svg?height=180&width=320",
    uploader: {
      id: "u3",
      name: "Jamal Davis",
      username: "jamald",
      verified: true,
    },
    uploadDate: "2024-01-27",
    status: "flagged",
    category: "Business",
    tags: ["entrepreneurship", "business", "success", "interview"],
    views: 8930,
    likes: 445,
    comments: 89,
    moderatorNotes: "Contains promotional content that needs review",
    autoApproved: false,
    contentWarnings: ["promotional content"],
    resolution: "1920x1080",
    format: "MP4",
  },
  {
    id: "4",
    title: "Community Garden Project",
    description: "Documentation of a community garden initiative in Detroit",
    type: "video",
    filename: "community-garden-project.mp4",
    fileSize: 209715200, // 200MB
    duration: "18:45",
    thumbnail: "/placeholder.svg?height=180&width=320",
    uploader: {
      id: "u4",
      name: "Keisha Brown",
      username: "keishab",
      verified: false,
    },
    uploadDate: "2024-01-28",
    status: "processing",
    category: "Community",
    tags: ["community", "gardening", "detroit", "sustainability"],
    views: 0,
    likes: 0,
    comments: 0,
    autoApproved: true,
    contentWarnings: [],
    resolution: "1920x1080",
    format: "MP4",
  },
]

export default function ContentUploadManagement() {
  const [uploads, setUploads] = useState<UploadedContent[]>(mockUploads)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedUpload, setSelectedUpload] = useState<UploadedContent | null>(null)
  const [moderatorNotes, setModeratorNotes] = useState("")

  const handleStatusChange = (uploadId: string, newStatus: UploadedContent["status"], notes?: string) => {
    setUploads(
      uploads.map((upload) =>
        upload.id === uploadId
          ? {
              ...upload,
              status: newStatus,
              moderatorNotes: notes || upload.moderatorNotes,
            }
          : upload,
      ),
    )

    setSelectedUpload(null)
    setModeratorNotes("")

    toast({
      title: "Content updated",
      description: `Content has been ${newStatus.replace("_", " ")}.`,
    })
  }

  const handleDeleteContent = (uploadId: string) => {
    setUploads(uploads.filter((upload) => upload.id !== uploadId))
    toast({
      title: "Content deleted",
      description: "Content has been permanently deleted.",
    })
  }

  const filteredUploads = uploads.filter((upload) => {
    const matchesSearch =
      upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.uploader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || upload.status === filterStatus
    const matchesType = filterType === "all" || upload.type === filterType
    const matchesCategory = filterCategory === "all" || upload.category === filterCategory
    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const getStatusColor = (status: UploadedContent["status"]) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending_review":
        return "secondary"
      case "processing":
        return "outline"
      case "rejected":
        return "destructive"
      case "flagged":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: UploadedContent["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending_review":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Upload className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const uniqueCategories = Array.from(new Set(uploads.map((upload) => upload.category)))

  return (
    <AdminGuard requiredRole="moderator">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Upload Management</h1>
              <p className="text-gray-600">Review and manage uploaded content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Settings
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploads.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploads.filter((u) => u.status === "pending_review").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploads.filter((u) => u.status === "processing").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flagged</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploads.filter((u) => u.status === "flagged").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatFileSize(uploads.reduce((sum, upload) => sum + upload.fileSize, 0))}
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
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content List */}
          <div className="space-y-4">
            {filteredUploads.map((upload) => (
              <Card key={upload.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      {upload.type === "video" ? (
                        <div className="relative w-48 h-28 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={upload.thumbnail || "/placeholder.svg"}
                            alt={upload.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          {upload.duration && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                              {upload.duration}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-48 h-28 bg-gray-200 rounded-lg flex items-center justify-center">
                          {upload.type === "image" ? (
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                          ) : (
                            <FileText className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{upload.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            by {upload.uploader.name} (@{upload.uploader.username})
                            {upload.uploader.verified && <CheckCircle className="inline h-4 w-4 text-blue-500 ml-1" />}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={getStatusColor(upload.status)} className="flex items-center gap-1">
                              {getStatusIcon(upload.status)}
                              {upload.status.replace("_", " ")}
                            </Badge>
                            <Badge variant="outline">{upload.category}</Badge>
                            <Badge variant="outline">{upload.type.toUpperCase()}</Badge>
                            {upload.autoApproved && <Badge variant="outline">Auto-approved</Badge>}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm">{upload.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p>
                            <strong>File:</strong> {upload.filename}
                          </p>
                          <p>
                            <strong>Size:</strong> {formatFileSize(upload.fileSize)}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Format:</strong> {upload.format}
                          </p>
                          {upload.resolution && (
                            <p>
                              <strong>Resolution:</strong> {upload.resolution}
                            </p>
                          )}
                        </div>
                        <div>
                          <p>
                            <strong>Uploaded:</strong> {upload.uploadDate}
                          </p>
                          <p>
                            <strong>Views:</strong> {upload.views.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Likes:</strong> {upload.likes.toLocaleString()}
                          </p>
                          <p>
                            <strong>Comments:</strong> {upload.comments.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {upload.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {upload.contentWarnings.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-amber-800">Content Warnings:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {upload.contentWarnings.map((warning) => (
                              <Badge key={warning} variant="destructive" className="text-xs">
                                {warning}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {upload.moderatorNotes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-800">Moderator Notes:</p>
                          <p className="text-sm text-blue-700">{upload.moderatorNotes}</p>
                        </div>
                      )}

                      {selectedUpload?.id === upload.id && (
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
                        onClick={() => setSelectedUpload(selectedUpload?.id === upload.id ? null : upload)}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        {selectedUpload?.id === upload.id ? "Close" : "Review"}
                      </Button>

                      {selectedUpload?.id === upload.id && (
                        <>
                          <Button size="sm" onClick={() => handleStatusChange(upload.id, "approved", moderatorNotes)}>
                            <CheckCircle className="h-3 w-3 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(upload.id, "rejected", moderatorNotes)}
                          >
                            <XCircle className="h-3 w-3 mr-2" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(upload.id, "flagged", moderatorNotes)}
                          >
                            <AlertTriangle className="h-3 w-3 mr-2" />
                            Flag
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteContent(upload.id)}>
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUploads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No content found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all" || filterType !== "all" || filterCategory !== "all"
                    ? "Try adjusting your search or filters."
                    : "No content has been uploaded yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
