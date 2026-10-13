import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GlobeProps } from "./types";

const loadScene = () => import("./GlobeScene");
const GlobeScene = lazy(loadScene);

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** CSS-only orb shown before the WebGL chunk loads, in prerender, or without WebGL. */
export function GlobePoster({ className }: { className?: string }) {
  return (
    <div aria-hidden='true' className={cn("absolute inset-0 flex items-center justify-center", className)}>
      <div
        className='aspect-square h-[78%] max-h-full rounded-full'
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(247,147,26,0.18), transparent 55%), radial-gradient(circle at 50% 50%, #0d0d13 60%, #07070a 100%)",
          boxShadow: "0 0 120px 10px rgba(247,147,26,0.18), inset 0 0 60px rgba(247,147,26,0.15)",
        }}
      />
    </div>
  );
}

/**
 * Lazy WebGL globe: loads three.js only when scrolled near, pauses rendering when
 * offscreen, and stays still for reduced-motion users.
 */
export default function Globe({ className, ...props }: GlobeProps & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canRender = hasWebGL() && !navigator.webdriver;
    setWebgl(canRender);
    // Fetch + parse the three.js chunk while the browser is idle, so it's ready before the globe
    // scrolls into view (no network wait / main-thread parse mid-scroll).
    if (canRender) {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
      idle(() => void loadScene());
    }
    const el = ref.current;
    if (!el) return;
    // Mount a full viewport ahead (shader compilation happens off screen)…
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    // …but only render frames while actually on screen.
    const visibleIo = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    nearIo.observe(el);
    visibleIo.observe(el);
    return () => {
      nearIo.disconnect();
      visibleIo.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {(!near || !webgl) && <GlobePoster />}
      {near && webgl && (
        <Suspense fallback={<GlobePoster />}>
          <GlobeScene {...props} autoRotate={!reduce && props.autoRotate !== false} paused={!visible} />
        </Suspense>
      )}
    </div>
  );
}
