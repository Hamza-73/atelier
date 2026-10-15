"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useIsomorphicLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { TEMPLATES } from "@/data/templates";

const CTA_LINES = ["Ready to make", "it yours?"];

export default function HomeFooter({ onStart }) {
  const ref = useRef(null);
  const magneticRef = useRef(null);

  // CTA copy reveals as it scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: ref.current, start: "top 78%" };
      gsap.from("[data-cta-line]", {
        yPercent: 118,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: trigger,
      });
      gsap.from("[data-cta-fade]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Button leans toward the cursor.
  useIsomorphicLayoutEffect(() => {
    const btn = magneticRef.current;
    if (!btn || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

    function move(event) {
      const rect = btn.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * 0.3);
      yTo((event.clientY - (rect.top + rect.height / 2)) * 0.45);
    }
    function reset() {
      xTo(0);
      yTo(0);
    }

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", reset);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <footer ref={ref} className="border-t border-ink/10">
      <section className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <p data-cta-fade className="mb-8 text-[11px] uppercase tracking-[0.32em] text-ink/50">
          Start your next project
        </p>

        <h2
          className="max-w-[14ch] text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {CTA_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span data-cta-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div data-cta-fade className="mt-12 flex flex-wrap items-center gap-8">
          <button
            type="button"
            ref={magneticRef}
            onClick={onStart}
            className="group flex items-center gap-2 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.2em] text-paper will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4"
          >
            Let&apos;s go
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <p className="max-w-xs text-sm text-ink/55">
            Open a template, shape it in the editor, and publish in a single sitting.
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 border-t border-ink/10 px-6 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left text-4xl tracking-[0.06em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta sm:text-6xl"
          style={{ fontFamily: "var(--font-playfair, var(--font-serif))" }}
        >
          ATELIER
        </button>

        <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/50 sm:items-end">
          <span>{TEMPLATES.length} templates 5 palettes 9 section types</span>
          <span>© 2026 Atelier. Built with Next.js &amp; GSAP.</span>
        </div>
      </div>
    </footer>
  );
}
