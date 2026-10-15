"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const PANELS = 5;
const WORD = "ATELIER";

// Full-screen curtain that lifts once, then hands control back to the hero.
export default function IntroOverlay({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) {
      onDone();
      return;
    }

    if (prefersReducedMotion()) {
      root.style.display = "none";
      onDone();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from("[data-intro-letter]", {
        yPercent: 120,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power4.out",
      })
        .to("[data-intro-letter]", {
          yPercent: -120,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.in",
        }, "+=0.25")
        .to("[data-intro-panel]", {
          yPercent: -100,
          duration: 0.9,
          stagger: 0.06,
          ease: "expo.inOut",
        }, "-=0.35")
        .set(root, { display: "none" });
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex" aria-hidden="true">
      {Array.from({ length: PANELS }).map((_, i) => (
        <div key={i} data-intro-panel className="h-full flex-1 bg-ink" />
      ))}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex overflow-hidden text-paper">
          {WORD.split("").map((letter, i) => (
            <span key={i} data-intro-letter className="inline-block text-2xl tracking-[0.5em] sm:text-3xl">
              {letter}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
