import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroAuroraProps {
  className?: string;
  variant?: "warm" | "dark" | "sunrise" | "ember";
  intensity?: "subtle" | "medium" | "vivid";
}

const palettes = {
  warm: {
    a: "rgba(247, 147, 26, 0.55)",
    b: "rgba(255, 169, 64, 0.45)",
    c: "rgba(255, 217, 61, 0.35)",
    base: "transparent",
  },
  dark: {
    a: "rgba(247, 147, 26, 0.35)",
    b: "rgba(255, 107, 107, 0.25)",
    c: "rgba(78, 205, 196, 0.18)",
    base: "#0a0a0a",
  },
  sunrise: {
    a: "rgba(255, 217, 61, 0.55)",
    b: "rgba(247, 147, 26, 0.45)",
    c: "rgba(255, 107, 107, 0.35)",
    base: "transparent",
  },
  ember: {
    a: "rgba(247, 147, 26, 0.55)",
    b: "rgba(255, 107, 107, 0.45)",
    c: "rgba(247, 147, 26, 0.30)",
    base: "#171717",
  },
};

const intensityMul = { subtle: 0.6, medium: 1, vivid: 1.4 };

const HeroAurora: React.FC<HeroAuroraProps> = ({
  className,
  variant = "warm",
  intensity = "medium",
}) => {
  const reduce = useReducedMotion();
  const palette = palettes[variant];
  const mul = intensityMul[intensity];

  return (
    <div
      aria-hidden='true'
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{ backgroundColor: palette.base }}
    >
      {/* Blob 1 */}
      <motion.div
        className='absolute rounded-full blur-3xl'
        style={{
          width: `${60 * mul}vw`,
          height: `${60 * mul}vw`,
          background: `radial-gradient(circle at 30% 30%, ${palette.a}, transparent 70%)`,
          top: "-20%",
          left: "-15%",
        }}
        animate={
          reduce
            ? {}
            : {
                x: ["0%", "10%", "-5%", "0%"],
                y: ["0%", "-8%", "5%", "0%"],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Blob 2 */}
      <motion.div
        className='absolute rounded-full blur-3xl'
        style={{
          width: `${50 * mul}vw`,
          height: `${50 * mul}vw`,
          background: `radial-gradient(circle at 70% 60%, ${palette.b}, transparent 70%)`,
          top: "10%",
          right: "-15%",
        }}
        animate={
          reduce
            ? {}
            : {
                x: ["0%", "-10%", "5%", "0%"],
                y: ["0%", "10%", "-5%", "0%"],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Blob 3 */}
      <motion.div
        className='absolute rounded-full blur-3xl'
        style={{
          width: `${45 * mul}vw`,
          height: `${45 * mul}vw`,
          background: `radial-gradient(circle at 50% 50%, ${palette.c}, transparent 70%)`,
          bottom: "-20%",
          left: "30%",
        }}
        animate={
          reduce
            ? {}
            : {
                x: ["0%", "8%", "-8%", "0%"],
                y: ["0%", "-6%", "6%", "0%"],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Subtle grain overlay */}
      <div
        className='absolute inset-0 opacity-[0.04] mix-blend-overlay'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};

export default HeroAurora;
