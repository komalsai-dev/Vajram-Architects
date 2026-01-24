import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: string;
  image: string;
  title?: string;
  caption?: string;
}

interface HeroProps {
  slides: Slide[];
}

export function Hero({ slides }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Trigger text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-screen min-h-[100dvh] h-[100dvh] bg-black overflow-hidden m-0 p-0 left-1/2 -translate-x-1/2">
      {/* Fade-based image carousel */}
      <div className="absolute inset-0 w-full h-full p-0 m-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className="w-full h-full object-cover p-0 m-0"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Enhanced Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-end pb-24 sm:pb-32 md:pb-16 px-5 sm:px-8 md:px-12 z-20 pointer-events-none">
        <div className="w-full max-w-[90vw] sm:max-w-2xl md:max-w-4xl pointer-events-auto">
          {/* Heading */}
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal font-serif tracking-tight text-white mb-4 sm:mb-6 leading-[1.15] break-words transition-all duration-[1500ms] ease-out ${isTextVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            Designing Spaces <br className="hidden sm:block" />
            That Define Luxury
          </h1>

          {/* Sub-Heading */}
          <p
            className={`text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 font-sans font-light leading-relaxed max-w-xl transition-all duration-[1500ms] ease-out delay-100 ${isTextVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            Modern architecture, bespoke interiors, and premium living - built around your lifestyle.
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => {
              const projectsSection = document.getElementById("guntur");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={`rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white text-xs sm:text-sm font-bold tracking-[0.2em] px-8 sm:px-10 h-12 sm:h-14 uppercase transition-all duration-300 ease-out delay-200 cursor-pointer ${isTextVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
}