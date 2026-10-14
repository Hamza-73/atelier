"use client";

import { SiteImage, spacingClasses } from "../shared";
import { cn } from "@/lib/utils";

export default function Projects({ section }) {
  const { variant, props } = section;
  const items = props.items || [];

  return (
    <section className={spacingClasses(section.spacing)}>
      <div className="mx-auto max-w-6xl px-6 @3xl:px-10">
        <div className="mb-8 @3xl:mb-12">
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
        </div>

        {variant === "grid" && (
          <div className="grid grid-cols-1 gap-8 @md:grid-cols-2 @3xl:grid-cols-3">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-3">
                <SiteImage imageId={item.imageId} focal={item.focal} className="aspect-[4/5] w-full" />
                <h3 className="text-lg" style={{ fontFamily: "var(--font-head)" }}>
                  {item.title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">{item.category}</p>
              </div>
            ))}
          </div>
        )}

        {variant === "list-featured" && (
          <div className="flex flex-col divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-6 py-8 @3xl:flex-row @3xl:items-center @3xl:gap-12",
                  i % 2 === 1 && "@3xl:flex-row-reverse"
                )}
              >
                <SiteImage imageId={item.imageId} focal={item.focal} className="aspect-[3/2] w-full @3xl:w-1/2" />
                <div className="flex flex-col gap-2 @3xl:w-1/2">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-[var(--accent)]">
                    {item.category}
                  </span>
                  <h3 className="text-2xl" style={{ fontFamily: "var(--font-head)" }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === "editorial" && (
          <div className="grid grid-cols-1 gap-10 @3xl:grid-cols-[1.4fr_1fr]">
            <SiteImage imageId={items[0]?.imageId} focal={items[0]?.focal} className="aspect-[4/3] w-full" />
            <div className="flex flex-col divide-y divide-[var(--border)] border-t border-[var(--border)] @3xl:border-t-0">
              {items.map((item, i) => (
                <div key={i} className="flex items-baseline justify-between gap-4 py-4">
                  <h3 className="text-lg" style={{ fontFamily: "var(--font-head)" }}>
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
