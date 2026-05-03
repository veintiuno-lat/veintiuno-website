import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroAurora } from "@/components/motion";
import { cn } from "@/lib/utils";

interface MissionHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  variant?: "warm" | "dark" | "sunrise" | "ember";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const MissionHero: React.FC<MissionHeroProps> = ({
  badge = "Misión",
  title,
  subtitle,
  variant = "ember",
  icon,
  children,
  className,
}) => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 400], [0, reduce ? 0 : -60]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, reduce ? 1 : 0.3]);

  const isDark = variant === "dark" || variant === "ember";

  return (
    <section
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        "min-h-[60vh] md:min-h-[70vh]",
        className
      )}
    >
      <HeroAurora variant={variant} intensity='vivid' />

      {/* Animated grid overlay */}
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.06]'
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className='container relative z-10 text-center py-20'
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8",
              isDark
                ? "bg-white/10 backdrop-blur-md border border-white/20 text-white/90"
                : "bg-white/60 backdrop-blur-md border border-white/40 text-gray-700"
            )}
          >
            <span className='inline-block w-1.5 h-1.5 rounded-full bg-bitcoin animate-hero-pulse' />
            {badge}
          </motion.div>
        )}

        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className='inline-flex items-center justify-center mb-6'
          >
            {icon}
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-black font-heading leading-[0.95] mb-6 tracking-tight",
            isDark ? "text-white" : "text-gray-900"
          )}
        >
          <span className='block text-gradient'>{title}</span>
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "text-lg md:text-2xl font-heading max-w-2xl mx-auto leading-snug",
              isDark ? "text-white/80" : "text-gray-700"
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className='mt-10'
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom fade transition into next section */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute bottom-0 left-0 right-0 h-32'
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.95) 100%)",
        }}
      />
    </section>
  );
};

export default MissionHero;
