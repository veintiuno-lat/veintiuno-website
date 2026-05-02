import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "span";
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = "up",
  distance = 32,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
  as = "div",
}) => {
  const reduce = useReducedMotion();
  const offset = offsetFor(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
