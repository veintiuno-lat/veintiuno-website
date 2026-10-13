import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  number?: string | number;
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

interface StepListProps {
  steps: Step[];
  className?: string;
  /** Show connecting vertical line between steps */
  connector?: boolean;
}

const pad = (n: string | number) => String(n).padStart(2, "0");

const StepList: React.FC<StepListProps> = ({ steps, className, connector = true }) => {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.ol
      className={cn("relative space-y-4", className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {connector && (
        <div
          aria-hidden='true'
          className='absolute bottom-10 left-12 top-10 w-px bg-gradient-to-b from-bitcoin via-bitcoin/40 to-transparent md:left-[3.25rem]'
        />
      )}

      {steps.map((step, idx) => (
        <motion.li key={idx} variants={itemVariants} className='surface surface-hover group relative flex items-start gap-5 p-5 md:p-6'>
          {/* Number badge (solid bg hides the connector line behind it) */}
          <div className='relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-bitcoin/30 bg-ink-900 shadow-glow transition-transform duration-500 group-hover:scale-105'>
            {step.number !== undefined ? (
              <span className='font-display text-2xl text-bitcoin [text-shadow:0_0_18px_rgba(247,147,26,0.7)]'>{pad(step.number)}</span>
            ) : (
              <span className='text-bitcoin'>{step.icon ?? <Check className='h-6 w-6' />}</span>
            )}
          </div>

          <div className='min-w-0 flex-1 pt-1'>
            <h3 className='flex items-center gap-2.5 text-xl font-bold text-white md:text-2xl'>
              {step.number !== undefined && step.icon && (
                <span aria-hidden='true' className='text-bitcoin/80 [&_svg]:h-5 [&_svg]:w-5'>
                  {step.icon}
                </span>
              )}
              {step.title}
            </h3>
            {step.description && <div className='mt-1.5 leading-relaxed text-gray-400'>{step.description}</div>}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default StepList;
