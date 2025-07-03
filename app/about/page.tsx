import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Globe,
  Video,
  Heart,
  Star,
  Trophy,
  Play,
  Upload,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Ubuntu Gradient */}
      <section className="relative bg-ubuntu-gradient text-white py-24 overflow-hidden">
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float-delayed"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Ubuntu Spirit - I am because we are
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About <span className="text-yellow-300">IsabiTV</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              A community-driven platform where creators connect, share stories,
              and build meaningful relationships. Embracing the Ubuntu
              philosophy that we are stronger together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-secondary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Videos Shared</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-accent-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10M+</div>
              <div className="text-gray-600">Connections Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-200">
                  Our Beginning
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Born from the Ubuntu Philosophy
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  IsabiTV was founded on the African philosophy of Ubuntu - "I
                  am because we are." We believe that individual success is
                  meaningless without community prosperity. Our platform was
                  designed to break down barriers and create genuine connections
                  between creators worldwide.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  What started as a small project to help local creators share
                  their stories has grown into a global movement of
                  storytellers, educators, and community builders who understand
                  that our diversity is our strength.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-secondary-100 text-secondary-700"
                  >
                    <Star className="mr-1 h-3 w-3" />
                    Community First
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-accent-100 text-accent-700"
                  >
                    <Trophy className="mr-1 h-3 w-3" />
                    Creator Success
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-primary-100 text-primary-700"
                  >
                    <Heart className="mr-1 h-3 w-3" />
                    Authentic Connections
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-ubuntu-gradient-soft">
                  <Image
                    src="/img1.jpg"
                    alt="Community gathering"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-ubuntu-gradient rounded-2xl flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-ubuntu-gradient-soft">
                  <Image
                    src="/img2.jpg"
                    alt="Creator collaboration"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-500 rounded-2xl flex items-center justify-center">
                  <Video className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <Badge className="mb-4 bg-secondary-100 text-secondary-700 hover:bg-secondary-200">
                  Our Mission
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Empowering Every Voice
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We're not just another video platform. We're a movement
                  dedicated to ensuring every creator has the tools, community,
                  and support they need to share their unique perspective with
                  the world.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Through innovative features, fair monetization, and genuine
                  community building, we're creating a space where authenticity
                  thrives and meaningful connections are formed across cultural
                  and geographical boundaries.
                </p>
                <Link href="/upload">
                  <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Start Creating Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4 bg-accent-100 text-accent-700 hover:bg-accent-200">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600">
              These principles guide every decision we make and every feature we
              build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Users className="h-8 w-8 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Community First
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every feature we build starts with one question: "How does
                  this serve our community?" We prioritize collective growth
                  over individual profit.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                  <Heart className="h-8 w-8 text-secondary-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Authentic Connection
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We foster genuine relationships over superficial metrics. Real
                  engagement and meaningful interactions are what make our
                  community special.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  <Globe className="h-8 w-8 text-accent-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Global Inclusion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We celebrate diversity and ensure our platform is accessible
                  to creators from all backgrounds, cultures, and circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <Star className="h-8 w-8 text-yellow-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Creator Empowerment
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We provide the tools, resources, and support creators need to
                  turn their passion into sustainable success while maintaining
                  creative freedom.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Trophy className="h-8 w-8 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to continuous improvement, innovation, and
                  delivering the highest quality experience for our creators and
                  viewers.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Video className="h-8 w-8 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We embrace new technologies and creative solutions to solve
                  real problems and enhance the creator experience on our
                  platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section className="py-20 bg-ubuntu-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Be Part of Something Bigger?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of creators who have found their community on
              IsabiTV. Because when we succeed together, we all rise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-white/90"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                </Button>
              </Link>
              <Link href="/library">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Content
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
