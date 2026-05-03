import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  amount = 0.2,
  once = true,
}) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  distance = 24,
}) => {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
};

export default Stagger;
