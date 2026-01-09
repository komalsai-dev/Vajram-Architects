import { useRef, useEffect } from "react";
import heroVideo from "@assets/images/hero/logo landscape.mp4";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set 2x speed immediately
    video.playbackRate = 2.0;
    video.defaultPlaybackRate = 2.0;

    const handleEnded = () => {
      setTimeout(() => onComplete(), 200);
    };

    const handleLoadedMetadata = () => {
      video.playbackRate = 2.0;
    };

    const handleCanPlay = () => {
      video.playbackRate = 2.0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    // Ensure video plays
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
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
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}
