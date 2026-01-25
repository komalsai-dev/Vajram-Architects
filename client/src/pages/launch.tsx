import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { LoadingScreen } from "@/components/LoadingScreen";

type Phase = "countdown" | "message" | "loading";

export default function Launch() {
  const [, setLocation] = useLocation();
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdownNumber, setCountdownNumber] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle countdown
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdownNumber > 0) {
      const timer = setTimeout(() => {
        setCountdownNumber((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished, show message
      setPhase("message");
      setShowConfetti(true);
    }
  }, [phase, countdownNumber]);

  // Handle message phase
  useEffect(() => {
    if (phase !== "message") return;

    const timer = setTimeout(() => {
      setPhase("loading");
    }, 3000); // Show message for 3 seconds

    return () => clearTimeout(timer);
  }, [phase]);

  // Handle loading complete - redirect to home
  const handleLoadingComplete = useCallback(() => {
    // Clear the intro flag so LoadingScreen doesn't show again on home
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenIntro", "true");
    }
    setLocation("/");
  }, [setLocation]);

  // Render loading screen phase
  if (phase === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: getConfettiColor(i),
              }}
            />
          ))}
        </div>
      )}

      {/* Countdown Phase */}
      {phase === "countdown" && countdownNumber > 0 && (
        <div key={countdownNumber} className="countdown-number">
          {countdownNumber}
        </div>
      )}

      {/* Message Phase */}
      {phase === "message" && (
        <div className="message-container">
          <h1 className="launch-title">Website is Live!</h1>
          <p className="launch-subtitle">Welcome to Vajram Architects</p>
        </div>
      )}

      {/* Inline Styles */}
      <style>{`
        @keyframes countdownPop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        @keyframes messageReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .countdown-number {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(8rem, 30vw, 20rem);
          font-weight: 400;
          color: white;
          animation: countdownPop 0.6s ease-out forwards;
          text-shadow: 0 0 60px rgba(255, 255, 255, 0.3);
        }

        .message-container {
          text-align: center;
          animation: messageReveal 0.8s ease-out forwards;
        }

        .launch-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 400;
          color: white;
          margin: 0 0 1rem 0;
          letter-spacing: 0.02em;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #d4af37 25%,
            #ffffff 50%,
            #d4af37 75%,
            #ffffff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .launch-subtitle {
          font-family: sans-serif;
          font-size: clamp(1rem, 3vw, 1.5rem);
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: messageReveal 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .confetti {
          position: absolute;
          top: -20px;
          width: 10px;
          height: 20px;
          border-radius: 2px;
          animation: confettiFall 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Helper function to get confetti colors
function getConfettiColor(index: number): string {
  const colors = [
    "#d4af37", // Gold
    "#ffffff", // White
    "#f5f5dc", // Beige
    "#c0c0c0", // Silver
    "#ffd700", // Bright Gold
    "#e8e8e8", // Light Gray
    "#b8860b", // Dark Gold
  ];
  return colors[index % colors.length];
}
