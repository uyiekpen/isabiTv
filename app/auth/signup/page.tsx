"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Play, Users, Shield, Star } from "lucide-react";

const platformBenefits = [
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Content free from vulgar or overly sexualized material",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Connect with creators and viewers who share your values",
  },
  {
    icon: Star,
    title: "Quality Content",
    description: "Educational and inspirational videos that empower",
  },
];

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "viewer",
    agreeToTerms: false,
    agreeToGuidelines: false,
    subscribeNewsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToGuidelines) {
      toast({
        title: "Agreement required",
        description: "Please agree to our terms and community guidelines.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await login(formData.email, formData.password);

      toast({
        title: "Welcome to iSabiTV!",
        description: "Your account has been created successfully.",
      });

      // Redirect based on account type
      if (formData.accountType === "creator") {
        router.push("/become-creator");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Platform Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <Link href="/" className="mb-8 flex items-center space-x-2">
                <Play className="h-8 w-8" />
                <span className="text-2xl font-bold">iSabiTV</span>
              </Link>

              <h1 className="mb-4 text-4xl font-bold tracking-tight">
                Join Our Community
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Become part of a platform dedicated to empowering Black
                communities through meaningful, high-quality video content.
              </p>
            </div>

            <div className="space-y-6">
              {platformBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
              <h3 className="mb-2 font-semibold">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                iSabiTV is built FROM our Black community and FOR our Black
                community. We provide a dedicated, safe space for valuable
                stories and content that elevates Black society.
              </p>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                Join thousands of creators and viewers in our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Password Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Account Type */}
                <div className="space-y-3">
                  <Label>Account Type</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div
                      className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                        formData.accountType === "viewer"
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accountType: "viewer",
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="accountType"
                          value="viewer"
                          checked={formData.accountType === "viewer"}
                          onChange={handleInputChange}
                          className="text-primary"
                        />
                        <div>
                          <p className="font-medium">Viewer</p>
                          <p className="text-xs text-muted-foreground">
                            Watch and engage with content
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                        formData.accountType === "creator"
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accountType: "creator",
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="accountType"
                          value="creator"
                          checked={formData.accountType === "creator"}
                          onChange={handleInputChange}
                          className="text-primary"
                        />
                        <div>
                          <p className="font-medium">Creator</p>
                          <p className="text-xs text-muted-foreground">
                            Upload and share videos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeToTerms: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="agreeToTerms"
                      className="text-sm leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToGuidelines"
                      checked={formData.agreeToGuidelines}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          agreeToGuidelines: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="agreeToGuidelines"
                      className="text-sm leading-relaxed"
                    >
                      I agree to follow the{" "}
                      <Link
                        href="/guidelines"
                        className="text-primary hover:underline"
                      >
                        Community Guidelines
                      </Link>{" "}
                      and content standards
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          subscribeNewsletter: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="subscribeNewsletter"
                      className="text-sm leading-relaxed"
                    >
                      Subscribe to our newsletter for updates and community
                      highlights
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link
                  href="/auth/signin"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
