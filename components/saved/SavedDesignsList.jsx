"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, FolderOpen, Loader2, Pencil, Copy, Trash2, Check, X, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { renameDesign, duplicateDesign, deleteDesign } from "@/lib/actions/designs";

function SavedDesignRow({ entry, onRenamed, onDuplicated, onDeleted }) {
  const router = useRouter();
  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(entry.name);
  const [busy, setBusy] = useState(null); // "rename" | "duplicate" | "delete"
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);
  const [opening, setOpening] = useState(false);

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
      onRenamed(entry.savedId, name);
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
      onDuplicated({ savedId: result.id, name: `${entry.name} (Copy)`, templateId: entry.templateId, updatedAt: result.updatedAt });
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
      onDeleted(entry.savedId);
    } catch {
      setError("Couldn't delete");
      setBusy(null);
      setConfirmDelete(false);
    }
  }

  function openDesign() {
    setOpening(true);
    router.push(`/editor/${entry.savedId}`);
  }

  return (
    <li data-saved-row className="border-b border-ink/15">
      <div className="flex items-center justify-between gap-6 py-6">
        <button
          type="button"
          onClick={() => !renaming && openDesign()}
          disabled={opening || renaming}
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
              <span className="flex items-center gap-2 truncate text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                {entry.name}
                {entry.isPublished && <Globe className="h-3.5 w-3.5 shrink-0 text-olive" aria-label="Published" />}
              </span>
            )}
            <span className="text-xs text-ink/50">
              {error || `Saved ${new Date(entry.updatedAt).toLocaleString()}`}
            </span>
          </span>
          {opening ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-ink/40" />
          ) : (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          )}
        </button>

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
      </div>
    </li>
  );
}

// Renders the list of a signed-in user's saved designs. Entry point is
// app/saved/page.js, which fetches the initial list server-side (the
// caller is already known to be signed in by then) and passes it in here.
export default function SavedDesignsList({ initialDesigns, onStart }) {
  const [designs, setDesigns] = useState(initialDesigns);
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

  function handleRenamed(savedId, name) {
    setDesigns((list) => list.map((d) => (d.savedId === savedId ? { ...d, name } : d)));
  }

  function handleDuplicated(entry) {
    setDesigns((list) => [entry, ...list]);
  }

  function handleDeleted(savedId) {
    setDesigns((list) => list.filter((d) => d.savedId !== savedId));
  }

  return (
    <section ref={ref} className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
      <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[1]" style={{ fontFamily: "var(--font-serif)" }}>
        Saved Designs
      </h2>
      <p className="mt-4 max-w-lg text-base text-ink/60">Saved to your account, ready to pick back up.</p>

      {designs.length === 0 ? (
        <div data-saved-row className="mt-12 flex flex-col items-start gap-5 border border-dashed border-warmgrey px-8 py-16">
          <FolderOpen className="h-6 w-6 text-ink/30" />
          <p className="text-ink/50">Nothing saved yet. Open a template and press Save to keep your work here.</p>
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
          {designs.map((entry) => (
            <SavedDesignRow
              key={entry.savedId}
              entry={entry}
              onRenamed={handleRenamed}
              onDuplicated={handleDuplicated}
              onDeleted={handleDeleted}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
