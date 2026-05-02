import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  children: React.ReactNode;
  className?: string;
  /** Maximum pixel offset under cursor */
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 14,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / rect.width) * 2;
    const dy = ((e.clientY - cy) / rect.height) * 2;
    setPos({ x: dx * strength, y: dy * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
