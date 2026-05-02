import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { LoadingScreen } from "@/components/LoadingScreen";

type Phase = "countdown" | "message" | "loading";

export default function Launch() {
  const [, setLocation] = useLocation();
  const [phase, setPhase] = useState<Phase>("countdown");
  const [countdownNumber, setCountdownNumber] = useState(10);
  const [showConfetti, setShowConfetti] = useState(false);

  // Refs to hold the persistent AudioContext and stop function for the message phase music
  const musicCtxRef = useRef<AudioContext | null>(null);
  const musicStopRef = useRef<(() => void) | null>(null);

  // Tick sound for each countdown number
  const playTick = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
      osc.onended = () => ctx.close();
    } catch (_) {}
  }, []);


  const playCelebration = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AC() as AudioContext;
      musicCtxRef.current = ctx;
      const now = ctx.currentTime;

      // ── Continuous section: looping applause and crowd roar ────────────────────

      // Helper: one synthesized clap
      const makeClap = (startTime: number, vol = 0.5) => {
        const bufSize = Math.floor(ctx.sampleRate * 0.11);
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2.5);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const bpf = ctx.createBiquadFilter();
        bpf.type = "bandpass";
        bpf.frequency.value = 1100 + Math.random() * 400;
        bpf.Q.value = 0.7;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.11);
        src.connect(bpf);
        bpf.connect(g);
        g.connect(ctx.destination);
        src.start(startTime);
      };

      // Crowd cheer background roar
      const cheerBufSize = ctx.sampleRate * 5;
      const cheerBuf = ctx.createBuffer(2, cheerBufSize, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const cd = cheerBuf.getChannelData(ch);
        for (let i = 0; i < cheerBufSize; i++) cd[i] = Math.random() * 2 - 1;
      }
      const cheerSrc = ctx.createBufferSource();
      cheerSrc.buffer = cheerBuf;
      const lpf = ctx.createBiquadFilter();
      lpf.type = "lowpass";
      lpf.frequency.setValueAtTime(400, now);
      lpf.frequency.linearRampToValueAtTime(2000, now + 1.0);
      lpf.frequency.linearRampToValueAtTime(1200, now + 4.0);
      const cheerGain = ctx.createGain();
      cheerGain.gain.setValueAtTime(0, now);
      cheerGain.gain.linearRampToValueAtTime(0.5, now + 0.5);
      cheerGain.gain.setValueAtTime(0.5, now + 3.5);
      cheerGain.gain.linearRampToValueAtTime(0, now + 4.5);
      cheerSrc.connect(lpf);
      lpf.connect(cheerGain);
      cheerGain.connect(ctx.destination);
      cheerSrc.start(now);
      cheerSrc.stop(now + 4.5);

      // Schedule continuous applause
      let t = now; 
      const endTime = now + 4.5;
      const intervalIds: ReturnType<typeof setInterval>[] = [];

      const scheduleApplause = () => {
        if (!musicCtxRef.current || ctx.state === "closed") return;
        const ct = ctx.currentTime;
        while (t < ct + 0.5 && t < endTime) {
          // More intense applause feel
          makeClap(t, 0.5 + Math.random() * 0.4);
          makeClap(t + 0.03, 0.45 + Math.random() * 0.35);
          makeClap(t + 0.07, 0.4 + Math.random() * 0.3);
          makeClap(t + 0.11, 0.35 + Math.random() * 0.25);
          if (Math.random() > 0.3) makeClap(t + 0.15, 0.3 + Math.random() * 0.2);
          if (Math.random() > 0.6) makeClap(t + 0.09, 0.4 + Math.random() * 0.3);
          
          t += 0.15 + Math.random() * 0.05; // More frequent groups for intensity
        }
      };

      const applauseInterval = setInterval(scheduleApplause, 200);
      intervalIds.push(applauseInterval);

      // Helper: safely close ctx only once
      const safeClose = () => {
        if (ctx.state !== "closed") {
          ctx.close().catch(() => {});
        }
        musicCtxRef.current = null;
        musicStopRef.current = null;
      };

      // Clean stop function — fade out and close
      musicStopRef.current = () => {
        intervalIds.forEach(clearInterval);
        if (ctx.state === "closed") return;
        try {
          cheerGain.gain.cancelScheduledValues(ctx.currentTime);
          cheerGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        } catch (_) {}
        setTimeout(safeClose, 350);
      };

      // Auto-cleanup after 5.5s (only if not already stopped)
      setTimeout(() => {
        intervalIds.forEach(clearInterval);
        if (musicStopRef.current) {
          // still not manually stopped — close directly
          safeClose();
        }
      }, 5500);

    } catch (_) {}
  }, []);

  // Handle countdown
  useEffect(() => {
    if (phase !== "countdown") return;

    if (countdownNumber > 0) {
      playTick();
      const timer = setTimeout(() => {
        setCountdownNumber((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      playCelebration();
      setPhase("message");
      setShowConfetti(true);
    }
  }, [phase, countdownNumber, playTick, playCelebration]);

  // Handle message phase — stop music when transitioning to loading
  useEffect(() => {
    if (phase !== "message") return;

    const timer = setTimeout(() => {
      // Fade out music before transitioning
      if (musicStopRef.current) {
        musicStopRef.current();
        musicStopRef.current = null;
      }
      setPhase("loading");
    }, 5000); // Show message for 5 seconds then move to loading

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
