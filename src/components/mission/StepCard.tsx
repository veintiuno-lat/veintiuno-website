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

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  logo,
  logoAlt,
  children,
  className,
  alt = false,
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative max-w-4xl mx-auto px-4 md:px-12 py-12",
        className
      )}
    >
      <div className='flex items-center gap-4 mb-8'>
        {logo && (
          <motion.div
            whileHover={reduce ? {} : { rotate: -6, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className='shrink-0'
          >
            <img
              src={logo}
              alt={logoAlt ?? title}
              className='w-14 h-14 rounded-xl shadow-md'
            />
          </motion.div>
        )}
        <div>
          <div className='text-xs font-bold uppercase tracking-widest text-bitcoin mb-1'>
            Paso {step}
          </div>
          <h2 className='text-3xl md:text-4xl font-black font-heading leading-tight'>
            {title}
          </h2>
        </div>
      </div>

      <div
        className={cn(
          "text-lg flex flex-col gap-4",
          alt && "[&_a]:text-bitcoin"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default StepCard;
