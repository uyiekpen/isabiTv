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
        {/* Hero Section - Optimized for Mobile */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:h-[95vh] flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/auth.jpg"
              alt="African Heritage"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-teal-900/80" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto py-8 sm:py-12">
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <h1 className="mb-3 sm:mb-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-tight">
                <span className="text-green-300">iSabi</span>
                <span className="text-white">TV</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-green-200 mb-4 sm:mb-6 px-2">
                Where Black Stories Live, Breathe, and Thrive
              </p>
            </div>

            <div className="mb-6 sm:mb-8 lg:mb-10">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium opacity-90 max-w-4xl mx-auto leading-relaxed px-2">
                We are the digital griot of our time, preserving and sharing the
                rich tapestry of Black experiences across the globe.
                <br className="hidden sm:inline" />
                <span className="block sm:inline font-semibold text-green-300 mt-2 sm:mt-0">
                  From our ancestors' wisdom to tomorrow's innovations - every
                  story matters.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                asChild
              >
                <Link href="/auth/signup">Join Our Community</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-300 text-green-300 hover:bg-green-300 hover:text-black bg-transparent w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold"
                asChild
              >
                <Link href="/library">Explore Stories</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Core Values Section - Mobile Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Foundation
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Built on the pillars of African storytelling tradition and
                modern digital innovation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                      <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Section - Mobile Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The iSabiTV Journey
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Every great movement begins with a story. Here's ours.
              </p>
            </div>

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {brandStory.map((story, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    className={`flex flex-col gap-6 sm:gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Image Section */}
                    <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="flex w-full lg:w-1/2 flex-col justify-center p-4 sm:p-6 lg:p-8">
                      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-full flex-shrink-0">
                          <story.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            {story.title}
                          </h3>
                          <p className="text-base sm:text-lg text-green-600 dark:text-green-400 font-medium">
                            {story.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statistics - Mobile Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Our Growing Impact
              </h2>
              <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto px-4">
                Together, we're building something beautiful and powerful
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {impact.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-green-200">
                    {stat.number}
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80 px-2">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Mobile Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Ready to Add Your Voice to the Chorus?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed px-4">
                Whether you're a storyteller, educator, artist, entrepreneur, or
                simply someone with a story to share - iSabiTV is your platform.
                Join thousands of creators who are reshaping how Black stories
                are told and celebrated.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                  asChild
                >
                  <Link href="/auth/signup">Start Your Journey</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-300 text-green-300 hover:bg-green-300 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-transparent w-full sm:w-auto"
                  asChild
                >
                  <Link href="/library">Discover Stories</Link>
                </Button>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700">
                <p className="text-base sm:text-lg font-medium text-green-300 mb-2">
                  "Sankofa" - Look back to move forward
                </p>
                <p className="text-xs sm:text-sm opacity-75 px-4">
                  We honor our past, celebrate our present, and build our future
                  - together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
