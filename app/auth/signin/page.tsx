"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting to sign in with:", email);
      await login(email, password);

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to iSabiTV.",
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Sign in error:", error);

      let errorMessage = "Please check your email and password.";

      // Handle specific Supabase error messages (removed email verification checks)
      if (error.message.includes("Invalid login credentials")) {
        errorMessage =
          "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message.includes("Too many requests")) {
        errorMessage =
          "Too many sign-in attempts. Please wait a moment before trying again.";
      } else if (error.message.includes("User not found")) {
        errorMessage =
          "No account found with this email address. Please sign up first.";
      } else if (error.message.includes("Email rate limit exceeded")) {
        errorMessage = "Please wait before trying again.";
      }

      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left Side Image */}
        <div className="relative w-full md:w-1/2 h-screen hidden md:block">
          <Image
            src="/auth.jpg"
            alt="Sign In"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side Sign In Form */}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-full flex justify-center mb-4">
                <Image
                  src="/isabitv.svg"
                  height={50}
                  width={100}
                  alt="iSabiTV Logo"
                />
              </div>
              <CardTitle className="text-2xl">
                Welcome back to iSabiTV
              </CardTitle>
              <CardDescription>
                Sign in to continue your creative journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline"
                >
                  Join our community
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
