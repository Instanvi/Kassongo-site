"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Testimonial, ITestimonial } from "@/types/testimonial";

interface TestimonialSliderProps {
  testimonials?: ITestimonial[] | Testimonial[];
  autoPlayInterval?: number;
  className?: string;
  title?: string;
  subtitle?: string;
}

const colorThemes = {
  green: {
    bg: "bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-800",
    accent: "text-amber-400",
    badge: "bg-emerald-800/60 border border-emerald-700/50",
    button: "bg-emerald-950/60 hover:bg-emerald-900/80 text-white",
    dot: "bg-emerald-200/40",
    dotActive: "bg-amber-400",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800",
    accent: "text-sky-300",
    badge: "bg-blue-800/60 border border-blue-700/50",
    button: "bg-blue-950/60 hover:bg-blue-900/80 text-white",
    dot: "bg-blue-200/40",
    dotActive: "bg-sky-400",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-800",
    accent: "text-purple-300",
    badge: "bg-purple-800/60 border border-purple-700/50",
    button: "bg-purple-950/60 hover:bg-purple-900/80 text-white",
    dot: "bg-purple-200/40",
    dotActive: "bg-purple-400",
  },
  orange: {
    bg: "bg-gradient-to-br from-amber-950 via-orange-900 to-amber-800",
    accent: "text-amber-300",
    badge: "bg-orange-800/60 border border-orange-700/50",
    button: "bg-orange-950/60 hover:bg-orange-900/80 text-white",
    dot: "bg-orange-200/40",
    dotActive: "bg-amber-400",
  },
  teal: {
    bg: "bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-800",
    accent: "text-teal-300",
    badge: "bg-teal-800/60 border border-teal-700/50",
    button: "bg-teal-950/60 hover:bg-teal-900/80 text-white",
    dot: "bg-teal-200/40",
    dotActive: "bg-teal-300",
  },
};

export default function TestimonialSlider({
  testimonials: customTestimonials,
  autoPlayInterval = 6000,
  className = "",
  title = "What Global Traders Say About Kassongo",
  subtitle = "Trusted by businesses across Africa, Europe, Asia & North America for end-to-end trade logistics",
}: TestimonialSliderProps) {
  const testimonialsList = (customTestimonials && customTestimonials.length > 0)
    ? customTestimonials
    : Testimonial.getGlobalTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentItem = testimonialsList[currentIndex];
  const theme = colorThemes[currentItem.color] || colorThemes.green;

  useEffect(() => {
    if (!isAutoPlaying || testimonialsList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsList.length, autoPlayInterval]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (testimonialsList.length === 0) return null;

  return (
    <section className={`py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="relative min-h-[400px] md:min-h-[440px]">
          {/* Main Testimonial Card */}
          <div
            className={`${theme.bg} text-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[400px] md:min-h-[440px] flex flex-col justify-between border border-white/10`}
          >
            {/* Decorative Ambient Glows */}
            <div className="absolute -top-12 -right-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Quote Watermark Icon */}
            <div className="absolute top-6 left-6 opacity-10 pointer-events-none">
              <Quote className="w-24 h-24 md:w-36 md:h-36" />
            </div>

            <div className="relative z-10 space-y-6 my-auto">
              {/* Rating Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(currentItem.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-2xl lg:text-3xl font-display font-semibold leading-relaxed">
                &ldquo;{currentItem.quote}&rdquo;
              </blockquote>

              {/* Author & Location Details */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/15">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-white">{currentItem.author}</p>
                  <p className={`text-sm ${theme.accent} font-medium`}>{currentItem.role}</p>
                  <p className="text-xs text-white/80 font-medium">
                    {currentItem.company} {currentItem.location ? `• ${currentItem.location}` : ""}
                  </p>
                </div>

                {currentItem.companyLogo && (
                  <div className={`${theme.badge} px-5 py-2.5 rounded-xl`}>
                    <img
                      src={currentItem.companyLogo}
                      alt={`${currentItem.company} logo`}
                      className="h-7 w-auto object-contain invert"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Desktop */}
          {testimonialsList.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={`hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 ${theme.button} rounded-full items-center justify-center transition-transform hover:scale-110 shadow-lg backdrop-blur-md border border-white/20 z-20 cursor-pointer`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className={`hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 ${theme.button} rounded-full items-center justify-center transition-transform hover:scale-110 shadow-lg backdrop-blur-md border border-white/20 z-20 cursor-pointer`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-center justify-center gap-4 mt-6">
                <button
                  onClick={goToPrevious}
                  className="w-11 h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="w-11 h-11 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {testimonialsList.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonialsList.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? `${theme.dotActive} w-8`
                    : `${theme.dot} w-2.5 hover:opacity-80`
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
