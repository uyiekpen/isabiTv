import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Shield,
  Globe,
  Star,
  BookOpen,
  Lightbulb,
  Award,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const beliefs = [
  {
    icon: Heart,
    title: "A Dedicated Safe Space",
    description:
      "We provide a dedicated, safe space for valuable stories & content that elevates Black society, free from vulgar or overly sexualized content.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description:
      "Our platform is built FROM our Black community and FOR our Black community, fostering connection and cultural exchange worldwide.",
  },
  {
    icon: Shield,
    title: "High-Quality Standards",
    description:
      "We maintain strict content standards to ensure inspirational and educational stories can be more impactful in a respectful environment.",
  },
  {
    icon: Globe,
    title: "Global Black Stories",
    description:
      "We connect Black creators and audiences worldwide, celebrating the diversity and richness of Black experiences across cultures.",
  },
];

const impact = [
  {
    icon: Award,
    title: "About Us",
    description:
      "Our platform is dedicated to documenting, archiving, and preserving black stories. We believe that every voice matters and we strive to empower the black community by providing a space to share their experiences. Whether you're an individual, a small business, or a large organization, we welcome you to join us on this journey of discovery and growth. Our team is committed to providing the best experience for our users. We value transparency, authenticity, and inclusivity, and we aim to reflect these values in everything we do.",
    image: "/auth.jpg",
  },
  {
    icon: Lightbulb,
    title: "OUR VISION",
    subtitle:
      "A dedicated, safe space for valuable stories & content that elevates Black society",
    description:
      "A fundamental design choice of the iSabiTV platform is not to allow vulgar or sensual content. Too much of the available video content online is oversexualized, and we see this as a barrier to using video media to empower the next generation. Inspirational and educational stories can be more impactful when not overly sexualized, and iSabiTV will be the place for such high-quality content.",
    image: "/auth.jpg",
  },
  {
    icon: Star,
    title: "Become A Creator",
    description:
      "We are building the largest online repository of stories showcasing Black culture, education and inspirational content. We work with produced and user-generated content creators. This includes Radio stations, TV stations, Independent creators, Journalists, and any enthusiasts that has a story or knowledge to tell. Upload and share Afrocentric stories and express yourself to the world with you voice.",
    image: "/auth.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col justify-center">
        {/* Hero Section with background image */}
        <section className="relative h-[80vh] flex items-center justify-center bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src="/auth.jpg" // Replace with your preferred hero background image
              alt="Hero Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 px-4 text-center max-w-4xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight">
              What We Believe
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium opacity-90">
              We built the platform for Afrocentric content. Let's discover
              what's possible when you have a dedicated environment designed to
              feature content,
              <br className="hidden md:inline" />
              <span className="font-semibold text-white">
                FROM our Black community and FOR our Black community.
              </span>
            </p>
          </div>
        </section>

       

        {/* Impact Section */}
        <section className="bg-muted/50 py-16 px-6 sm:px-12 flex justify-center">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="space-y-16">
                {" "}
                {/* Increased spacing between items */}
                {impact.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`flex flex-col gap-6 ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      {/* Larger Image Section */}
                      <div className="relative w-full sm:w-[55%] h-80 sm:h-[400px] rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Text Section */}
                      <div className="flex w-full sm:w-[45%] flex-col justify-center p-6">
                        <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-lg text-muted-foreground dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-background dark:bg-gray-950">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Join Our Community
              </h2>
              <p className="mb-8 text-lg text-muted-foreground dark:text-gray-400">
                Be part of a movement that celebrates, educates, and empowers.
                Whether you're a creator or viewer, your voice matters in
                building a stronger Black community through storytelling.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">Join iSabiTV</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/library">Explore Content</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
