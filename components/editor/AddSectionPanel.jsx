"use client";

import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useEditor } from "@/lib/store";
import { SECTION_ORDER, SECTION_LABELS, SECTION_DESCRIPTIONS, FIXED_SECTION_TYPES } from "@/data/templates";

export default function AddSectionPanel() {
  const { state, dispatch } = useEditor();
  const used = new Set(state.design.sections.map((s) => s.type));
  const available = SECTION_ORDER.filter((type) => !FIXED_SECTION_TYPES.includes(type) && !used.has(type));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-olive">Add a Section</h3>
        <button
          type="button"
          aria-label="Close"
          onClick={() => dispatch({ type: "SET_DIALOG", dialog: null })}
          className="flex h-6 w-6 items-center justify-center rounded-sm text-ink/60 hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {available.length === 0 ? (
        <p className="border border-dashed border-warmgrey px-3 py-6 text-center text-sm text-ink/50">
          Every section type is already on this page.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {available.map((type) => (
            <li key={type}>
              <button
                type="button"
                onClick={() => dispatch({ type: "ADD_SECTION", sectionType: type })}
                className="group flex w-full items-start justify-between gap-3 border border-warmgrey px-3 py-3 text-left transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-serif text-base text-ink">{SECTION_LABELS[type]}</span>
                  <span className="text-xs text-ink/50">{SECTION_DESCRIPTIONS[type]}</span>
                </span>
                <Plus className="mt-1 h-4 w-4 shrink-0 text-ink/40 transition-colors group-hover:text-terracotta" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
