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

const StepList: React.FC<StepListProps> = ({
  steps,
  className,
  connector = true,
}) => {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.ol
      className={cn("relative space-y-6", className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {connector && (
        <div
          aria-hidden='true'
          className='absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-bitcoin/40 via-bitcoin/20 to-transparent'
        />
      )}

      {steps.map((step, idx) => (
        <motion.li
          key={idx}
          variants={itemVariants}
          className='relative flex items-start gap-5 group'
        >
          {/* Number / icon badge */}
          <div className='relative z-10 shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-bitcoin to-bitcoin-dark text-white font-bold text-lg shadow-lg shadow-bitcoin/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
            {step.icon ?? (step.number ?? <Check className='w-6 h-6' />)}
          </div>

          {/* Content */}
          <div className='pt-2 pb-3 flex-1'>
            <h3 className='text-xl md:text-2xl font-bold font-heading text-gray-900 mb-1'>
              {step.title}
            </h3>
            {step.description && (
              <div className='text-gray-600 leading-relaxed'>
                {step.description}
              </div>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default StepList;
