import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number | string;
  title: string;
  logo?: string;
  logoAlt?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, logo, logoAlt, children, className, alt = false }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative mx-auto max-w-4xl px-5 md:px-8", className)}
    >
      <div className='surface surface-hover overflow-hidden p-6 md:p-10'>
        {/* Oversized step number watermark */}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8rem] leading-none text-bitcoin/10 md:text-[11rem]'
        >
          {String(step).padStart(2, "0")}
        </span>

        <div className='relative mb-8 flex items-center gap-5'>
          {logo && (
            <motion.div whileHover={reduce ? {} : { rotate: -6, scale: 1.05 }} transition={{ duration: 0.3 }} className='shrink-0'>
              <img
                src={logo}
                alt={logoAlt ?? title}
                loading='lazy'
                decoding='async'
                className='h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10 md:h-16 md:w-16'
              />
            </motion.div>
          )}
          <div>
            <div className='mb-2 font-display text-sm uppercase tracking-[0.2em] text-bitcoin [text-shadow:0_0_14px_rgba(247,147,26,0.6)]'>
              Paso {step}
            </div>
            <h2 className='display text-4xl text-white md:text-5xl'>{title}</h2>
          </div>
        </div>

        <div
          className={cn(
            "relative flex flex-col gap-5 text-lg leading-relaxed text-gray-300 [&_strong]:text-white",
            alt && "[&_a]:text-bitcoin"
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default StepCard;
