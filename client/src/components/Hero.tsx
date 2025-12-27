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
  const [heroStyles, setHeroStyles] = useState({ marginTop: '-90px', height: 'calc(100vh + 90px)', minHeight: 'calc(100vh + 90px)' });

  // Trigger text animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300); // Small delay for smooth entrance
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality: fade to next image every 4 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Dynamically calculate hero section styles based on actual navbar height
  // This ensures no gaps appear when navbar size changes (works for both mobile and desktop)
  useEffect(() => {
    const updateStyles = () => {
      const navbar = document.getElementById('main-navbar');
      if (!navbar) {
        // Fallback values if navbar not found
        const width = window.innerWidth;
        if (width >= 768) {
          setHeroStyles({ marginTop: '-97px', height: 'calc(90vh + 97px)', minHeight: 'calc(90vh + 97px)' });
        } else {
          setHeroStyles({ marginTop: '-97px', height: 'calc(90vh + 97px)', minHeight: 'calc(90vh + 97px)' });
        }
        return;
      }

      // Measure the actual navbar height (includes padding, border, etc.)
      const navbarHeight = navbar.offsetHeight;
      const width = window.innerWidth;

      if (width >= 768) {
        // Desktop: increased height to 90vh for better image coverage
        setHeroStyles({ 
          marginTop: `-${navbarHeight}px`, 
          height: `calc(90vh + ${navbarHeight}px)`, 
          minHeight: `calc(90vh + ${navbarHeight}px)` 
        });
      } else {
        // Mobile/Tablet: increased height to 90vh for better image coverage and more bottom space
        setHeroStyles({ 
          marginTop: `-${navbarHeight}px`, 
          height: `calc(90vh + ${navbarHeight}px)`, 
          minHeight: `calc(90vh + ${navbarHeight}px)` 
        });
      }
    };

    // Initial calculation - delay slightly to ensure navbar is rendered
    const timeoutId = setTimeout(() => {
      updateStyles();
    }, 50);

    // Update on resize
    window.addEventListener('resize', updateStyles);
    
    // Also update when DOM changes (in case navbar size changes)
    const resizeObserver = new ResizeObserver(() => {
      updateStyles();
    });
    
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      resizeObserver.observe(navbar);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateStyles);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section 
      className="relative w-full bg-black md:-mt-16 md:h-screen"
      style={heroStyles}
    >
      {/* Fade-based image carousel with smooth crossfade */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 z-10 blur-0' 
                : 'opacity-0 z-0 blur-sm'
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden m-0 p-0">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-[20s] ease-out scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Gradient Overlay for better text readability - Full coverage for centered content */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Fixed Text Overlay - Positioned further down on mobile, centered on desktop */}
      <div className="absolute top-[75%] md:top-[65%] left-0 w-full px-4 sm:px-6 md:px-8 lg:px-12 -translate-y-1/2 z-20 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          {/* Heading - Mobile: smaller, Desktop: original */}
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-white mb-3 sm:mb-4 md:mb-6 leading-tight transition-all duration-[2000ms] ease-out ${
              isTextVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Designing Spaces That Define Luxury
          </h1>
          
          {/* Sub-Heading - Mobile: smaller, Desktop: original */}
          <p 
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-sans leading-relaxed max-w-xl transition-all duration-[2000ms] ease-out ${
              isTextVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Modern architecture, bespoke interiors, and premium living - built around your lifestyle.
          </p>
          
          {/* CTA Button - Mobile: smaller, Desktop: original */}
          <Button
            onClick={() => {
              const projectsSection = document.getElementById("guntur");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={`rounded-none border-white bg-white text-black hover:bg-gray-100 hover:text-black text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.2em] px-4 sm:px-6 md:px-8 lg:px-10 h-9 sm:h-10 md:h-12 lg:h-14 uppercase transition-all duration-[2000ms] ease-out ${
              isTextVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            Explore Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
