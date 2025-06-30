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
    image: "/images/impact-3.jpg",
  },
  {
    icon: Lightbulb,
    title: "OUR VISION",
    subtitle:
      "A dedicated, safe space for valuable stories & content that elevates Black society",
    description:
      "A fundamental design choice of the iSabiTV platform is not to allow vulgar or sensual content. Too much of the available video content online is oversexualized, and we see this as a barrier to using video media to empower the next generation. Inspirational and educational stories can be more impactful when not overly sexualized, and iSabiTV will be the place for such high-quality content.",
    image: "/images/impact-2.jpg",
  },

  {
    icon: Star,
    title: "Become A Creator",
    description:
      "We are building the largest online repository of stories showcasing Black culture, education and inspirational content. We work with produced and user-generated content creators. This includes Radio stations, TV stations, Independent creators, Journalists, and any enthusiasts that has a story or knowledge to tell. Upload and share Afrocentric stories and express yourself to the world with you voice.",
    image: "/images/impact-4.jpg",
  },
  {
    icon: Star,
    title: "Become A Creator",
    description:
      "We are building the largest online repository of stories showcasing Black culture, education and inspirational content. We work with produced and user-generated content creators. This includes Radio stations, TV stations, Independent creators, Journalists, and any enthusiasts that has a story or knowledge to tell. Upload and share Afrocentric stories and express yourself to the world with you voice.",
    image: "/images/impact-4.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className=" flex justify-center flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 py-20 text-white">
          <div className="container">
            <div className="mx-auto max-w text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                What We Believe
              </h1>
              {/* <p className=" text-xl leading-relaxed">
                Use online videos to empower Black communities
              </p> */}
              <p className="text-lg opacity-90">
                We built the platform for Afrocentric content. Let's discover
                what's possible <br/>when you have a dedicated environment designed
                to feature content FROM our Black community and FOR our Black
                community.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="p-8 flex justify-center">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">
                  Our Vision
                </h2>
                <p className="text-xl text-muted-foreground">
                  A dedicated, safe space for valuable stories & content that
                  elevates Black society
                </p>
              </div> */}

              {/* <Card className="border-none">
                <p className="text-lg leading-relaxed">
                  A fundamental design choice of the iSabiTV platform is not to
                  allow vulgar or sensual content. Too much of the available
                  video content online is oversexualized, and we see this as a
                  barrier to using video media to empower the next generation.
                  Inspirational and educational stories can be more impactful
                  when not overly sexualized, and iSabiTV will be the place for
                  such high-quality content.
                </p>
              </Card> */}

              {/* <div className="grid gap-6 md:grid-cols-2">
                {beliefs.map((belief, index) => (
                  <Card key={index}>
                    <div className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <belief.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {belief.title}
                      </h3>
                      <p className="text-base text-muted-foreground">
                        {belief.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div> */}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-muted/50 p-8 flex justify-center">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              {/* <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">
                  The Positive Impact of Online Video on the Black Community
                </h2>
                <p className="text-lg text-muted-foreground">
                  Online video has already demonstrated the potential to change
                  lives and empower anyone with an internet connection. iSabiTV
                  sees an opportunity to accelerate the value created for Black
                  communities worldwide by providing a platform that only
                  features Black stories and content.
                </p>
              </div> */}

              <div className="space-y-8">
                {impact.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`flex flex-col ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      <div className="relative w-full sm:w-1/2 h-64 sm:h-auto">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex w-full sm:w-1/2 flex-col justify-center p-6">
                        <h3 className="mb-4 text-2xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-base text-muted-foreground">
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
        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Join Our Community
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
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
