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
    let hasStartedPlaying = false;

    const handleEnded = () => {
      if (!isMounted) return;
      setIsVisible(false);
      setTimeout(() => {
        if (isMounted) {
          onComplete();
        }
      }, 300);
    };

    const handleLoadedData = () => {
      if (!isMounted || !video || hasStartedPlaying) return;
      // Set 2x speed after initial data is loaded
      video.playbackRate = 2.0;
      video.defaultPlaybackRate = 2.0;
    };

    const handleLoadedMetadata = () => {
      if (!isMounted || !video) return;
      // Set 2x speed after metadata is loaded
      video.playbackRate = 2.0;
      video.defaultPlaybackRate = 2.0;
    };

    const handleCanPlay = () => {
      if (!isMounted || !video) return;
      // Set 2x speed when video can start playing
      video.playbackRate = 2.0;
    };

    const startPlayback = () => {
      if (!isMounted || !video || hasStartedPlaying) return false;
      
      // Check if enough data is buffered
      const bufferedEnd = video.buffered.length > 0 ? video.buffered.end(video.buffered.length - 1) : 0;
      const duration = video.duration || Infinity;
      
      // Wait for at least 3 seconds of buffer or 15% of video, whichever is smaller
      // This ensures smooth playback especially on mobile
      const minBuffer = Math.min(3, duration * 0.15);
      
      if (bufferedEnd >= minBuffer && video.readyState >= 3) {
        hasStartedPlaying = true;
        video.playbackRate = 2.0;
        video.play().catch((error) => {
          console.error("Error playing video:", error);
          hasStartedPlaying = false; // Reset to retry
          if (isMounted) {
            setTimeout(() => {
              if (isMounted && !hasStartedPlaying) {
                startPlayback();
              }
            }, 500);
          }
        });
        return true;
      }
      return false;
    };

    const handleCanPlayThrough = () => {
      if (!isMounted || !video) return;
      
      // Ensure 2x speed is maintained
      video.playbackRate = 2.0;
      video.defaultPlaybackRate = 2.0;
      
      // Start playback if enough buffer is available
      if (video.paused && !hasStartedPlaying) {
        startPlayback();
      }
    };

    const handleProgress = () => {
      if (!isMounted || !video || hasStartedPlaying) return;
      
      // Try to start playback as buffer grows
      if (video.paused && video.readyState >= 3) {
        startPlayback();
      }
    };

    const handleWaiting = () => {
      // Video is buffering - maintain playback rate
      if (!isMounted || !video) return;
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
      }
    };

    const handlePlaying = () => {
      // Ensure 2x speed is maintained during playback
      if (!isMounted || !video) return;
      if (video.playbackRate !== 2.0) {
        video.playbackRate = 2.0;
      }
    };

    const handleError = () => {
      if (!isMounted) return;
      setTimeout(() => handleEnded(), 1000);
    };

    // Set initial 2x speed
    video.defaultPlaybackRate = 2.0;
    
    // Add event listeners in order of importance
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Try to set playback rate immediately if video is ready
    if (video.readyState >= 1) {
      video.playbackRate = 2.0;
    }

    return () => {
      isMounted = false;
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black"
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        isolation: "isolate",
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
          WebkitTransform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          objectFit: "cover",
          objectPosition: "center",
          // Mobile optimizations
          WebkitTapHighlightColor: "transparent",
          touchAction: "none",
          // Prevent layout shifts
          width: "100%",
          height: "100%",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}

