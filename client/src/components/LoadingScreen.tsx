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

    let isMounted = true;

    const handleEnded = () => {
      if (!isMounted) return;
      setIsVisible(false);
      setTimeout(() => {
        if (isMounted) {
          onComplete();
        }
      }, 300);
    };

    const handleLoadedMetadata = () => {
      if (!isMounted || !video) return;
      // Set 2x playback speed for smooth playback
      video.playbackRate = 2.0;
      video.defaultPlaybackRate = 2.0;
    };

    const handleCanPlayThrough = () => {
      if (!isMounted || !video) return;
      // Ensure 2x speed is maintained
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
      }
      // Ensure video is playing
      if (video.paused) {
        video.play().catch(() => {
          if (isMounted) handleEnded();
        });
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      setTimeout(() => handleEnded(), 1000);
    };

    // Set 2x speed immediately
    video.playbackRate = 2.0;
    video.defaultPlaybackRate = 2.0;

    // Add event listeners
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("error", handleError);

    // Start playing
    video.play().catch(() => {
      // If autoplay fails, wait for canplaythrough
    });

    return () => {
      isMounted = false;
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("error", handleError);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black transition-opacity duration-300"
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          objectFit: "cover",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}

