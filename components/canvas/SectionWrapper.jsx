"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, ArrowDown, Eye, EyeOff, Trash2 } from "lucide-react";
import { useEditor } from "@/lib/store";
import { FIXED_SECTION_TYPES, SECTION_LABELS } from "@/data/templates";
import { cn } from "@/lib/utils";

function ToolbarButton({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-sm p-1.5 text-ink/70 hover:bg-ink/5 hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

export default function SectionWrapper({ section, index, total, selected, onSelect, children }) {
  const { dispatch } = useEditor();
  const ref = useRef(null);
  const fixed = FIXED_SECTION_TYPES.includes(section.type);

  useEffect(() => {
    if (selected && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(section.id);
      }}
      className={cn(
        "group relative cursor-pointer transition-opacity",
        !section.visible && "opacity-40"
      )}
    >
      {children}

      <AnimatePresence>
        {selected && (
          <motion.div
            layoutId="selection-outline"
            className="pointer-events-none absolute inset-0 z-10 ring-2 ring-inset ring-terracotta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {!selected && (
        <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-terracotta/0 transition-all group-hover:ring-terracotta/30" />
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-3 right-3 z-20 flex items-center gap-0.5 rounded-sm border border-ink/10 bg-paper px-1 py-1 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="px-1.5 text-[10px] uppercase tracking-wider text-ink/50">
              {SECTION_LABELS[section.type]}
            </span>
            <ToolbarButton
              icon={ArrowUp}
              label="Move up"
              disabled={fixed || index <= 0}
              onClick={() => dispatch({ type: "MOVE_SECTION", id: section.id, direction: "up" })}
            />
            <ToolbarButton
              icon={ArrowDown}
              label="Move down"
              disabled={fixed || index >= total - 1}
              onClick={() => dispatch({ type: "MOVE_SECTION", id: section.id, direction: "down" })}
            />
            <ToolbarButton
              icon={section.visible ? Eye : EyeOff}
              label={section.visible ? "Hide section" : "Show section"}
              onClick={() => dispatch({ type: "TOGGLE_VISIBLE", id: section.id })}
            />
            <ToolbarButton
              icon={Trash2}
              label="Delete section"
              disabled={fixed}
              onClick={() => dispatch({ type: "DELETE_SECTION", id: section.id })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
