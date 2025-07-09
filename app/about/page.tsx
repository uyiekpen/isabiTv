import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Globe,
  BookOpen,
  Lightbulb,
  Crown,
  Mic,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const coreValues = [
  {
    icon: Mic,
    title: "Griot Tradition",
    description:
      "We carry forward the ancient African tradition of griots - master storytellers who preserve history, culture, and wisdom through powerful narratives that educate and inspire generations.",
  },
  {
    icon: Shield,
    title: "Cultural Preservation",
    description:
      "iSabiTV serves as a digital archive, preserving our stories, traditions, and wisdom for future generations while celebrating our rich heritage across the diaspora.",
  },
  {
    icon: Crown,
    title: "Black Excellence",
    description:
      "We showcase the brilliance, creativity, and achievements of Black people worldwide, creating a space where excellence is celebrated and mediocrity is not tolerated.",
  },
  {
    icon: Globe,
    title: "Diaspora Unity",
    description:
      "From Africa to the Americas, from Europe to Asia, we connect Black communities globally, fostering understanding and solidarity across borders and cultures.",
  },
];

const brandStory = [
  {
    icon: BookOpen,
    title: "Our Origin Story",
    subtitle: "Born from Necessity, Built with Purpose",
    description:
      "iSabiTV was born from the recognition that mainstream platforms often fail to adequately represent the depth, beauty, and diversity of Black experiences. We saw our stories being told through others' lenses, our achievements minimized, and our culture commodified. So we decided to create our own space - a digital homeland where Black voices aren't just heard, they're celebrated and amplified.",
    image: "/auth.jpg",
  },
  {
    icon: Globe,
    title: "Pan-African Vision",
    subtitle: "Connecting the Diaspora Through Stories",
    description:
      "From Lagos to London, from Accra to Atlanta, from Kingston to Kinshasa - iSabiTV bridges the African diaspora through shared narratives. We celebrate the unique experiences of Black communities worldwide while highlighting our common threads of resilience, creativity, and excellence. Our platform serves as a digital bridge connecting our global family.",
    image: "/img1.jpg",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Heritage",
    subtitle: "Where Ancient Wisdom Meets Modern Technology",
    description:
      "We blend cutting-edge technology with ancestral wisdom, creating a platform that honors our past while building our future. iSabiTV showcases Black innovation in tech, science, arts, and entrepreneurship, proving that we are not just consumers of technology but creators and pioneers shaping the digital landscape.",
    image: "/img2.jpg",
  },
  {
    icon: Heart,
    title: "Community First",
    subtitle: "By Us, For Us, With Love",
    description:
      "Every feature, every policy, every decision at iSabiTV is made with our community's wellbeing at heart. We're not just a platform; we're a movement. We're building more than a video sharing site - we're creating a digital sanctuary where Black excellence is the norm, not the exception.",
    image: "/img3.jpg",
  },
];

const impact = [
  {
    number: "50K+",
    label: "Stories Shared",
    description: "Authentic narratives from across the diaspora",
  },
  {
    number: "25+",
    label: "Countries Represented",
    description: "Global Black voices united on one platform",
  },
  {
    number: "100K+",
    label: "Community Members",
    description: "Growing family of creators and viewers",
  },
  {
    number: "1M+",
    label: "Hours Watched",
    description: "Educational and inspirational content consumed",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col justify-center">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-amber-900 via-red-900 to-green-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/auth.jpg"
              alt="African Heritage"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-red-900/80 to-green-900/80" />
          </div>

          <div className="relative z-10 px-4 text-center max-w-5xl">
            <div className="mb-6">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-tight">
                <span className="text-amber-300">iSabi</span>
                <span className="text-white">TV</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-amber-200 mb-6">
                Where Black Stories Live, Breathe, and Thrive
              </p>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-medium opacity-90 max-w-4xl mx-auto leading-relaxed">
              We are the digital griot of our time, preserving and sharing the
              rich tapestry of Black experiences across the globe.
              <br className="hidden md:inline" />
              <span className="font-semibold text-amber-300">
                From our ancestors' wisdom to tomorrow's innovations - every
                story matters.
              </span>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                asChild
              >
                <Link href="/auth/signup">Join Our Community</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black bg-transparent"
                asChild
              >
                <Link href="/library">Explore Stories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Foundation
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built on the pillars of African storytelling tradition and
                modern digital innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-amber-500"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                      <value.icon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The iSabiTV Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every great movement begins with a story. Here's ours.
              </p>
            </div>

            <div className="space-y-20">
              {brandStory.map((story, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    className={`flex flex-col gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative w-full lg:w-1/2 h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="flex w-full lg:w-1/2 flex-col justify-center p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
                          <story.icon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {story.title}
                          </h3>
                          <p className="text-lg text-amber-600 dark:text-amber-400 font-medium">
                            {story.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        {/* <section className="py-20 bg-gradient-to-r from-amber-600 via-red-600 to-green-600 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Growing Impact</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Together, we're building something beautiful and powerful
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impact.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold mb-2 text-amber-200">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm opacity-80">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
      
      </main>
      <Footer />
    </div>
  );
}
