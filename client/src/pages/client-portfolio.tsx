import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getClientImages, getClientName } from "@/lib/clients-data";

interface ClientPortfolioProps {
  clientId: string;
}

export default function ClientPortfolio({ clientId }: ClientPortfolioProps) {
  const images = getClientImages(clientId);
  const clientName = getClientName(clientId);
  const [showAll, setShowAll] = useState(false);
  
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
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4 sm:mb-6 text-white">
            {clientName}
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12">
            Project Portfolio
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayedImages.map((image, index) => {
              // Ensure image is a valid string
              const imageSrc = typeof image === 'string' ? image : '';
              
              return (
                <div 
                  key={`image-${index}-${imageSrc.slice(-10)}`} 
                  className="relative group overflow-hidden bg-gray-900 cursor-pointer rounded-sm"
                  style={{ 
                    aspectRatio: '4 / 3',
                    position: 'relative'
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
                        height: '100%'
                      }}
                      loading={index < 6 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-500 text-xs bg-gray-900 border-2 border-dashed border-gray-700">Failed to load</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-xs bg-gray-200 border-2 border-dashed border-gray-300">
                      No image data
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {hasMoreImages && !showAll && (
            <div className="flex justify-center mt-8 sm:mt-12">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

