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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  Eye,
  Flag,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Report {
  id: string;
  videoId: string;
  videoTitle: string;
  reporter: string;
  reporterEmail: string;
  reason: string;
  description: string;
  status: "pending" | "under_review" | "resolved" | "dismissed";
  reportDate: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  evidence: string[];
  moderatorAssigned: string | null;
  resolution?: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    videoId: "v1",
    videoTitle: "Amazing Dance Performance",
    reporter: "John Doe",
    reporterEmail: "john@example.com",
    reason: "Inappropriate Content",
    description: "Contains inappropriate language",
    status: "pending",
    reportDate: "2024-01-15",
    severity: "medium",
    category: "Content Violation",
    evidence: ["screenshot1.jpg", "timestamp_2:30"],
    moderatorAssigned: null,
  },
  {
    id: "2",
    videoId: "v2",
    videoTitle: "Cooking Tutorial",
    reporter: "Jane Smith",
    reporterEmail: "jane@example.com",
    reason: "Copyright Infringement",
    description: "Uses copyrighted music without permission",
    status: "under_review",
    reportDate: "2024-01-14",
    severity: "high",
    category: "Copyright",
    evidence: ["audio_match.mp3"],
    moderatorAssigned: "Admin User",
    resolution: "Investigating copyright claim",
  },
];

export function ContentModeration() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [moderatorNotes, setModeratorNotes] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || report.severity === severityFilter;
    const matchesCategory =
      categoryFilter === "all" || report.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesSeverity && matchesCategory;
  });

  const handleReportAction = (
    reportId: string,
    action: "approve" | "remove" | "dismiss" | "escalate"
  ) => {
    setReports((prevReports) =>
      prevReports.map((report) => {
        if (report.id === reportId) {
          let newStatus: Report["status"];
          let resolution: string;

          switch (action) {
            case "approve":
              newStatus = "resolved";
              resolution = "Content approved - no violation found";
              break;
            case "remove":
              newStatus = "resolved";
              resolution = "Content removed due to policy violation";
              break;
            case "dismiss":
              newStatus = "dismissed";
              resolution = "Report dismissed - insufficient evidence";
              break;
            case "escalate":
              newStatus = "under_review";
              resolution = "Escalated to senior moderator";
              break;
            default:
              newStatus = report.status;
              resolution = report.resolution || "";
          }

          return {
            ...report,
            status: newStatus,
            resolution: moderatorNotes || resolution,
            moderatorAssigned: "Current User",
          };
        }
        return report;
      })
    );
    setModeratorNotes("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "dismissed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Moderation</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertTriangle className="h-4 w-4" />
            <span>
              {reports.filter((r) => r.status === "pending").length} Pending
            </span>
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Content Violation">
                  Content Violation
                </SelectItem>
                <SelectItem value="Copyright">Copyright</SelectItem>
                <SelectItem value="Spam">Spam</SelectItem>
                <SelectItem value="Harassment">Harassment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Flagged Content Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.videoTitle}
                  </TableCell>
                  <TableCell>{report.reporter}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.reportDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReport(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Report Details</DialogTitle>
                          </DialogHeader>
                          {selectedReport && (
                            <div className="space-y-4">
                              <div>
                                <Label>Video Title</Label>
                                <p className="text-sm text-gray-600">
                                  {selectedReport.videoTitle}
                                </p>
                              </div>
                              <div>
                                <Label>Reporter</Label>
                                <p className="text-sm text-gray-600">
                                  {selectedReport.reporter} (
                                  {selectedReport.reporterEmail})
                                </p>
                              </div>
                              <div>
                                <Label>Reason</Label>
                                <p className="text-sm text-gray-600">
                                  {selectedReport.reason}
                                </p>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p className="text-sm text-gray-600">
                                  {selectedReport.description}
                                </p>
                              </div>
                              <div>
                                <Label>Evidence</Label>
                                <div className="flex flex-wrap gap-2">
                                  {selectedReport.evidence.map(
                                    (item, index) => (
                                      <Badge key={index} variant="outline">
                                        {item}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="moderator-notes">
                                  Moderator Notes
                                </Label>
                                <Textarea
                                  id="moderator-notes"
                                  value={moderatorNotes}
                                  onChange={(e) =>
                                    setModeratorNotes(e.target.value)
                                  }
                                  placeholder="Add your notes here..."
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() =>
                                    handleReportAction(
                                      selectedReport.id,
                                      "approve"
                                    )
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleReportAction(
                                      selectedReport.id,
                                      "remove"
                                    )
                                  }
                                  variant="destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleReportAction(
                                      selectedReport.id,
                                      "dismiss"
                                    )
                                  }
                                  variant="outline"
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Dismiss
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleReportAction(
                                      selectedReport.id,
                                      "escalate"
                                    )
                                  }
                                  variant="outline"
                                >
                                  <Flag className="h-4 w-4 mr-2" />
                                  Escalate
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
