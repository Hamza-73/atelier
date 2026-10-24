"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Monitor, Tablet, Smartphone } from "lucide-react";
import { useEditor } from "@/lib/store";
import Site from "@/components/canvas/Site";
import DarkModeToggle from "@/components/DarkModeToggle";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, icon: Smartphone },
];

export default function PreviewMode() {
  const { state, dispatch } = useEditor();
  const [device, setDevice] = useState("desktop");

  if (!state.design) return null;
  const width = DEVICES.find((d) => d.id === device).width;

  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-surround">
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_PREVIEWING", previewing: false })}
          className="flex items-center gap-2 border border-ink/15 bg-paper/95 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Editor
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-ink/15 bg-paper/95 px-1.5 py-1.5 shadow-sm backdrop-blur-sm">
            {DEVICES.map((d) => {
              const Icon = d.icon;
              const active = device === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDevice(d.id)}
                  aria-pressed={active}
                  aria-label={`${d.label} preview`}
                  className={`flex h-7 w-7 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                    active ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
          <DarkModeToggle className="border border-ink/15 bg-paper/95 shadow-sm backdrop-blur-sm" />
        </div>
      </div>

      <div className="flex justify-center pt-16">
        <motion.div
          animate={{ width }}
          transition={{ type: "spring", stiffness: 280, damping: 32 }}
          className="min-w-0 max-w-full bg-paper shadow-[0_24px_60px_-20px_rgba(34,35,31,0.3)]"
        >
          <Site design={state.design} editable={false} />
        </motion.div>
      </div>
    </div>
  );
}
