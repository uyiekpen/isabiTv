"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Video,
  ImageIcon,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider-safe";

export default function UploadPage() {
  const { user, isLoaded } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Show loading state while auth is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-ubuntu-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-ubuntu-gradient-soft">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Upload className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Share Your Story?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of creators and start uploading your content
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                Sign In to Upload
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-ubuntu-gradient-soft">
      {/* Hero Section */}
      <section className="bg-ubuntu-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Creator Studio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Share Your <span className="text-yellow-300">Story</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Upload your content and connect with a global community of
              creators and viewers
            </p>
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Upload Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-6 w-6 text-primary-600" />
                      Upload Your Content
                    </CardTitle>
                    <CardDescription>
                      Share your videos, images, or documents with the IsabiTV
                      community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                          <Upload className="h-8 w-8 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Drop your files here or click to browse
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Supports MP4, MOV, AVI, JPG, PNG, PDF up to 2GB
                        </p>
                        <Button className="bg-primary-500 hover:bg-primary-600">
                          <Upload className="mr-2 h-4 w-4" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {/* Upload Complete */}
                    {uploadComplete && (
                      <div className="flex items-center gap-2 p-4 bg-secondary-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-secondary-600" />
                        <span className="text-secondary-700 font-medium">
                          Upload completed successfully!
                        </span>
                      </div>
                    )}

                    {/* Content Details */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="Give your content a compelling title"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Tell your audience what this content is about..."
                          className="mt-1 min-h-[120px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          placeholder="Add tags separated by commas (e.g., education, tutorial, music)"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Select a category</option>
                          <option value="education">Education</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="music">Music</option>
                          <option value="sports">Sports</option>
                          <option value="technology">Technology</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="news">News</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="flex-1 bg-primary-500 hover:bg-primary-600"
                      >
                        {isUploading ? "Uploading..." : "Publish Content"}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        Save as Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upload Tips */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="h-5 w-5 text-secondary-600" />
                      Upload Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Video className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Video Quality
                        </h4>
                        <p className="text-sm text-gray-600">
                          Upload in 1080p or higher for best results
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ImageIcon className="h-5 w-5 text-secondary-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Thumbnails
                        </h4>
                        <p className="text-sm text-gray-600">
                          Eye-catching thumbnails get more views
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <FileText className="h-5 w-5 text-accent-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Descriptions
                        </h4>
                        <p className="text-sm text-gray-600">
                          Detailed descriptions help with discovery
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Guidelines */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Community Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Help us maintain a positive, inclusive community by
                      following our guidelines.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Read Guidelines
                    </Button>
                  </CardContent>
                </Card>

                {/* Creator Resources */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Creator Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Access tools, tutorials, and tips to grow your audience.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Explore Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
