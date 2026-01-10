import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ImageLightbox";
import { getClientImages, getClientName } from "@/lib/clients-data";

interface ClientPortfolioProps {
  clientId: string;
}

export default function ClientPortfolio({ clientId }: ClientPortfolioProps) {
  const images = getClientImages(clientId);
  const clientName = getClientName(clientId);
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll to top when component mounts or clientId changes
  useEffect(() => {
    // Use setTimeout to ensure DOM is ready
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Also scroll after a small delay to handle any layout shifts
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [clientId]);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Removed debug logs
  
  // Handle case where no images are found
  if (!images || images.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main>
          <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4 sm:mb-6 text-white">
                Client Not Found
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                No images found for client {clientId}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const initialImages = images.slice(0, 6);
  const remainingImages = images.slice(6);
  const displayedImages = showAll ? images : initialImages;
  const hasMoreImages = remainingImages.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main>
        <section ref={sectionRef} className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <Link 
            href="/" 
            className={`inline-flex items-center text-gray-400 hover:text-white transition-all duration-[2000ms] ease-out mb-6 sm:mb-8 ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4 sm:mb-6 text-white transition-all duration-[2000ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}
          style={{ transitionDelay: '0.2s' }}>
            {clientName}
          </h1>
          <p className={`text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 transition-all duration-[2000ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-12'
          }`}
          style={{ transitionDelay: '0.3s' }}>
            Project Portfolio
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayedImages.map((image, index) => {
              const imageSrc = image.url || '';
              const imageLabel = image.label || 'Exterior';
              
              return (
                <div 
                  key={`image-${index}-${imageSrc.slice(-10)}`} 
                  className={`relative transition-all duration-[1800ms] ease-out cursor-pointer ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 translate-x-0' 
                      : 'opacity-0 translate-y-12 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                  onClick={() => {
                    if (imageSrc) {
                      setSelectedImage(imageSrc);
                    }
                  }}
                >
                <div 
                  className="relative group overflow-hidden bg-gray-900"
                  style={{ 
                    aspectRatio: '4 / 3',
                    position: 'relative',
                    borderRadius: '0.75rem'
                  }}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={`${clientName} - Image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{
                        display: 'block',
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.75rem'
                      }}
                      loading={index < 6 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-500 text-xs bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg">Failed to load</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-xs bg-gray-200 border-2 border-dashed border-gray-300">
                      No image data
                    </div>
                  )}
                  </div>
                  {/* Label at bottom left outside the image */}
                  <div className="mt-2">
                    <span className="text-white text-xs sm:text-sm font-medium uppercase tracking-wider">
                      {imageLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {hasMoreImages && !showAll && (
            <div 
              className={`flex justify-center mt-8 sm:mt-12 transition-all duration-[2000ms] ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 translate-x-0' 
                  : 'opacity-0 translate-y-8 translate-x-8'
              }`}
              style={{ transitionDelay: `${0.4 + displayedImages.length * 0.1 + 0.2}s` }}
            >
              <Button
                onClick={() => setShowAll(true)}
                variant="outline"
                className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase"
              >
                View More
              </Button>
            </div>
          )}

          {showAll && hasMoreImages && (
            <div className="flex justify-center mt-8 sm:mt-12">
              <Button
                onClick={() => {
                  setShowAll(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                variant="outline"
                className="rounded-none border-white text-white text-[9px] sm:text-[10px] font-bold tracking-[0.2em] px-6 sm:px-8 h-9 sm:h-10 hover:bg-white hover:text-black transition-colors uppercase"
              >
                Show Less
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
      
      {selectedImage && (
        <ImageLightbox
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage}
          imageAlt={`${clientName} - Portfolio Image`}
        />
      )}
    </div>
  );
}

