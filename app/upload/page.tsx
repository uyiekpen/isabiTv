"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
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
  X,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider-safe";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase-client";
import { v4 as uuidv4 } from "uuid";

// Supported file types and max size (2GB)
const SUPPORTED_FORMATS = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "image/jpeg",
  "image/png",
  "application/pdf",
];
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

type UploadFormData = {
  title: string;
  description: string;
  tags: string;
  category: string;
  isPublic: boolean;
};

type UploadResponse = {
  success: boolean;
  message?: string;
  filePath?: string;
  metadata?: any;
};

// Utility function for safe byte conversion
const bytesToMB = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export default function UploadPage() {
  const { user, isLoaded } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = getSupabase();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    description: "",
    tags: "",
    category: "",
    isPublic: true,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toast({
        title: "Unsupported file format",
        description:
          "Please upload a supported file type (MP4, WebM, MOV, AVI, JPG, PNG, PDF)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 2GB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setUploadComplete(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!selectedFile) {
      errors.file = "Please select a file to upload";
    }

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.category) {
      errors.category = "Please select a category";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadToSupabase = async (file: File): Promise<UploadResponse> => {
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("uploads").getPublicUrl(filePath);

      // Save metadata to database
      const { error: dbError } = await supabase.from("user_uploads").insert({
        user_id: user.id, // Make sure this matches the RLS policy
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        category: formData.category,
        is_public: formData.isPublic,
        file_path: filePath,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
      });

      if (dbError) {
        // Delete the uploaded file if DB insert fails
        await supabase.storage.from("uploads").remove([filePath]);
        throw dbError;
      }

      return {
        success: true,
        message: "File uploaded successfully",
        filePath,
        metadata: {
          publicUrl,
          fileType: file.type,
          fileSize: file.size,
        },
      };
    } catch (error: any) {
      console.error("Upload failed:", error);
      return {
        success: false,
        message: error.message || "Upload failed",
      };
    }
  };

  const handleUpload = async () => {
    if (!validateForm()) return;
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload the file
      const result = await uploadToSupabase(selectedFile);

      if (!result.success) {
        throw new Error(result.message || "Upload failed");
      }

      // Update progress to 100% when complete
      setUploadProgress(100);
      setUploadComplete(true);

      toast({
        title: "Upload successful!",
        description: "Your file has been uploaded and is now processing.",
      });

      // Redirect to content page after delay
      setTimeout(() => {
        router.push("/dashboard/content");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Progress updater (simulated for demo)
  useEffect(() => {
    if (isUploading && uploadProgress < 90) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isUploading, uploadProgress]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600"
                onClick={() => router.push("/auth/signin")}
              >
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

  return (
    <div className="min-h-screen bg-ubuntu-gradient-soft">
      <Navbar />

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
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        selectedFile
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-300 hover:border-primary-400"
                      }`}
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept={SUPPORTED_FORMATS.join(",")}
                      />

                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            {selectedFile.type.startsWith("video/") ? (
                              <Video className="h-8 w-8 text-primary-600" />
                            ) : selectedFile.type.startsWith("image/") ? (
                              <ImageIcon className="h-8 w-8 text-primary-600" />
                            ) : (
                              <FileText className="h-8 w-8 text-primary-600" />
                            )}
                          </div>
                          <div className="max-w-full">
                            <p className="font-medium text-gray-900 truncate mb-1">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                              {bytesToMB(selectedFile.size)} MB •
                              {selectedFile.type.split("/")[1].toUpperCase()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile();
                            }}
                            className="mt-2"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-primary-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Drop your files here or click to browse
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Supports MP4, WebM, MOV, AVI, JPG, PNG, PDF up to
                            2GB
                          </p>
                          <Button className="bg-primary-500 hover:bg-primary-600">
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Files
                          </Button>
                        </div>
                      )}
                    </div>

                    {validationErrors.file && (
                      <p className="text-sm text-red-500">
                        {validationErrors.file}
                      </p>
                    )}

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
                      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-700 font-medium">
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
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Give your content a compelling title"
                          className="mt-1"
                        />
                        {validationErrors.title && (
                          <p className="text-sm text-red-500">
                            {validationErrors.title}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Tell your audience what this content is about..."
                          className="mt-1 min-h-[120px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          placeholder="Add tags separated by commas (e.g., education, tutorial, music)"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
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
                        {validationErrors.category && (
                          <p className="text-sm text-red-500">
                            {validationErrors.category}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isPublic"
                          name="isPublic"
                          checked={formData.isPublic}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              isPublic: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <Label htmlFor="isPublic">
                          Make this content public
                        </Label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || uploadComplete}
                        className="flex-1 bg-primary-500 hover:bg-primary-600"
                      >
                        {isUploading ? (
                          <>
                            <span className="animate-pulse">Uploading</span>
                            <span className="ml-2">({uploadProgress}%)</span>
                          </>
                        ) : uploadComplete ? (
                          "Upload Complete"
                        ) : (
                          "Publish Content"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={isUploading}
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
