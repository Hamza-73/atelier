"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Nav({ section }) {
  const { variant, props } = section;
  const [open, setOpen] = useState(false);
  const links = props.links || [];
  const centered = variant === "centered-stack";

  return (
    <nav className="relative border-b border-[var(--border)] bg-[var(--bg)]">
      <div
        className={cn(
          "relative mx-auto flex max-w-6xl px-6 py-5 @3xl:px-10",
          centered ? "flex-col items-center gap-3" : "items-center justify-between"
        )}
      >
        <span className="text-lg tracking-wide" style={{ fontFamily: "var(--font-head)" }}>
          {props.logo}
        </span>
        <ul className={cn("hidden items-center gap-8 @3xl:flex", centered && "@3xl:mt-1")}>
          {links.map((link, i) => (
            <li
              key={i}
              className="cursor-default text-[12px] uppercase tracking-[0.15em] text-[var(--text)]/80 transition-colors hover:text-[var(--text)]"
            >
              {link.label}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "rounded-sm p-1 text-[var(--text)] @3xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
            centered && "absolute right-6 top-5"
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <ul className="flex flex-col gap-4 border-t border-[var(--border)] px-6 py-5 @3xl:hidden">
          {links.map((link, i) => (
            <li key={i} className="text-[12px] uppercase tracking-[0.15em] text-[var(--text)]/80">
              {link.label}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
