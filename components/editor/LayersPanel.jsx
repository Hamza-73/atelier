"use client";

import { AnimatePresence } from "motion/react";
import { Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, FileText } from "lucide-react";
import { useEditor } from "@/lib/store";
import { FIXED_SECTION_TYPES, SECTION_LABELS } from "@/data/templates";
import { cn } from "@/lib/utils";
import AddSectionPanel from "./AddSectionPanel";

export default function LayersPanel() {
  const { state, dispatch } = useEditor();
  const sections = state.design.sections;
  const adding = state.dialog === "addSection";

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-5">
      <div>
        <h3 className="mb-2 text-[11px] uppercase tracking-[0.2em] text-olive">Pages</h3>
        <div className="flex items-center gap-2 border border-warmgrey bg-ivory px-3 py-2">
          <FileText className="h-3.5 w-3.5 text-ink/50" />
          <span className="text-sm text-ink">Home</span>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {adding ? (
            <AddSectionPanel key="add" />
          ) : (
            <div key="layers" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-olive">Sections</h3>
              </div>
              <ul className="flex flex-col gap-1">
                {sections.map((section, i) => {
                  const fixed = FIXED_SECTION_TYPES.includes(section.type);
                  const selected = state.selectedId === section.id;
                  return (
                    <li key={section.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => dispatch({ type: "SELECT", id: section.id })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") dispatch({ type: "SELECT", id: section.id });
                        }}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-2 border px-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                          selected ? "border-terracotta bg-terracotta/5" : "border-transparent hover:bg-ink/5",
                          !section.visible && "opacity-50"
                        )}
                      >
                        <span className="truncate text-sm text-ink">{SECTION_LABELS[section.type]}</span>
                        <span className="flex shrink-0 items-center gap-0.5">
                          <IconButton
                            icon={ArrowUp}
                            label="Move up"
                            disabled={fixed || i === 0}
                            onClick={() => dispatch({ type: "MOVE_SECTION", id: section.id, direction: "up" })}
                          />
                          <IconButton
                            icon={ArrowDown}
                            label="Move down"
                            disabled={fixed || i === sections.length - 1}
                            onClick={() => dispatch({ type: "MOVE_SECTION", id: section.id, direction: "down" })}
                          />
                          <IconButton
                            icon={section.visible ? Eye : EyeOff}
                            label={section.visible ? "Hide" : "Show"}
                            onClick={() => dispatch({ type: "TOGGLE_VISIBLE", id: section.id })}
                          />
                          <IconButton
                            icon={Trash2}
                            label="Delete"
                            disabled={fixed}
                            onClick={() => dispatch({ type: "DELETE_SECTION", id: section.id })}
                          />
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_DIALOG", dialog: "addSection" })}
                className="mt-1 flex items-center justify-center gap-2 border border-dashed border-warmgrey px-3 py-2.5 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Section
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IconButton({ icon: Icon, label, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-6 w-6 items-center justify-center rounded-sm text-ink/50 hover:bg-ink/10 hover:text-ink disabled:opacity-20 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
    >
      <Icon className="h-3 w-3" />
    </button>
  );
}
