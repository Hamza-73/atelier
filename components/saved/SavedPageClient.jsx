"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import SavedDesignsList from "./SavedDesignsList";
import { TEMPLATES } from "@/data/templates";

// The page itself already guarantees the viewer is signed in (see
// app/saved/page.js), so "New Project" here can go straight to the
// editor — no sign-in gate needed, unlike on the public homepage.
export default function SavedPageClient({ initialDesigns }) {
  const router = useRouter();

  const startProject = useCallback(() => {
    router.push(`/editor/new?template=${TEMPLATES[0].id}`);
  }, [router]);

  return (
    <div className="min-h-dvh w-full bg-paper">
      <HomeNav ready onNewProject={startProject} />
      <main>
        <SavedDesignsList initialDesigns={initialDesigns} onStart={startProject} />
      </main>
      <HomeFooter onStart={startProject} />
    </div>
  );
}
