"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { useEditor } from "@/lib/store";
import PublishLoader from "./PublishLoader";

const STEPS = ["Preparing design", "Checking layout", "Generating preview", "Complete"];
const STEP_DURATION = 850;
const SUCCESS_REVEAL_DELAY = 700;

function slugify(name) {
  return (
    (name || "project")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "project"
  );
}

function hashSuffix(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash.toString(36).slice(0, 4).padEnd(4, "0");
}

export default function PublishDialog() {
  const { state, dispatch } = useEditor();
  const open = state.dialog === "publish";
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);
  const timeouts = useRef([]);
  const panelRef = useRef(null);

  if (open !== prevOpen) {
    setPrevOpen(open);
    setStep(0);
    setShowSuccess(false);
    setCopied(false);
  }

  useEffect(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    if (!open) return;

    panelRef.current?.focus();
    for (let i = 1; i < STEPS.length; i++) {
      timeouts.current.push(setTimeout(() => setStep(i), i * STEP_DURATION));
    }
    timeouts.current.push(
      setTimeout(() => setShowSuccess(true), (STEPS.length - 1) * STEP_DURATION + SUCCESS_REVEAL_DELAY)
    );

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") dispatch({ type: "SET_DIALOG", dialog: null });
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dispatch]);

  if (!state.design) return null;

  const name = state.design.name || "Untitled Project";
  const slug = slugify(name);
  const url = `atelier.preview/${slug}-${hashSuffix(name)}`;
  const complete = step === STEPS.length - 1;

  function close() {
    dispatch({ type: "SET_DIALOG", dialog: null });
  }

  async function handleCopy() {
    let didCopy = false;
    try {
      await navigator.clipboard.writeText(url);
      didCopy = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        didCopy = true;
      } catch {
        didCopy = false;
      }
      document.body.removeChild(textarea);
    }
    if (didCopy) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
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

            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-olive">Publish</p>
            <h2 id="publish-dialog-title" className="mb-6 text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
              {name}
            </h2>

            {!showSuccess ? (
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
                  This is a local preview simulation. Nothing is being deployed anywhere.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 text-sm text-olive">
                  <Sparkles className="h-4 w-4" />
                  Preview ready
                </div>
                <div className="flex items-center justify-between gap-2 border border-warmgrey bg-ivory px-3 py-2.5">
                  <span className="truncate text-sm text-ink">{url}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy preview link"
                    className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-ink/40">
                  A fictional local-preview URL. This project is not actually deployed anywhere.
                </p>
                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SET_SCREEN", screen: "preview" })}
                    className="flex flex-1 items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open Preview
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex-1 border border-warmgrey px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    Return to Editor
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
