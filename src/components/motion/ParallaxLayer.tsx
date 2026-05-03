import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  /** -1 = moves opposite to scroll, 1 = moves with scroll, 0 = static. Magnitude controls speed. */
  speed?: number;
  /** Scale range: e.g. [1, 1.1] grows to 1.1x as you scroll past */
  scale?: [number, number];
  /** Opacity range: e.g. [1, 0] fades out as you scroll past */
  opacity?: [number, number];
  /** Use spring smoothing for buttery scroll motion */
  smooth?: boolean;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className,
  speed = -0.3,
  scale,
  opacity,
  smooth = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = 200 * speed;
  const yRaw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const ySmooth = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.4 });
  const y = reduce ? 0 : smooth ? ySmooth : yRaw;

  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 1],
    scale ?? [1, 1]
  );
  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    opacity ? [opacity[0], (opacity[0] + opacity[1]) / 2, opacity[1]] : [1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        y,
        scale: reduce || !scale ? undefined : scaleRaw,
        opacity: reduce || !opacity ? undefined : opacityRaw,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
