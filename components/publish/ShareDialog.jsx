"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Globe, Copy, Check, ExternalLink, AlertTriangle, Loader2 } from "lucide-react";
import { useEditor } from "@/lib/store";
import { publishDesign, unpublishDesign } from "@/lib/actions/designs";

export default function ShareDialog() {
  const { state, dispatch } = useEditor();
  const open = state.dialog === "share";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    setError(null);
    setCopied(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!state.design) return null;

  const design = state.design;
  const publicUrl = design.publicSlug && typeof window !== "undefined" ? `${window.location.origin}/s/${design.publicSlug}` : null;

  function close() {
    dispatch({ type: "SET_DIALOG", dialog: null });
  }

  async function handlePublish() {
    if (!design.savedId) {
      setError("Save your design first, then publish it.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await publishDesign(design.savedId);
      dispatch({ type: "SET_PUBLISH_STATE", savedId: design.savedId, isPublished: true, publicSlug: result.publicSlug });
    } catch (e) {
      setError(e.message || "Couldn't publish");
    } finally {
      setBusy(false);
    }
  }

  async function handleUnpublish() {
    setBusy(true);
    setError(null);
    try {
      await unpublishDesign(design.savedId);
      dispatch({ type: "SET_PUBLISH_STATE", savedId: design.savedId, isPublished: false });
    } catch (e) {
      setError(e.message || "Couldn't unpublish");
    } finally {
      setBusy(false);
    }
  }

  async function handleCopy() {
    if (!publicUrl) return;
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable  link is still shown and selectable */
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-ink/40"
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-dialog-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md border border-warmgrey bg-paper p-7 shadow-2xl focus:outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-sm text-ink/50 hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-olive">Publish to web</p>
            <h2 id="share-dialog-title" className="mb-6 text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
              {design.name || "Untitled Project"}
            </h2>

            <div className="flex flex-col gap-5">
              {design.isPublished && publicUrl ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-olive">
                    <Globe className="h-4 w-4" />
                    Live  anyone with this link can view it
                  </div>
                  <div className="flex items-center justify-between gap-2 border border-warmgrey bg-ivory px-3 py-2.5">
                    <span className="truncate text-sm text-ink">{publicUrl}</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label="Copy link"
                      className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-ink/40">
                    This page always reflects your latest save  edit and save again to update it live.
                  </p>
                  <div className="flex gap-3 pt-1">
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={handleUnpublish}
                      disabled={busy}
                      className="flex-1 border border-warmgrey px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta disabled:opacity-60"
                    >
                      {busy ? "Unpublishing…" : "Unpublish"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-ink/70">
                    Get a public link anyone can open  no account or export needed on their end.
                  </p>
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-terracotta">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={busy}
                    className="flex items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Globe className="h-3.5 w-3.5" />}
                    {busy ? "Publishing…" : "Publish this site"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
