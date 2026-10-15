"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { TEMPLATES, CATEGORIES } from "@/data/templates";
import { cn } from "@/lib/utils";

function Cover({ src, alt }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-warmgrey text-ink/50">
        <ImageOff className="h-5 w-5" />
        <span className="text-[11px] uppercase tracking-wider">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      className="h-full w-full scale-[1.02] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.09]"
    />
  );
}

export default function SelectedWork({ ready, onOpen }) {
  const ref = useRef(null);
  const [category, setCategory] = useState("All");

  const visible =
    category === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === category);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(ref.current?.querySelectorAll("[data-work-card]") || []);
      cards.forEach((card) => {
        gsap.from(card, {
          y: 70,
          autoAlpha: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });

        const inner = card.querySelector("[data-work-parallax]");
        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, ref);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [ready, category]);

  return (
    <section ref={ref} id="work" className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
      <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className="text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Selected Work
        </h2>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
          {String(visible.length).padStart(2, "0")} of {TEMPLATES.length} templates
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "relative pb-1 text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
              category === c ? "text-ink" : "text-ink/45 hover:text-ink"
            )}
          >
            {c}
            {category === c && (
              <span className="absolute -bottom-px left-0 h-px w-full origin-left bg-terracotta" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:gap-y-24">
        {visible.map((template, i) => (
          <article
            key={template.id}
            data-work-card
            className={cn("group", i % 2 === 1 && "lg:mt-28")}
          >
            <button
              type="button"
              onClick={() => onOpen(template.id)}
              className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
                <div data-work-parallax className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
                  <Cover src={template.cover} alt={template.name} />
                </div>

                <span className="absolute left-4 top-4 text-[11px] tracking-[0.2em] text-paper/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 bg-paper/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Customize
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>
                  {template.name}
                </h3>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-olive">
                  {template.category}
                </span>
              </div>
              <p className="mt-2 max-w-md text-sm text-ink/55">{template.description}</p>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
