import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  maxTilt?: number;
  /** Lift on hover in pixels */
  lift?: number;
  /** Show subtle glare overlay that follows cursor */
  glare?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxTilt = 8,
  lift = 6,
  glare = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ySpring = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 60%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 1000,
            }
      }
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-300'
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
