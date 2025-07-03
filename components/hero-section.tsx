"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const heroSlides = [
  {
    id: 1,
    title: "Share Your Creative Vision",
    subtitle: "Over 10,000 Videos and Creative Content",
    description:
      "Upload, share, and discover amazing videos from creators around the world. Join our community today!",
    ctaText: "Browse Videos",
    image: "/auth.jpg",
  },
  {
    id: 2,
    title: "Join Our Monthly Contests",
    subtitle: "Win Amazing Prizes Every Month",
    description:
      "Compete with other creators and showcase your talent. Monthly contests with cash prizes and recognition.",
    ctaText: "View Contests",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Build Your Audience",
    subtitle: "Connect with Viewers Worldwide",
    description:
      "Connect with viewers who love your content and grow your following. Build your personal brand today.",
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
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className={`
        object-cover absolute transition-opacity duration-1000 ease-in-out
        ${index === currentSlide ? "opacity-100" : "opacity-0"}
      `}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/90 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Slide Content */}
      <div
        key={currentSlide}
        className="relative z-10 flex flex-col justify-center items-center text-center text-white px-4 pt-28 h-full space-y-6 max-w-2xl mx-auto animate-fade-in"
      >
        <h2 className="text-lg font-medium text-white">
          {heroSlides[currentSlide].subtitle}
        </h2>

        {/* Gradient Title Text */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {heroSlides[currentSlide].title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          {heroSlides[currentSlide].description}
        </p>

        <Button
          size="lg"
          asChild
          className="bg-gradient-to-br from-primary via-secondary to-accent text-white font-semibold shadow hover:brightness-110 transition rounded-[50px]"
        >
          <Link href="/library">{heroSlides[currentSlide].ctaText}</Link>
        </Button>
      </div>

      {/* Arrows */}
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button> */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </section>
  );
}
