import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Class applied to each word (e.g. gradient on some words) */
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/** Word-by-word mask reveal. Text stays in the DOM as plain words (SEO/a11y friendly). */
const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = "h2",
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={cn(className)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden='true'
          // Padding (cancelled by negative margin) keeps accents and overhanging glyphs (e.g. C) inside the mask
          className='-mx-[0.1em] -mb-[0.08em] -mt-[0.2em] inline-block overflow-hidden px-[0.1em] pb-[0.08em] pt-[0.2em] align-bottom'
        >
          <motion.span
            className={cn("inline-block", wordClassName?.(w, i))}
            variants={{
              hidden: reduce ? { y: 0 } : { y: "110%", rotate: 4 },
              show: {
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.9,
                  delay: delay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
