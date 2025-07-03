"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Heart, Users, Upload, Play } from "lucide-react";
import Link from "next/link";

export function JoinTheFun() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Join the Fun
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Be part of our vibrant community where creativity meets connection.
            Ubuntu philosophy - "I am because we are" - community and
            connection.
          </p>
        </div>

        {/* Community Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Creator */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Crown className="w-3 h-3 mr-1" />
                Featured Creator
              </Badge>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                Become a Featured Creator
              </h3>
              <p className="text-neutral-600 mb-6">
                Share your unique content and get recognized by our community.
                Stand out with quality videos and engaging storytelling.
              </p>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white w-full"
              >
                <Link
                  href="/upload"
                  className="flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Start Creating
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Community Choice */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <Badge
                variant="secondary"
                className="mb-4 bg-accent/10 text-accent hover:bg-accent/20"
              >
                <Heart className="w-3 h-3 mr-1" />
                Community Choice
              </Badge>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                Community Choice Awards
              </h3>
              <p className="text-neutral-600 mb-6">
                Vote for your favorite content and help creators get the
                recognition they deserve. Your voice matters in our community.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white w-full bg-transparent"
              >
                <Link
                  href="/library"
                  className="flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Explore & Vote
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Join Community */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-secondary/5 to-secondary/10 md:col-span-2 lg:col-span-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <Badge
                variant="secondary"
                className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20"
              >
                <Users className="w-3 h-3 mr-1" />
                Community
              </Badge>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                Join Our Community
              </h3>
              <p className="text-neutral-600 mb-6">
                Connect with like-minded creators and viewers. Share
                experiences, collaborate, and grow together in our welcoming
                space.
              </p>
              <Button
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white w-full"
              >
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Join Community
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-ubuntu-gradient rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to be part of something amazing?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and viewers in our warm, welcoming
              community. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/auth/signup">Get Started Today</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold bg-transparent"
              >
                <Link href="/library">Explore Content</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
