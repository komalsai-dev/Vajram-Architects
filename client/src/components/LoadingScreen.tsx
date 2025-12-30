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
      // Small delay before calling onComplete to allow fade out
      setTimeout(() => {
        if (isMounted) {
          onComplete();
        }
      }, 300);
    };

    const handleLoadedMetadata = () => {
      if (!isMounted || !video) return;
      // Set playback speed after metadata is loaded
      video.playbackRate = 1.75;
      
      // Ensure video plays smoothly
      video.play().catch((error) => {
        console.error("Error playing video:", error);
        // If video fails to play, still hide after a delay
        if (isMounted) {
          setTimeout(() => {
            handleEnded();
          }, 1000);
        }
      });
    };

    const handleCanPlay = () => {
      if (!isMounted || !video) return;
      // Ensure video is playing when it can play
      if (video.paused) {
        video.play().catch((error) => {
          console.error("Error playing video on canPlay:", error);
        });
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      console.error("Video loading error");
      // If video fails to load, hide after a delay
      setTimeout(() => {
        handleEnded();
      }, 1000);
    };

    // Add event listeners
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // If metadata is already loaded, set playback rate immediately
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      isMounted = false;
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
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
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          willChange: "auto",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

