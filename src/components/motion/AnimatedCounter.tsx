import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  to,
  from = 0,
  duration = 1.6,
  className,
  prefix = "",
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(from);
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, motionValue, reduce]);

  return (
    <motion.span ref={ref} className={cn(className)}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
