import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop */
  duration?: number;
  /** Reverse direction */
  reverse?: boolean;
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Gap between repetitions */
  gap?: string;
}

// CSS keyframe loop (not framer) so hover can pause it via animation-play-state.
const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  gap = "3rem",
}) => (
  <div
    className={cn("group relative flex w-full overflow-hidden", className)}
    style={{
      maskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
  >
    <div
      className={cn(
        "flex shrink-0 items-center animate-marquee",
        pauseOnHover && "group-hover:[animation-play-state:paused]"
      )}
      style={
        {
          gap,
          paddingRight: gap,
          "--marquee-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
    >
      {children}
      {children}
    </div>
  </div>
);

export default Marquee;
