import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = "Image",
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false
}: ImageLightboxProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
  const [lastTouchCenter, setLastTouchCenter] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  // Reset zoom and position when image changes or lightbox closes
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setLastTouchDistance(null);
      setLastTouchCenter(null);
      setIsDragging(false);
    }
  }, [isOpen]);

  // Reset zoom when image source changes while open
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [imageSrc]);

  // Reset position when scale returns to 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && hasPrev && onPrev) {
        onPrev();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  // Calculate distance between two touches for pinch zoom
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate center point between two touches
  const getTouchCenter = (touch1: React.Touch, touch2: React.Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Constrain position to keep image within bounds
  const constrainPosition = useCallback((x: number, y: number, currentScale: number) => {
    if (!imageRef.current || !containerRef.current) return { x: 0, y: 0 };

    const img = imageRef.current;
    const container = containerRef.current;
    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Get natural image dimensions
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    // Calculate displayed dimensions (accounting for object-contain)
    const containerAspect = containerRect.width / containerRect.height;
    const imageAspect = naturalWidth / naturalHeight;

    let displayedWidth: number;
    let displayedHeight: number;

    if (imageAspect > containerAspect) {
      displayedWidth = Math.min(containerRect.width * 0.9, naturalWidth);
      displayedHeight = displayedWidth / imageAspect;
    } else {
      displayedHeight = Math.min(containerRect.height * 0.9, naturalHeight);
      displayedWidth = displayedHeight * imageAspect;
    }

    // Scaled dimensions
    const scaledWidth = displayedWidth * currentScale;
    const scaledHeight = displayedHeight * currentScale;

    // Calculate bounds
    const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  // Handle mouse wheel zoom (desktop) - zoom towards mouse position
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isOpen || !imageRef.current || !containerRef.current) return;

    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(1, scale + delta), 3);

    if (newScale !== scale && imageRef.current) {
      const img = imageRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate mouse position relative to container center
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // Calculate new position to zoom towards mouse
      const scaleChange = newScale / scale;
      const newX = mouseX - (mouseX - position.x) * scaleChange;
      const newY = mouseY - (mouseY - position.y) * scaleChange;

      const constrained = constrainPosition(newX, newY, newScale);

      setPosition(constrained);
      setScale(newScale);
    }
  }, [isOpen, scale, position, constrainPosition]);

  // Mouse drag handlers (desktop)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setInitialPosition(position);
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const newX = initialPosition.x + deltaX;
      const newY = initialPosition.y + deltaY;

      const constrained = constrainPosition(newX, newY, scale);
      setPosition(constrained);
    }
  }, [isDragging, scale, dragStart, initialPosition, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for pinch zoom and drag (mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const center = getTouchCenter(e.touches[0], e.touches[1]);

      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const centerX = center.x - rect.left - rect.width / 2;
        const centerY = center.y - rect.top - rect.height / 2;

        setLastTouchCenter({ x: centerX, y: centerY });
      }

      setLastTouchDistance(distance);
      setIsDragging(false);
    } else if (e.touches.length === 1 && scale > 1) {
      // Single touch drag
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setInitialPosition(position);
    }
  }, [scale, position]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null && lastTouchCenter) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const scaleChange = distance / lastTouchDistance;
      let newScale = scale * scaleChange;

      // Limit zoom between 1x and 3x
      newScale = Math.min(Math.max(1, newScale), 3);

      // Calculate new position to zoom towards pinch center
      const scaleRatio = newScale / scale;
      const newX = lastTouchCenter.x - (lastTouchCenter.x - position.x) * scaleRatio;
      const newY = lastTouchCenter.y - (lastTouchCenter.y - position.y) * scaleRatio;

      const constrained = constrainPosition(newX, newY, newScale);

      setPosition(constrained);
      setScale(newScale);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Single touch drag
      e.preventDefault();
      const deltaX = e.touches[0].clientX - dragStart.x;
      const deltaY = e.touches[0].clientY - dragStart.y;
      const newX = initialPosition.x + deltaX;
      const newY = initialPosition.y + deltaY;

      const constrained = constrainPosition(newX, newY, scale);
      setPosition(constrained);
    }
  }, [lastTouchDistance, lastTouchCenter, position, isDragging, scale, dragStart, initialPosition, constrainPosition]);

  const handleTouchEnd = useCallback(() => {
    setLastTouchDistance(null);
    setLastTouchCenter(null);
    setIsDragging(false);
  }, []);

  // Set up wheel event listener for zoom
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isOpen, handleWheel]);

  // Set up mouse move and up listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const backdrop = e.currentTarget;

    // Close if clicking on backdrop (not on image) and not dragging
    if (target === backdrop && !isDragging) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 touch-none"
      onClick={handleBackdropClick}
    >
      {/* Navigation Buttons */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev?.();
          }}
          className="absolute left-2 sm:left-4 z-[60] p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="absolute right-2 sm:right-4 z-[60] p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>
      )}

      <img
        ref={imageRef}
        src={imageSrc}
        alt={imageAlt}
        className="max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.15s ease-out",
        }}
        draggable={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={(e) => {
          // Show appropriate cursor
          if (scale > 1) {
            e.currentTarget.style.cursor = isDragging ? "grabbing" : "grab";
          } else {
            e.currentTarget.style.cursor = "zoom-in";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.cursor = "default";
        }}
      />
    </div>
  );
}
