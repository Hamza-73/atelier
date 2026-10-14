"use client";

import { Eyebrow, spacingClasses } from "../shared";

export default function Testimonials({ section }) {
  const { variant, props } = section;
  const items = props.items || [];

  return (
    <section className={spacingClasses(section.spacing)}>
      <div className="mx-auto max-w-5xl px-6 @3xl:px-10">
        <Eyebrow className="mb-6">{props.heading}</Eyebrow>

        {variant === "single-quote" && items[0] && (
          <figure className="flex flex-col gap-6">
            <blockquote
              className="max-w-3xl text-2xl leading-snug @3xl:text-4xl"
              style={{ fontFamily: "var(--font-head)" }}
            >
              “{items[0].quote}”
            </blockquote>
            <figcaption className="text-sm text-[var(--muted)]">
              <span className="text-[var(--text)]">{items[0].author}</span> · {items[0].role}
            </figcaption>
          </figure>
        )}

        {variant === "grid" && (
          <div className="grid grid-cols-1 gap-8 @3xl:grid-cols-2 @3xl:gap-12">
            {items.map((item, i) => (
              <figure key={i} className="flex flex-col gap-4 border-t border-[var(--border)] pt-5">
                <blockquote className="text-lg leading-snug @3xl:text-xl" style={{ fontFamily: "var(--font-head)" }}>
                  “{item.quote}”
                </blockquote>
                <figcaption className="text-sm text-[var(--muted)]">
                  <span className="text-[var(--text)]">{item.author}</span> · {item.role}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
