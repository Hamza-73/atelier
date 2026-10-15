"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useIsomorphicLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { imageById } from "@/data/images";
import { TEMPLATES, SECTION_ORDER } from "@/data/templates";
import { PALETTES, FONT_PAIRINGS } from "@/data/themes";

const HEADLINE = ["Good design begins", "with a point", "of view."];

function Stat({ value }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.n)).padStart(2, "0");
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
}

export default function HomeHero({ ready, onStart, onBrowse }) {
  const ref = useRef(null);

  // Set the "before" state before first paint so nothing flashes.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-line]", { yPercent: 118 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-hero-media]", { yPercent: 100 });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Play the entrance once the intro curtain has lifted.
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to("[data-hero-line]", {
        yPercent: 0,
        duration: 1.15,
        stagger: 0.12,
        ease: "power4.out",
      })
        .to(
          "[data-hero-fade]",
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" },
          "-=0.75"
        )
        .to(
          "[data-hero-media]",
          { yPercent: 0, duration: 1.2, ease: "expo.out" },
          "-=1.0"
        );
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  // Continuous parallax on the hero image.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-parallax]",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero-media]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: TEMPLATES.length, label: "Templates" },
    { value: PALETTES.length, label: "Palettes" },
    { value: FONT_PAIRINGS.length, label: "Type pairings" },
    { value: SECTION_ORDER.length, label: "Section types" },
  ];

  return (
    <section ref={ref} className="relative">
      <div className="mx-auto w-full max-w-7xl px-6 pt-14 sm:px-10 sm:pt-24">
        <p
          data-hero-fade
          className="mb-8 text-[11px] uppercase tracking-[0.32em] text-ink/50"
        >
          A space to shape ideas website design studio
        </p>

        <h1
          className="max-w-[16ch] text-[clamp(2.9rem,9vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero-fade className="max-w-md text-base text-ink/60">
            {TEMPLATES.length} starting points, each a complete editorial position. Choose a template
            and make it unmistakably yours.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={onStart}
              className="group flex items-center gap-2 border-b border-ink pb-1 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={onBrowse}
              className="group flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              Browse the work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <div className="relative h-[54vh] min-h-[320px] overflow-hidden bg-ivory sm:h-[72vh]">
          <div data-hero-media className="absolute inset-0 will-change-transform">
            <div data-hero-parallax className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
              <img
                src={imageById("img-01").url}
                alt="A warm, light-filled interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-paper sm:p-10">
              <span data-hero-fade className="text-[11px] uppercase tracking-[0.22em]">
                Residence selected 2026
              </span>
              <span data-hero-fade className="hidden text-[11px] uppercase tracking-[0.22em] sm:inline">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-16 sm:grid-cols-4 sm:px-10 sm:py-20">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2 border-t border-ink/15 pt-5">
            <span
              className="text-4xl sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <Stat value={stat.value} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
