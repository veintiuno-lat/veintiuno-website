import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  gap = "3rem",
}) => {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className='flex shrink-0 items-center'
        style={{ gap }}
        animate={
          reduce
            ? {}
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        onMouseEnter={(e) => {
          if (pauseOnHover && !reduce)
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
