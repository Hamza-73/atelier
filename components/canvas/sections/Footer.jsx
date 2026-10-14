"use client";

import { cn } from "@/lib/utils";

export default function Footer({ section }) {
  const { variant, props } = section;
  const links = props.links || [];
  const columns = variant === "columns";

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div
        className={cn(
          "mx-auto max-w-6xl px-6 py-10 @3xl:px-10",
          columns
            ? "flex flex-col gap-8 @3xl:flex-row @3xl:items-start @3xl:justify-between"
            : "flex flex-col items-center gap-4 text-center"
        )}
      >
        <div className="flex flex-col gap-2">
          <span className="text-lg" style={{ fontFamily: "var(--font-head)" }}>
            {props.logo}
          </span>
          {!columns && <p className="text-xs text-[var(--muted)]">{props.note}</p>}
        </div>
        <ul className={cn("flex flex-wrap gap-6", !columns && "justify-center")}>
          {links.map((link, i) => (
            <li
              key={i}
              className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--text)]"
            >
              {link.label}
            </li>
          ))}
        </ul>
        {columns && <p className="text-xs text-[var(--muted)]">{props.note}</p>}
      </div>
    </footer>
  );
}
