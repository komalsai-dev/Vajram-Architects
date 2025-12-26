import { useState, useRef, useEffect } from "react";
import heroVideo from "@assets/images/hero/logo landscape.mp4";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsVisible(false);
      // Small delay before calling onComplete to allow fade out
      setTimeout(() => {
        onComplete();
      }, 300);
    };

    video.addEventListener("ended", handleEnded);

    // Ensure video plays
    video.play().catch((error) => {
      console.error("Error playing video:", error);
      // If video fails to play, still hide after a delay
      setTimeout(() => {
        handleEnded();
      }, 1000);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 300);
        }}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

