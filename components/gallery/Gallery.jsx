"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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

// The homepage: marketing hero, template picker, selected work. Saved
// designs live at their own route — see app/saved/page.js.
export default function Gallery() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [showIntro, setShowIntro] = useState(() => !hasPlayedIntro);
  const [ready, setReady] = useState(() => hasPlayedIntro);

  // Starting a new project, or opening a starter template, requires an
  // account — the design can't be saved otherwise. Signed-out users get
  // the sign-in modal instead of landing on an editor page that would
  // just redirect them right back.
  const openTemplate = useCallback(
    (id) => {
      if (!isSignedIn) {
        openSignIn();
        return;
      }
      router.push(`/editor/new?template=${id}`);
    },
    [isSignedIn, openSignIn, router]
  );
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
      <HomeNav ready={ready} onNewProject={startProject} />

      <main>
        <HomeHero ready={ready} onStart={startProject} onBrowse={browseWork} />
        <Marquee />
        <SelectedWork ready={ready} onOpen={openTemplate} />
      </main>

      <HomeFooter onStart={startProject} />
    </div>
  );
}
