"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { IMAGES, FOCAL_POINTS, imageById } from "@/data/images";
import { SiteImage } from "@/components/canvas/shared";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "architecture", "interior", "furniture", "studio"];

export default function ImagePicker({ imageId, focal = "center", onChange }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const image = imageById(imageId);
  const visible = category === "all" ? IMAGES : IMAGES.filter((img) => img.category === category);

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden border border-warmgrey">
        <div className="aspect-[4/3] w-full bg-ivory">
          <SiteImage imageId={imageId} focal={focal} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center justify-between border border-warmgrey px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-ink/70 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <span>{open ? "Choose an image" : `${image.category} · change image`}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border border-warmgrey p-3">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                      category === c ? "border-ink bg-ink text-paper" : "border-warmgrey text-ink/60 hover:border-ink"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto">
                {visible.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => {
                      onChange({ imageId: img.id, focal });
                      setOpen(false);
                    }}
                    aria-label={`Use image: ${img.label}`}
                    className={cn(
                      "aspect-square overflow-hidden border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                      img.id === imageId ? "border-terracotta" : "border-transparent hover:border-warmgrey"
                    )}
                  >
                    <img src={img.url} alt={img.label} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.15em] text-ink/40">Focal point</span>
        <div className="flex gap-1">
          {FOCAL_POINTS.map((f) => (
            <button
              key={f}
              type="button"
              aria-label={`Focal point: ${f}`}
              aria-pressed={focal === f}
              onClick={() => onChange({ imageId, focal: f })}
              className={cn(
                "h-5 w-5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                focal === f ? "border-ink bg-ink" : "border-warmgrey hover:border-ink"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
