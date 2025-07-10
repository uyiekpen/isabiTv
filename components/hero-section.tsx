"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "Unleash Your Creative Power",
    subtitle: "The Home for Bold and Original Storytelling",
    description:
      "From short films to cultural commentary, bring your vision to life and connect with an audience that values authenticity. Share your story with the world.",
    ctaText: "Explore Creators",
    image: "/auth.jpg",
  },
  {
    id: 2,
    title: "Shine in Monthly Spotlight Challenges",
    subtitle: "Get Recognized, Win Rewards, Grow Your Reach",
    description:
      "Join vibrant competitions that celebrate creativity. Earn cash, visibility, and a spot in the spotlight—every single month.",
    ctaText: "Join the Challenge",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Grow Your Voice, Build Your Tribe",
    subtitle: "Connect with Viewers Who Get You",
    description:
      "IsabiTV helps you grow a loyal audience, collaborate with fellow creators, and build a personal brand that makes impact.",
    ctaText: "Start Creating",
    image: "/3.jpg",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="relative h-[700px] md:h-[100vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority
            className={`
              object-cover absolute transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
        {/* Green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-900/70 to-teal-900/80" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Slide Content */}
      <div
        key={currentSlide}
        className="relative z-10 flex flex-col justify-center items-center text-center text-white px-4 pt-28 h-full space-y-6 max-w-4xl mx-auto animate-fade-in"
      >
        <h2 className="text-lg md:text-xl font-medium text-green-200 uppercase tracking-wide">
          {heroSlides[currentSlide].subtitle}
        </h2>

        {/* Enhanced Title with Green Gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-green-100 to-green-200 bg-clip-text text-transparent">
          {heroSlides[currentSlide].title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
          {heroSlides[currentSlide].description}
        </p>

        {/* Enhanced CTA Button */}
        <Button
          size="lg"
          asChild
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-500 hover:border-green-400"
        >
          <Link href="/library">{heroSlides[currentSlide].ctaText}</Link>
        </Button>
      </div>

      {/* Navigation Arrows */}
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-green-600/20 hover:text-green-200 h-12 w-12 z-10 border border-white/20 hover:border-green-400/50 transition-all duration-300"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button> */}

      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-green-600/20 hover:text-green-200 h-12 w-12 z-10 border border-white/20 hover:border-green-400/50 transition-all duration-300"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button> */}

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-green-400 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
}
