import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/lift of the page plus an orange curtain sweep on exit → enter. */
const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      // Only opacity/transform (compositor-friendly). A `filter` here would stay on the whole page
      // (`blur(0px)` still creates a filter layer) and make every scrolled frame expensive.
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease }}
    >
      {!reduce && (
        <motion.div
          aria-hidden='true'
          className='pointer-events-none fixed inset-0 z-[90] origin-top bg-gradient-to-b from-bitcoin via-[#c56a00] to-ink-950'
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ originY: 0 }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default PageTransition;
