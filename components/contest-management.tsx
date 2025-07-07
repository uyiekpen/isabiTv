"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { AdminGuard } from "./admin-middleware"
import { Trophy, Plus, Calendar, DollarSign, Users, Video, Edit, Trash2, Eye, Award, Clock, Target } from "lucide-react"

interface Contest {
  id: string
  title: string
  description: string
  category: string
  startDate: string
  endDate: string
  prize: string
  maxEntries: number
  currentEntries: number
  status: "draft" | "active" | "ended" | "cancelled"
  rules: string[]
  eligibility: string
  judgesCriteria: string[]
  createdAt: string
}

const mockContests: Contest[] = [
  {
    id: "1",
    title: "Black History Educational Videos",
    description: "Create educational content highlighting important figures in Black history",
    category: "Education",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    prize: "$1,000 + Featured Placement",
    maxEntries: 100,
    currentEntries: 45,
    status: "active",
    rules: [
      "Video must be 3-15 minutes long",
      "Content must be family-friendly",
      "Original content only",
      "Must include educational value",
    ],
    eligibility: "Open to all verified creators",
    judgesCriteria: ["Educational Value", "Production Quality", "Engagement", "Originality"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Youth Entrepreneurship Stories",
    description: "Share inspiring stories of young Black entrepreneurs",
    category: "Business",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    prize: "$500 + Mentorship Session",
    maxEntries: 50,
    currentEntries: 12,
    status: "draft",
    rules: [
      "Video must be 5-20 minutes long",
      "Must feature real entrepreneurs",
      "Include actionable advice",
      "Professional presentation required",
    ],
    eligibility: "Creators with business category content",
    judgesCriteria: ["Inspiration Factor", "Practical Value", "Storytelling", "Impact"],
    createdAt: "2024-01-20",
  },
]

export default function ContestManagement() {
  const [contests, setContests] = useState<Contest[]>(mockContests)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingContest, setEditingContest] = useState<Contest | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    prize: "",
    maxEntries: 100,
    rules: "",
    eligibility: "",
    judgesCriteria: "",
    status: "draft" as Contest["status"],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateContest = () => {
    const newContest: Contest = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      prize: formData.prize,
      maxEntries: formData.maxEntries,
      currentEntries: 0,
      status: formData.status,
      rules: formData.rules.split("\n").filter((rule) => rule.trim()),
      eligibility: formData.eligibility,
      judgesCriteria: formData.judgesCriteria.split("\n").filter((criteria) => criteria.trim()),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setContests((prev) => [...prev, newContest])
    setShowCreateForm(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      startDate: "",
      endDate: "",
      prize: "",
      maxEntries: 100,
      rules: "",
      eligibility: "",
      judgesCriteria: "",
      status: "draft",
    })

    toast({
      title: "Contest created",
      description: "New contest has been created successfully.",
    })
  }

  const handleUpdateContest = () => {
    if (!editingContest) return

    const updatedContest = {
      ...editingContest,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startDate: formData.startDate,
      endDate: formData.endDate,
      prize: formData.prize,
      maxEntries: formData.maxEntries,
      status: formData.status,
      rules: formData.rules.split("\n").filter((rule) => rule.trim()),
      eligibility: formData.eligibility,
      judgesCriteria: formData.judgesCriteria.split("\n").filter((criteria) => criteria.trim()),
    }

    setContests((prev) => prev.map((contest) => (contest.id === editingContest.id ? updatedContest : contest)))
    setEditingContest(null)
    setShowCreateForm(false)

    toast({
      title: "Contest updated",
      description: "Contest has been updated successfully.",
    })
  }

  const handleEditContest = (contest: Contest) => {
    setEditingContest(contest)
    setFormData({
      title: contest.title,
      description: contest.description,
      category: contest.category,
      startDate: contest.startDate,
      endDate: contest.endDate,
      prize: contest.prize,
      maxEntries: contest.maxEntries,
      rules: contest.rules.join("\n"),
      eligibility: contest.eligibility,
      judgesCriteria: contest.judgesCriteria.join("\n"),
      status: contest.status,
    })
    setShowCreateForm(true)
  }

  const handleDeleteContest = (contestId: string) => {
    setContests((prev) => prev.filter((contest) => contest.id !== contestId))
    toast({
      title: "Contest deleted",
      description: "Contest has been deleted successfully.",
    })
  }

  const getStatusColor = (status: Contest["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "draft":
        return "secondary"
      case "ended":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <AdminGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contest Management</h1>
              <p className="text-gray-600">Create and manage platform contests</p>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Contest
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Contests</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contests.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Contests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contests.filter((c) => c.status === "active").length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contests.reduce((sum, contest) => sum + contest.currentEntries, 0)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,500+</div>
              </CardContent>
            </Card>
          </div>

          {/* Create/Edit Contest Form */}
          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingContest ? "Edit Contest" : "Create New Contest"}</CardTitle>
                <CardDescription>
                  {editingContest ? "Update contest details" : "Set up a new contest for creators"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Contest Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter contest title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Arts">Arts & Culture</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Health">Health & Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prize">Prize *</Label>
                    <Input
                      id="prize"
                      value={formData.prize}
                      onChange={(e) => handleInputChange("prize", e.target.value)}
                      placeholder="e.g., $1,000 + Featured Placement"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxEntries">Max Entries</Label>
                    <Input
                      id="maxEntries"
                      type="number"
                      value={formData.maxEntries}
                      onChange={(e) => handleInputChange("maxEntries", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the contest theme and objectives"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rules">Contest Rules (one per line) *</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => handleInputChange("rules", e.target.value)}
                    placeholder="Video must be 3-15 minutes long&#10;Content must be family-friendly&#10;Original content only"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility Requirements *</Label>
                  <Input
                    id="eligibility"
                    value={formData.eligibility}
                    onChange={(e) => handleInputChange("eligibility", e.target.value)}
                    placeholder="e.g., Open to all verified creators"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="judgesCriteria">Judging Criteria (one per line) *</Label>
                  <Textarea
                    id="judgesCriteria"
                    value={formData.judgesCriteria}
                    onChange={(e) => handleInputChange("judgesCriteria", e.target.value)}
                    placeholder="Educational Value&#10;Production Quality&#10;Engagement&#10;Originality"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Contest["status"]) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-4">
                  <Button onClick={editingContest ? handleUpdateContest : handleCreateContest}>
                    {editingContest ? "Update Contest" : "Create Contest"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false)
                      setEditingContest(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contests List */}
          <Card>
            <CardHeader>
              <CardTitle>All Contests</CardTitle>
              <CardDescription>Manage existing contests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contests.map((contest) => (
                  <Card key={contest.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{contest.title}</h3>
                            <Badge variant={getStatusColor(contest.status)}>{contest.status}</Badge>
                            <Badge variant="outline">{contest.category}</Badge>
                          </div>

                          <p className="text-muted-foreground mb-4">{contest.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {contest.startDate} - {contest.endDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>{contest.prize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {contest.currentEntries}/{contest.maxEntries} entries
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span>{contest.eligibility}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditContest(contest)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteContest(contest.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
