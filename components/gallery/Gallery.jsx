"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useEditor } from "@/lib/store";
import { TEMPLATES } from "@/data/templates";
import IntroOverlay from "@/components/home/IntroOverlay";
import HomeNav from "@/components/home/HomeNav";
import HomeHero from "@/components/home/HomeHero";
import Marquee from "@/components/home/Marquee";
import SelectedWork from "@/components/home/SelectedWork";
import HomeFooter from "@/components/home/HomeFooter";

// The intro curtain should only play on the first visit per page load.
let hasPlayedIntro = false;

function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-terracotta" />
    </div>
  );
}

function SavedDesigns({ onStart }) {
  const { state, dispatch } = useEditor();
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-saved-row]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
      <h2
        className="text-[clamp(2rem,5vw,4rem)] leading-[1]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Saved Designs
      </h2>
      <p className="mt-4 max-w-lg text-base text-ink/60">
        Work saved in this session, ready to pick back up.
      </p>

      {state.savedDesigns.length === 0 ? (
        <div
          data-saved-row
          className="mt-12 flex flex-col items-start gap-5 border border-dashed border-warmgrey px-8 py-16"
        >
          <FolderOpen className="h-6 w-6 text-ink/30" />
          <p className="text-ink/50">
            Nothing saved yet. Open a template and press Save to keep your work here.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            Start a new project
          </button>
        </div>
      ) : (
        <ul className="mt-12 border-t border-ink/15">
          {state.savedDesigns.map((entry) => (
            <li key={entry.savedId} data-saved-row className="border-b border-ink/15">
              <button
                type="button"
                onClick={() => dispatch({ type: "OPEN_SAVED", id: entry.savedId })}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                    {entry.name}
                  </span>
                  <span className="text-xs text-ink/50">
                    Saved {new Date(entry.updatedAt).toLocaleString()}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Gallery() {
  const { dispatch } = useEditor();
  const [view, setView] = useState("work");
  const [showIntro, setShowIntro] = useState(() => !hasPlayedIntro);
  const [ready, setReady] = useState(() => hasPlayedIntro);

  const openTemplate = useCallback((id) => dispatch({ type: "OPEN_TEMPLATE", id }), [dispatch]);
  const startProject = useCallback(() => openTemplate(TEMPLATES[0].id), [openTemplate]);

  const handleIntroDone = useCallback(() => {
    hasPlayedIntro = true;
    setReady(true);
    setShowIntro(false);
  }, []);

  function browseWork() {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-dvh w-full bg-paper">
      {showIntro && <IntroOverlay onDone={handleIntroDone} />}
      <ScrollProgress />
      <HomeNav
        ready={ready}
        view={view}
        onShowWork={() => setView("work")}
        onShowSaved={() => setView("saved")}
      />

      <AnimatePresence mode="wait" initial={false}>
        {view === "work" ? (
          <motion.main
            key="work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <HomeHero ready={ready} onStart={startProject} onBrowse={browseWork} />
            <Marquee />
            <SelectedWork ready={ready} onOpen={openTemplate} />
          </motion.main>
        ) : (
          <motion.main
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <SavedDesigns onStart={startProject} />
          </motion.main>
        )}
      </AnimatePresence>

      <HomeFooter onStart={startProject} />
    </div>
  );
}
