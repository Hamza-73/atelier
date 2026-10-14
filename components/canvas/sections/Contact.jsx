"use client";

import { Eyebrow, SiteButton, spacingClasses } from "../shared";
import { cn } from "@/lib/utils";

export default function Contact({ section }) {
  const { variant, props } = section;

  if (variant === "centered") {
    return (
      <section className={cn(spacingClasses(section.spacing), "border-t border-[var(--border)]")}>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center @3xl:px-10">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
          <p className="max-w-md text-base text-[var(--muted)]">{props.subtext}</p>
          <SiteButton>{props.buttonLabel}</SiteButton>
          <p className="text-sm text-[var(--muted)]">{props.email}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(spacingClasses(section.spacing), "border-t border-[var(--border)]")}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 @3xl:grid-cols-2 @3xl:gap-16 @3xl:px-10">
        <div className="flex flex-col gap-4">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
          <p className="max-w-md text-base text-[var(--muted)]">{props.subtext}</p>
        </div>
        <div className="flex flex-col items-start gap-4 @3xl:items-end @3xl:text-right">
          <SiteButton>{props.buttonLabel}</SiteButton>
          <p className="text-sm text-[var(--muted)]">{props.email}</p>
        </div>
      </div>
    </section>
  );
}
