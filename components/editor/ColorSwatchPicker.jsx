"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const PRESETS = [
  "#F4F0E7",
  "#FBFAF6",
  "#22231F",
  "#777D50",
  "#B55E42",
  "#D9D5CC",
  "#FFFFFF",
  "#17181A",
  "#4B5A3A",
  "#C98A4B",
];

function isValidHex(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

export default function ColorSwatchPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const wrapperRef = useRef(null);

  if (value !== prevValue) {
    setPrevValue(value);
    setDraft(value);
  }

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function commit(next) {
    setDraft(next);
    if (isValidHex(next)) onChange(next);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose color"
        aria-expanded={open}
        className="h-7 w-10 shrink-0 border border-warmgrey transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        style={{ background: value }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-30 mt-2 w-52 border border-warmgrey bg-paper p-3 shadow-lg"
          >
            <div className="mb-3 grid grid-cols-5 gap-1.5">
              {PRESETS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  aria-label={`Use color ${hex}`}
                  onClick={() => {
                    commit(hex);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-6 w-6 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                    hex.toLowerCase() === value?.toLowerCase() ? "border-ink" : "border-warmgrey"
                  )}
                  style={{ background: hex }}
                />
              ))}
            </div>
            <div className="flex items-stretch gap-1.5">
              <label className="relative h-[34px] w-9 shrink-0 cursor-pointer overflow-hidden border border-warmgrey transition-colors hover:border-ink">
                <input
                  type="color"
                  value={isValidHex(draft) ? draft : "#000000"}
                  onChange={(e) => commit(e.target.value)}
                  aria-label="Pick any color"
                  className="absolute -left-1 -top-1 h-12 w-12 cursor-pointer appearance-none border-none bg-transparent p-0"
                />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40">Hex</span>
                <input
                  value={draft}
                  onChange={(e) => commit(e.target.value)}
                  spellCheck={false}
                  className={cn(
                    "w-full border bg-paper px-2 py-1.5 text-sm text-ink outline-none transition-colors focus-visible:ring-2 focus-visible:ring-terracotta",
                    isValidHex(draft) ? "border-warmgrey focus-visible:border-ink" : "border-terracotta"
                  )}
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
