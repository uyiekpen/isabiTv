import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedVideos } from "@/components/featured-videos"
import { LearnMore } from "@/components/learn-more"
import { JoinTheFun } from "@/components/join-the-fun"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedVideos />
        <LearnMore />
        <JoinTheFun />
      </main>
      <Footer />
    </div>
  )
}
