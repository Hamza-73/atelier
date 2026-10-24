"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FolderOpen, Loader2, Pencil, Copy, Trash2, Check, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useEditor } from "@/lib/store";
import { TEMPLATES } from "@/data/templates";
import { listDesigns, getDesign, renameDesign, duplicateDesign, deleteDesign } from "@/lib/actions/designs";
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

function SavedDesignRow({ entry, isSignedIn, opening, onOpen, dispatch }) {
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(entry.name);
  const [busy, setBusy] = useState(null); // "rename" | "duplicate" | "delete"
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  async function commitRename() {
    const name = draftName.trim();
    if (!name || name === entry.name) {
      setRenaming(false);
      setDraftName(entry.name);
      return;
    }
    setBusy("rename");
    setError(null);
    try {
      await renameDesign(entry.savedId, name);
      dispatch({ type: "RENAME_SAVED_DESIGN", savedId: entry.savedId, name });
      setRenaming(false);
    } catch {
      setError("Couldn't rename");
    } finally {
      setBusy(null);
    }
  }

  async function handleDuplicate() {
    setBusy("duplicate");
    setError(null);
    try {
      const result = await duplicateDesign(entry.savedId);
      dispatch({
        type: "ADD_SAVED_DESIGN",
        entry: { savedId: result.id, name: `${entry.name} (Copy)`, templateId: entry.templateId, updatedAt: result.updatedAt },
      });
    } catch {
      setError("Couldn't duplicate");
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    setBusy("delete");
    setError(null);
    try {
      await deleteDesign(entry.savedId);
      dispatch({ type: "REMOVE_SAVED_DESIGN", savedId: entry.savedId });
    } catch {
      setError("Couldn't delete");
      setBusy(null);
      setConfirmDelete(false);
    }
  }

  return (
    <li data-saved-row className="border-b border-ink/15">
      <div className="flex items-center justify-between gap-6 py-6">
        <button
          type="button"
          onClick={() => !renaming && onOpen(entry.savedId)}
          disabled={opening === entry.savedId || renaming}
          className="group flex min-w-0 flex-1 items-center justify-between gap-6 text-left transition-colors hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta disabled:cursor-default"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            {renaming ? (
              <input
                autoFocus
                value={draftName}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitRename();
                  if (e.key === "Escape") {
                    setRenaming(false);
                    setDraftName(entry.name);
                  }
                }}
                className="w-full max-w-sm border-b border-ink/30 bg-transparent text-2xl outline-none"
                style={{ fontFamily: "var(--font-serif)" }}
              />
            ) : (
              <span className="truncate text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                {entry.name}
              </span>
            )}
            <span className="text-xs text-ink/50">
              {error || `Saved ${new Date(entry.updatedAt).toLocaleString()}`}
            </span>
          </span>
          {opening === entry.savedId ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-ink/40" />
          ) : (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>

        {isSignedIn && (
          <div className="flex shrink-0 items-center gap-1.5">
            {renaming ? (
              <>
                <button
                  type="button"
                  aria-label="Confirm rename"
                  onClick={commitRename}
                  disabled={busy === "rename"}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-50"
                >
                  {busy === "rename" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Cancel rename"
                  onClick={() => {
                    setRenaming(false);
                    setDraftName(entry.name);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : confirmDelete ? (
              <>
                <span className="text-xs text-ink/50">Delete?</span>
                <button
                  type="button"
                  aria-label="Confirm delete"
                  onClick={handleDelete}
                  disabled={busy === "delete"}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-terracotta transition-colors hover:bg-terracotta/10 disabled:opacity-50"
                >
                  {busy === "delete" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Cancel delete"
                  onClick={() => setConfirmDelete(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  aria-label="Rename"
                  onClick={() => setRenaming(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Duplicate"
                  onClick={handleDuplicate}
                  disabled={busy === "duplicate"}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-50"
                >
                  {busy === "duplicate" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Delete"
                  onClick={() => setConfirmDelete(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors hover:bg-terracotta/10 hover:text-terracotta"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function SavedDesigns({ onStart }) {
  const { state, dispatch } = useEditor();
  const { isSignedIn } = useUser();
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    listDesigns()
      .then((designs) => {
        if (active) dispatch({ type: "HYDRATE_SAVED_DESIGNS", designs });
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isSignedIn, dispatch]);

  async function openSaved(savedId) {
    setOpening(savedId);
    try {
      const design = await getDesign(savedId);
      dispatch({ type: "LOAD_SERVER_DESIGN", design });
    } catch {
      setOpening(null);
    }
  }

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
        {isSignedIn ? "Saved to your account, ready to pick back up." : "Sign in to save your work and come back to it anytime."}
      </p>

      {loading ? (
        <div data-saved-row className="mt-12 flex items-center gap-3 border border-dashed border-warmgrey px-8 py-16 text-ink/50">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your saved designs…
        </div>
      ) : state.savedDesigns.length === 0 ? (
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
            <SavedDesignRow
              key={entry.savedId}
              entry={entry}
              isSignedIn={isSignedIn}
              opening={opening}
              dispatch={dispatch}
              onOpen={(savedId) => (isSignedIn ? openSaved(savedId) : dispatch({ type: "OPEN_SAVED", id: savedId }))}
            />
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
