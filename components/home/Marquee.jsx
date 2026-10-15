"use client";

import { useRef } from "react";
import { gsap, useIsomorphicLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

const WORDS = ["Editorial", "Architecture", "Interiors", "Product", "Residential", "Studio"];

// Seamless ticker: one track duplicated so xPercent -50 loops perfectly.
export default function Marquee() {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-marquee-track]", {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const row = (keyPrefix) => (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word, i) => (
        <span key={`${keyPrefix}-${i}`} className="flex items-center">
          <span
            className="px-6 text-[clamp(1.6rem,4vw,3.4rem)] leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {word}
          </span>
          <span className="select-none px-1 text-[0.4em] text-ink/30" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={ref}
      className="overflow-hidden border-y border-ink/10 py-8 sm:py-10"
      aria-hidden="true"
    >
      <div data-marquee-track className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </section>
  );
}
