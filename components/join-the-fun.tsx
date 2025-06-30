import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play, Users, Trophy } from "lucide-react"
import Link from "next/link"

export function JoinTheFun() {
  return (
    <section className="p-6 flex justify-center">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Join the Fun?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Start your creative journey today. Upload your first video, participate in contests, and connect with a
              community of passionate creators.
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-4 w-4 text-primary" />
                </div>
                <span>Upload unlimited videos</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <span>Participate in monthly contests</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span>Connect with other creators</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild >
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
              <CardDescription>Get notified about new contests, features, and creator spotlights</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                By subscribing, you agree to our privacy policy and terms of service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
