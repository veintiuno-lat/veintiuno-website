import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion";
import ShaderBackdrop from "@/components/three/ShaderBackdrop";

export interface HeroStat {
  value: React.ReactNode;
  label: string;
}

interface PageHeroProps {
  badge?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  /** Background photo (parallax-zoomed, darkened). Defaults to the shader backdrop. */
  image?: string;
  icon?: React.ReactNode;
  stats?: HeroStat[];
  /** Right-side visual (globe, card stack…). Switches layout to two columns. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Shared page hero: 3 parallax layers (background, glow/grid, content) moving at different
 * speeds on scroll, display-font title with word reveal, optional stats and aside visual.
 */
const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  subtitle,
  image,
  icon,
  stats,
  aside,
  children,
  className,
  size = "md",
}) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  // Long single words (e.g. "LATINOAMÉRICA") must still fit a 375px screen.
  const longest = Math.max(...title.split(" ").map((w) => w.length));
  const titleSize =
    longest > 11
      ? "text-[10.5vw] sm:text-6xl lg:text-7xl xl:text-8xl"
      : longest > 8
        ? "text-[12vw] sm:text-7xl lg:text-8xl"
        : "text-[14vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem]";

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate flex items-center overflow-hidden",
        size === "lg" ? "min-h-[92vh]" : "min-h-[72vh]",
        "pt-28 pb-20",
        className
      )}
    >
      {/* Layer 1: background */}
      <motion.div className='absolute inset-0 -z-20' style={{ y: bgY }}>
        {image ? (
          <motion.div className='absolute inset-0' style={{ scale: bgScale }}>
            <img src={image} alt='' className='h-full w-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/75 to-ink-950' />
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(247,147,26,0.25),transparent_60%)]' />
          </motion.div>
        ) : (
          <ShaderBackdrop />
        )}
      </motion.div>

      {/* Layer 2: grid + grain */}
      <motion.div
        aria-hidden='true'
        className='grid-lines grain absolute inset-0 -z-10'
        style={{
          y: gridY,
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Layer 3: content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={cn(
          "relative mx-auto w-full max-w-7xl px-5 md:px-8",
          aside ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : "text-center"
        )}
      >
        <div className={cn(!aside && "mx-auto max-w-4xl")}>
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className='eyebrow mb-7'
            >
              <span className='h-1.5 w-1.5 rounded-full bg-bitcoin shadow-[0_0_10px_#F7931A]' />
              {badge}
            </motion.div>
          )}
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className={cn("mb-6 flex", !aside && "justify-center")}
            >
              {icon}
            </motion.div>
          )}
          <SplitText
            as='h1'
            text={title}
            className={cn("display text-white", titleSize)}
            wordClassName={(_, i) => (i === title.split(" ").length - 1 ? "text-gradient" : undefined)}
            delay={0.15}
          />
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className={cn("mt-7 text-lg leading-relaxed text-gray-300 md:text-xl", !aside && "mx-auto max-w-2xl")}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className={cn("mt-10 flex flex-wrap gap-3", !aside && "justify-center")}
            >
              {children}
            </motion.div>
          )}
          {stats && stats.length > 0 && (
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease }}
              className={cn(
                "mt-12 inline-grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10",
                stats.length >= 4 && "grid-cols-2 sm:grid-cols-4"
              )}
              style={{ gridTemplateColumns: stats.length < 4 ? `repeat(${stats.length}, minmax(0, 1fr))` : undefined }}
            >
              {stats.map((s) => (
                <div key={s.label} className='bg-ink-950/85 px-4 py-4 text-left md:px-6'>
                  <dd className='font-display text-3xl text-white md:text-4xl'>{s.value}</dd>
                  <dt className='mt-1 text-[10px] uppercase tracking-[0.12em] text-gray-400 md:text-xs md:tracking-[0.18em]'>{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
        {aside && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className='relative'
          >
            {aside}
          </motion.div>
        )}
      </motion.div>

      {/* Fade into page */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950' />
    </section>
  );
};

export default PageHero;
