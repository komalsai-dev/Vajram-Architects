import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export function ImageLightbox({ isOpen, onClose, imageSrc, imageAlt = "Image" }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Calculate distance between two touches
  const getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isOpen) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 5); // Limit zoom between 1x and 5x
    
    if (newScale !== scale) {
      // Zoom towards mouse position
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const scaleChange = newScale / scale;
        const newX = mouseX - (mouseX - position.x) * scaleChange;
        const newY = mouseY - (mouseY - position.y) * scaleChange;
        
        setScale(newScale);
        setPosition({ x: newX, y: newY });
      }
    }
  }, [isOpen, scale, position]);

  // Handle mouse drag
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
      
      // Get container and image dimensions to constrain panning
      const container = containerRef.current;
      const image = imageRef.current;
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const maxX = (imageRect.width - containerRect.width) / 2;
        const maxY = (imageRect.height - containerRect.height) / 2;
        
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

  // Touch handlers for pinch zoom and pan
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
        
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = centerX - rect.left;
          const mouseY = centerY - rect.top;
          
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
      const container = containerRef.current;
      const image = imageRef.current;
      if (container && image) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        
        const maxX = (imageRect.width - containerRect.width) / 2;
        const maxY = (imageRect.height - containerRect.height) / 2;
        
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

  // Set up global mouse event listeners
  useEffect(() => {
    if (isOpen) {
      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        if (container) {
          container.removeEventListener("wheel", handleWheel);
        }
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isOpen, handleWheel, handleMouseMove, handleMouseUp]);

  // Handle backdrop click to close (but not when dragging)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isDragging) {
      onClose();
    }
  };

  // Prevent image click from closing the lightbox
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={containerRef}
        className="relative max-w-[85vw] max-h-[85vh] w-auto h-auto flex items-center justify-center"
        onClick={handleImageClick}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          className={cn(
            "max-w-full max-h-[85vh] object-contain select-none rounded-lg shadow-2xl",
            scale > 1 && "cursor-move",
            scale === 1 && "cursor-zoom-in"
          )}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
            transformOrigin: "center center",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          draggable={false}
        />
      </div>
    </div>
  );
}