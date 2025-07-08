import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Mic, Users, Globe } from "lucide-react"; // Changed icons for better cultural representation
import Link from "next/link";

const features = [
  {
    icon: Upload,
    title: "Seamless Video Upload",
    description:
      "Easily share your skits, dance clips, spoken word, or short films. Just drag and drop — we handle the rest.",
  },
  {
    icon: Mic,
    title: "Showcase African Stories",
    description:
      "Tell authentic stories through music, film, and culture. IsabiTV is where Black creativity thrives.",
  },
  {
    icon: Users,
    title: "Community of Creators",
    description:
      "Join a vibrant network of African creators — from Abuja to Accra, Nairobi to NYC. Collaborate and grow together.",
  },
  {
    icon: Globe,
    title: "Reach Global Audiences",
    description:
      "Our discovery tools help your voice travel. Get seen by fans across the diaspora and beyond.",
  },
];

export function LearnMore() {
  return (
    <section className="bg-muted/50 p-6 md:p-12 flex justify-center w-full">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Why Create on IsabiTV?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We empower Black creators to share, shine, and connect on a platform
            built for you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#DBF2D1]">
                  <feature.icon className="h-6 w-6 text-[#4DD90D]" />
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
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-br from-primary via-secondary to-accent text-white font-semibold shadow hover:brightness-110 transition rounded-[50px]"
          >
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
