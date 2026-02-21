import { useRef, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setTimeout(() => onComplete(), 200);
    };

    const handleError = () => {
      setTimeout(() => onComplete(), 500);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Start playing the video
    video.play().catch(() => {
      // If autoplay fails, video will start when user interacts or when ready
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
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
        <source
          src="https://res.cloudinary.com/da9ppibpk/video/upload/f_auto,q_auto/v1771697191/video_r9naez.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
