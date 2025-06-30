import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Trophy, Users, Star } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Upload,
    title: "Easy Upload",
    description:
      "Upload your videos with our simple drag-and-drop interface. Support for all major video formats.",
  },
  {
    icon: Trophy,
    title: "Monthly Contests",
    description:
      "Participate in themed contests and win prizes. Show off your creativity and get recognized.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with fellow creators, collaborate on projects, and build lasting relationships.",
  },
  {
    icon: Star,
    title: "Get Discovered",
    description:
      "Our algorithm helps viewers find your content. Build your audience and grow your following.",
  },
];

export function LearnMore() {
  return (
    <section className="bg-muted/50 p-6 flex justify-center w-full">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Why Choose IsabiTv?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We provide everything you need to share your creativity with the
            world
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
