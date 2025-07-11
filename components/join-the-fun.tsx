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
import { Play, Users, Trophy } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { getSupabaseClient } from "@/lib/supabase";

type SupabaseError = {
  code: string;
  message: string;
  details?: string;
  hint?: string;
};

export function JoinTheFun() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const supabase = getSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert({
        email,
        subscribed_at: new Date().toISOString(),
      });

      if (error) {
        if (error.code === "23505") {
          // Unique violation
          toast({
            title: "Already Subscribed",
            description: "This email is already on our mailing list!",
            className: "bg-blue-50 text-blue-800",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Success! 🎉",
        description: "You've been subscribed to our newsletter.",
        className: "bg-green-50 text-green-800 border-green-100",
      });
      setEmail("");
    } catch (error: unknown) {
      console.error("Subscription error:", error);

      let errorMessage = "Failed to subscribe. Please try again later.";

      if (typeof error === "object" && error !== null) {
        const supabaseError = error as SupabaseError;
        if (supabaseError.code === "42P01") {
          errorMessage =
            "Service temporarily unavailable. Please try again later.";
        } else if (supabaseError.message) {
          errorMessage = supabaseError.message;
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-6 md:p-12 flex justify-center">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ready to Join the Fun?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Start your creative journey today. Upload your first video,
              participate in contests, and connect with a community of
              passionate creators.
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBF2D1]">
                  <Play className="h-4 w-4 text-[#4DD90D]" />
                </div>
                <span>Upload unlimited videos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBF2D1]">
                  <Trophy className="h-4 w-4 text-[#4DD90D]" />
                </div>
                <span>Participate in monthly contests</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DBF2D1]">
                  <Users className="h-4 w-4 text-[#4DD90D]" />
                </div>
                <span>Connect with other creators</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="bg-[#228201] text-white">
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/library/contests">View Current Contest</Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>
                Get notified about new contests, features, and creator
                spotlights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#228201] hover:bg-[#1a6b01] text-white w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                By subscribing, you agree to our privacy policy and terms of
                service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
