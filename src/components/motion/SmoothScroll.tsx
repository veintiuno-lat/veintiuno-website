import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";

let lenis: Lenis | null = null;

/**
 * Lenis smooth scroll. Drives native scroll, so framer-motion useScroll keeps working.
 * Disabled for reduced-motion users and headless prerender (navigator.webdriver).
 */
export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || navigator.webdriver) return;

    // `lerp` (not `duration`): each frame closes a fixed fraction of the remaining distance, so the
    // page reacts instantly to the wheel and settles fast. 0.14 ≈ 90% of the way in ~250ms.
    lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, smoothWheel: true });

    // Tick inside framer-motion's frame loop (one shared rAF): scroll is updated in the same frame
    // as the parallax transforms that depend on it, instead of a separate loop drifting a frame apart.
    const root = document.documentElement;
    const tick = ({ timestamp }: { timestamp: number }) => {
      lenis?.raf(timestamp);
      // Flag only Lenis-driven wheel scrolling (not native/touch/keyboard, which Lenis keeps "scrolling"
      // for 400ms after the last event — a tap right after a swipe must never be swallowed).
      // classList.toggle with an unchanged value doesn't touch the DOM, so this is free per frame.
      root.classList.toggle("vn-wheel-scrolling", lenis?.isScrolling === "smooth");
    };
    frame.update(tick, true);

    // Radix dialogs/menus lock scroll by setting `data-scroll-locked` on <body>; pause Lenis meanwhile
    // so the page behind a modal doesn't keep scrolling.
    const lockObserver = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis?.stop();
      else lenis?.start();
    });
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      lockObserver.disconnect();
      cancelFrame(tick);
      root.classList.remove("vn-wheel-scrolling");
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Reset on route change (ScrollToTop does window.scrollTo, Lenis must follow).
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
