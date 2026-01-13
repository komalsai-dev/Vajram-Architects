import { useEffect, useRef, useState, useCallback } from "react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt = "Image" }: ImageLightboxProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);

  // Reset zoom when image changes or lightbox closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setLastTouchDistance(null);
    }
  }, [isOpen, imageSrc]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Calculate distance between two touches for pinch zoom
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle mouse wheel zoom (desktop) - zoom towards mouse position
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isOpen || !imageRef.current) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(1, scale + delta), 3); // Limit zoom between 1x and 3x
    
    if (newScale !== scale && imageRef.current) {
      const img = imageRef.current;
      const rect = img.getBoundingClientRect();
      
      // Calculate mouse position relative to image (0-1)
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Set transform origin to mouse position
      img.style.transformOrigin = `${mouseX * 100}% ${mouseY * 100}%`;
      setScale(newScale);
    }
  }, [isOpen, scale]);

  // Touch handlers for pinch zoom (mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / lastTouchDistance;
      let newScale = scale * scaleChange;
      
      // Limit zoom between 1x and 3x
      newScale = Math.min(Math.max(1, newScale), 3);
      
      setScale(newScale);
      setLastTouchDistance(distance);
    }
  }, [scale, lastTouchDistance]);

  const handleTouchEnd = useCallback(() => {
    setLastTouchDistance(null);
  }, []);

  // Set up wheel event listener for zoom
  useEffect(() => {
    if (isOpen && imageRef.current) {
      const img = imageRef.current;
      const container = img.parentElement;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
          container.removeEventListener("wheel", handleWheel);
        };
      }
    }
  }, [isOpen, handleWheel]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const backdrop = e.currentTarget;
    
    // Close if clicking on backdrop (not on image)
    if (target === backdrop) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out",
        }}
        draggable={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={(e) => {
          // Show zoom cursor only when hovering over image
          e.currentTarget.style.cursor = scale > 1 ? "zoom-out" : "zoom-in";
        }}
        onMouseLeave={(e) => {
          // Remove cursor when not hovering
          e.currentTarget.style.cursor = "default";
        }}
      />
    </div>
  );
}
