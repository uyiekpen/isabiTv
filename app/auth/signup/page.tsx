"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      await login(formData.email, formData.password);

      toast({
        title: "Welcome to iSabiTV!",
        description: "Your account has been created successfully.",
      });

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
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="relative w-full md:w-1/2 h-screen md:h-screen hidden md:block">
          <Image
            src="/auth.jpg" // Replace with your image path
            alt="Sign Up"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side Sign Up Form */}
        <div className="w-full md:w-1/2 h-screen">
          <Card className="w-full h-full shadow-none border-none flex flex-col">
            <CardHeader className="px-6 pt-8">
              <div className="w-full flex justify-center mb-2">
                <Image
                  src="/isabitv.svg"
                  height={50}
                  width={100}
                  alt="logo.svg"
                />
              </div>
              <CardTitle className="text-2xl text-center">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-center">
                Join thousands of creators and viewers in our community
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-8 flex-1 md:overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 pb-4">
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

                {/* Passwords */}
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
                    {["viewer", "creator"].map((type) => (
                      <div
                        key={type}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            accountType: type,
                          }))
                        }
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                          formData.accountType === type
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="accountType"
                            value={type}
                            checked={formData.accountType === type}
                            onChange={handleInputChange}
                            className="text-primary"
                          />
                          <div>
                            <p className="font-medium capitalize">{type}</p>
                            <p className="text-xs text-muted-foreground">
                              {type === "viewer"
                                ? "Watch and engage with content"
                                : "Upload and share videos"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
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

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Footer Links */}
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
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
