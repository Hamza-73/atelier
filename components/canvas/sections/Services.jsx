"use client";

import { spacingClasses } from "../shared";

export default function Services({ section }) {
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

        {variant === "columns" && (
          <div className="grid grid-cols-1 gap-8 @md:grid-cols-2 @3xl:grid-cols-3 @3xl:gap-10">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-3 border-t border-[var(--border)] pt-5">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl" style={{ fontFamily: "var(--font-head)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {variant === "list" && (
          <div className="flex flex-col divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col gap-2 py-6 @3xl:flex-row @3xl:items-baseline @3xl:gap-10">
                <h3 className="w-full shrink-0 text-xl @3xl:w-64" style={{ fontFamily: "var(--font-head)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {variant === "numbered" && (
          <div className="grid grid-cols-1 gap-10 @3xl:grid-cols-2">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <span className="text-4xl text-[var(--border)]" style={{ fontFamily: "var(--font-head)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl" style={{ fontFamily: "var(--font-head)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
