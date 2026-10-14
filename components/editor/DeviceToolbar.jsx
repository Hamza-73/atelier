"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

const DEVICES = [
  { id: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, icon: Tablet },
  { id: "mobile", label: "Mobile", width: 390, icon: Smartphone },
];

export const DEVICE_WIDTHS = Object.fromEntries(DEVICES.map((d) => [d.id, d.width]));

export default function DeviceToolbar() {
  const { state, dispatch } = useEditor();

  return (
    <div className="flex items-center justify-center gap-1 border-b border-warmgrey bg-ivory px-4 py-2.5">
      {DEVICES.map((d) => {
        const Icon = d.icon;
        const active = state.device === d.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => dispatch({ type: "SET_DEVICE", device: d.id })}
            aria-pressed={active}
            aria-label={`${d.label} preview, ${d.width} pixels`}
            className={cn(
              "flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
              active ? "bg-ink text-paper" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
