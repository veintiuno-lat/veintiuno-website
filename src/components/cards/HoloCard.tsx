import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  src: string;
  alt: string;
  className?: string;
  /** Image aspect; landscape cards are wider */
  orientation?: "portrait" | "landscape";
  children?: React.ReactNode;
}

/**
 * Collectible-card effect: pointer-driven 3D tilt + holographic foil + specular glare.
 * Pure CSS variables updated on pointermove (no re-renders).
 */
const HoloCard: React.FC<HoloCardProps> = ({ src, alt, className, orientation = "portrait", children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
    el.style.setProperty("--o", "1");
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--o", "0");
  };

  return (
    <div className={cn("[perspective:1000px]", className)}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className='group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-glow-lg'
        style={
          {
            transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            transformStyle: "preserve-3d",
          } as React.CSSProperties
        }
      >
        {orientation === "portrait" ? (
          // Card art files are all stored landscape (370×232); portrait designs are saved rotated,
          // so rotate them back into a true portrait frame.
          <div className='relative aspect-[232/370] w-full overflow-hidden'>
            <img
              src={src}
              alt={alt}
              loading='lazy'
              decoding='async'
              className='absolute left-1/2 top-1/2 h-auto w-[159.5%] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90'
            />
          </div>
        ) : (
          <img src={src} alt={alt} loading='lazy' decoding='async' className='block aspect-[370/232] w-full object-cover' />
        )}
        {/* Holographic foil */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:mix-blend-color-dodge'
          style={{
            opacity: "calc(var(--o, 0) * 0.55)",
            background:
              "repeating-linear-gradient(115deg, rgba(255,0,132,0.35) 0%, rgba(252,164,0,0.35) 8%, rgba(255,255,0,0.3) 16%, rgba(0,255,138,0.3) 24%, rgba(0,207,255,0.35) 32%, rgba(204,76,250,0.35) 40%, rgba(255,0,132,0.35) 48%)",
            backgroundSize: "300% 300%",
            backgroundPosition: "var(--mx, 50%) var(--my, 50%)",
          }}
        />
        {/* Specular glare */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:mix-blend-overlay'
          style={{
            opacity: "var(--o, 0)",
            background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.7), transparent 45%)",
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default HoloCard;
