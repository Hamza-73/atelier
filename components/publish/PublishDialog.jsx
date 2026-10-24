"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Download, ExternalLink, Sparkles, AlertTriangle } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useEditor } from "@/lib/store";
import Site from "@/components/canvas/Site";
import PublishLoader from "./PublishLoader";

const STEPS = ["Preparing design", "Checking layout", "Generating export", "Complete"];
const MIN_STEP_DURATION = 450;

function slugify(name) {
  return (
    (name || "project")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "project"
  );
}

export default function PublishDialog() {
  const { state, dispatch } = useEditor();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const open = state.dialog === "publish";
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const panelRef = useRef(null);
  const captureRef = useRef(null);
  const urlRef = useRef(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    setStep(0);
    setShowResult(false);
    setError(null);
  }

  useEffect(() => {
    if (!open) return;

    if (!isSignedIn) {
      dispatch({ type: "SET_DIALOG", dialog: null });
      openSignIn();
      return;
    }

    panelRef.current?.focus();
    let cancelled = false;

    async function run() {
      const startedAt = Date.now();
      const pace = async (targetStep) => {
        const elapsed = Date.now() - startedAt;
        const minElapsed = targetStep * MIN_STEP_DURATION;
        if (elapsed < minElapsed) await new Promise((r) => setTimeout(r, minElapsed - elapsed));
        if (!cancelled) setStep(targetStep);
      };

      try {
        await pace(1);
        // The capture node renders the real Site component off-screen, so
        // this is the editor's actual markup, not a re-implementation.
        const root = captureRef.current?.firstElementChild;
        if (!root) throw new Error("Nothing to export yet");
        const bodyHtml = root.outerHTML;

        await pace(2);
        const res = await fetch("/api/export", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: state.design.name, bodyHtml }),
        });

        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload.error || "Export failed");
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;

        await pace(3);
        if (cancelled) return;
        setDownloadUrl(url);
        setShowResult(true);
        triggerDownload(url, state.design.name);
      } catch (e) {
        if (!cancelled) setError(e.message || "Something went wrong");
      }
    }

    run();

    return () => {
      cancelled = true;
    };
    // Re-run only when the dialog opens, not on every state.design change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isSignedIn]);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!state.design) return null;

  function triggerDownload(url, name) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(name)}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const name = state.design.name || "Untitled Project";
  const complete = step === STEPS.length - 1;

  function close() {
    dispatch({ type: "SET_DIALOG", dialog: null });
  }

  return (
    <>
      {/* Rendered off-screen (not display:none, so layout/measurement is
          real) purely so its finished DOM can be captured as the export's
          HTML  see lib/export/render.js for how it's assembled into a zip. */}
      {open && isSignedIn && (
        <div ref={captureRef} aria-hidden style={{ position: "fixed", top: 0, left: "-99999px", width: 1280 }}>
          <Site design={state.design} editable={false} />
        </div>
      )}

      <AnimatePresence>
        {open && isSignedIn && (
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
              aria-labelledby="publish-dialog-title"
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

              <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-olive">Export</p>
              <h2 id="publish-dialog-title" className="mb-6 text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                {name}
              </h2>

              {error ? (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-sm text-terracotta">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setStep(0);
                        setPrevOpen(!open);
                      }}
                      className="flex-1 bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                    >
                      Try again
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="flex-1 border border-warmgrey px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : !showResult ? (
                <div className="flex flex-col items-center gap-5">
                  <PublishLoader step={step} totalSteps={STEPS.length} complete={complete} />
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={step}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-ink/70"
                    >
                      {STEPS[step]}
                      {complete ? "" : "…"}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-center text-xs text-ink/40">
                    Builds a static HTML + CSS site you can host anywhere.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2 text-sm text-olive">
                    <Sparkles className="h-4 w-4" />
                    Your download should have started
                  </div>
                  <p className="text-xs text-ink/50">
                    A .zip with index.html, assets/site.css, assets/site.js and a README with deploy steps
                    (Netlify Drop, Vercel, or GitHub Pages).
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => downloadUrl && triggerDownload(downloadUrl, name)}
                      className="flex flex-1 items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download again
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "SET_SCREEN", screen: "preview" })}
                      className="flex flex-1 items-center justify-center gap-1.5 border border-warmgrey px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Preview
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
