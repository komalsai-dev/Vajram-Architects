import { useEffect, useRef, useState, useCallback } from "react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt = "Image" }: ImageLightboxProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);

  // Reset zoom and position when image changes or lightbox closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
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
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Calculate distance between two touches for pinch zoom
  const getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle mouse wheel zoom (desktop)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isOpen || !imageContainerRef.current) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 5); // Limit zoom between 1x and 5x
    
    if (newScale !== scale) {
      // Zoom towards mouse position
      const rect = imageContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      
      const scaleChange = newScale / scale;
      const newX = mouseX - (mouseX - position.x) * scaleChange;
      const newY = mouseY - (mouseY - position.y) * scaleChange;
      
      setScale(newScale);
      setPosition({ x: newX, y: newY });
    }
  }, [isOpen, scale, position]);

  // Handle mouse drag (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Constrain panning to keep image within bounds
      const container = imageContainerRef.current;
      const image = imageRef.current;
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const maxX = Math.max(0, (imageRect.width * scale - containerRect.width) / 2);
        const maxY = Math.max(0, (imageRect.height * scale - containerRect.height) / 2);
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [isDragging, scale, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for pinch zoom and pan (mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && scale > 1) {
      // Single touch pan
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / lastTouchDistance;
      const newScale = Math.min(Math.max(1, scale * scaleChange), 5);
      
      if (newScale !== scale) {
        // Calculate center point between touches
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        
        const rect = imageContainerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = centerX - rect.left - rect.width / 2;
          const mouseY = centerY - rect.top - rect.height / 2;
          
          const scaleFactor = newScale / scale;
          const newX = mouseX - (mouseX - position.x) * scaleFactor;
          const newY = mouseY - (mouseY - position.y) * scaleFactor;
          
          setScale(newScale);
          setPosition({ x: newX, y: newY });
        }
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Single touch pan
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      // Constrain panning
      const container = imageContainerRef.current;
      const image = imageRef.current;
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const maxX = Math.max(0, (imageRect.width * scale - containerRect.width) / 2);
        const maxY = Math.max(0, (imageRect.height * scale - containerRect.height) / 2);
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY)),
        });
      } else {
        setPosition({ x: newX, y: newY });
      }
    }
  }, [scale, position, dragStart, isDragging, lastTouchDistance]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(null);
  }, []);

  // Set up global mouse event listeners for drag
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isOpen, handleMouseMove, handleMouseUp]);

  // Set up wheel event listener for zoom
  useEffect(() => {
    if (isOpen && imageContainerRef.current) {
      const container = imageContainerRef.current;
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isOpen, handleWheel]);

  // Handle backdrop click to close (works for both mouse and touch)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't close if dragging
    if (isDragging) return;
    
    // Check if the click is on the backdrop itself (not on the image or its container)
    const target = e.target as HTMLElement;
    const backdrop = e.currentTarget;
    
    // Close only if clicking directly on the backdrop (not on the image container or image)
    if (target === backdrop) {
      onClose();
    }
  };

  // Prevent image container clicks from closing the lightbox (but allow drag)
  const handleImageContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only stop propagation if not dragging (to allow backdrop close when not dragging)
    if (!isDragging) {
      e.stopPropagation();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={imageContainerRef}
        className="relative inline-flex items-center justify-center overflow-hidden"
        style={{
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
        }}
        onClick={handleImageContainerClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl select-none pointer-events-auto"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}