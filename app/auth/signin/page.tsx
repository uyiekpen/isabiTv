"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { Play } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to iSabiTV.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 ">
      <div className="w-full  overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="relative w-full md:w-1/2 h-screen md:h-auto hidden md:block">
          <Image
            src="/auth.jpg" // Update this path to your actual image
            alt="Sign In Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 flex items-center">
          <Card className="w-full h-screen shadow-none border-none flex flex-col justify-center">
            <div className="px-6">
              {" "}
              {/* padding added to give space inside */}
              <CardHeader className="text-center">
                <div className="w-full flex justify-center mb-2">
                  <Image
                    src="/isabitv.svg"
                    height={50}
                    width={100}
                    alt="logo.svg"
                  />
                </div>
                <CardTitle className="text-2xl">
                  Welcome back to iSabiTV
                </CardTitle>
                <CardDescription>
                  Sign in to continue your journey with our community
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
