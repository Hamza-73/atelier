"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FolderOpen, ImageOff } from "lucide-react";
import { useEditor } from "@/lib/store";
import { TEMPLATES, CATEGORIES } from "@/data/templates";
import { cn } from "@/lib/utils";
import DarkModeToggle from "@/components/DarkModeToggle";

const LAYOUT = {
  residence: { col: "lg:col-span-7", aspect: "aspect-[4/3]", offset: "" },
  "form-studio": { col: "lg:col-span-5", aspect: "aspect-[3/4]", offset: "lg:mt-20" },
  "objects-co": { col: "lg:col-span-5", aspect: "aspect-square", offset: "" },
  maison: { col: "lg:col-span-7", aspect: "aspect-[16/9]", offset: "lg:-mt-12" },
};

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Cover({ src, alt }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-warmgrey text-ink/50">
        <ImageOff className="h-5 w-5" />
        <span className="text-[11px] uppercase tracking-wider">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setBroken(true)}
      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      loading="lazy"
    />
  );
}

export default function Gallery() {
  const { state, dispatch } = useEditor();
  const [view, setView] = useState("templates");
  const [category, setCategory] = useState("All");

  const visibleTemplates = category === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === category);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-6 pb-24 pt-8 sm:px-10">
      <header className="mb-14 flex flex-wrap items-center justify-between gap-6">
        <span className="text-xl tracking-[0.1em]" style={{ fontFamily: "var(--font-playfair, var(--font-serif))" }}>
          ATELIER
        </span>
        <nav className="flex items-center gap-8">
          <NavLink active={view === "templates"} onClick={() => setView("templates")}>
            Templates
          </NavLink>
          <NavLink active={view === "my-designs"} onClick={() => setView("my-designs")}>
            My Designs
          </NavLink>
          <button
            type="button"
            onClick={() => dispatch({ type: "OPEN_TEMPLATE", id: TEMPLATES[0].id })}
            className="border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            New Project
          </button>
          <DarkModeToggle />
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {view === "templates" ? (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-10 max-w-2xl">
              <h1 className="text-4xl leading-[1.08] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
                Good design begins with a point of view.
              </h1>
              <p className="mt-4 text-base text-ink/60">
                Four starting points, each a complete editorial position. Choose one and make it yours.
              </p>
            </div>

            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className="relative px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  {category === c && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={cn("relative", category === c ? "text-paper" : "text-ink/60 hover:text-ink")}>
                    {c}
                  </span>
                </button>
              ))}
            </div>

            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8"
            >
              {visibleTemplates.map((template, i) => {
                const layout = LAYOUT[template.id] || { col: "lg:col-span-6", aspect: "aspect-[4/3]", offset: "" };
                return (
                  <motion.div
                    key={template.id}
                    variants={cardIn}
                    className={cn("group flex flex-col gap-4", layout.col, layout.offset)}
                  >
                    <div className={cn("relative overflow-hidden bg-ivory", layout.aspect)}>
                      <Cover src={template.cover} alt={template.name} />
                      <span className="absolute left-4 top-4 text-[11px] tracking-[0.2em] text-paper/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {String(TEMPLATES.indexOf(template) + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-[0.15em] text-olive">{template.category}</span>
                        <h2 className="text-2xl" style={{ fontFamily: "var(--font-serif)" }}>
                          {template.name}
                        </h2>
                        <p className="max-w-sm text-sm text-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {template.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "OPEN_TEMPLATE", id: template.id })}
                        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b border-ink/30 pb-0.5 text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:border-terracotta hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      >
                        Customize
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="my-designs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-10 max-w-2xl">
              <h1 className="text-4xl leading-[1.08] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
                My Designs
              </h1>
              <p className="mt-4 text-base text-ink/60">Work saved in this session, ready to pick back up.</p>
            </div>

            {state.savedDesigns.length === 0 ? (
              <div className="flex flex-col items-center gap-4 border border-dashed border-warmgrey px-6 py-20 text-center">
                <FolderOpen className="h-6 w-6 text-ink/30" />
                <p className="text-ink/50">Nothing saved yet. Open a template and press Save to keep your work here.</p>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "OPEN_TEMPLATE", id: TEMPLATES[0].id })}
                  className="mt-2 border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  Start a New Project
                </button>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-warmgrey border-t border-warmgrey">
                {state.savedDesigns.map((entry) => (
                  <li key={entry.savedId}>
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "OPEN_SAVED", id: entry.savedId })}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      <span className="flex flex-col gap-1">
                        <span className="text-xl" style={{ fontFamily: "var(--font-serif)" }}>
                          {entry.name}
                        </span>
                        <span className="text-xs text-ink/50">
                          Saved {new Date(entry.updatedAt).toLocaleString()}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/40" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-[12px] uppercase tracking-[0.15em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
        active ? "text-ink" : "text-ink/50 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}
