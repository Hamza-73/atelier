"use client";

import { SiteImage, SiteButton, Eyebrow, spacingClasses, alignClasses } from "../shared";
import { cn } from "@/lib/utils";

export default function Hero({ section }) {
  const { variant, props, align } = section;
  const align1 = alignClasses(align);

  if (variant === "full-bleed") {
    return (
      <section className="relative">
        <div className="relative h-[68vh] min-h-[420px] w-full @3xl:h-[82vh]">
          <SiteImage imageId={props.imageId} focal={props.focal} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className={cn("absolute inset-x-0 bottom-0 flex flex-col gap-4 px-6 pb-10 @3xl:px-16 @3xl:pb-16", align1)}>
            <Eyebrow className="text-white/80">Atelier</Eyebrow>
            <h1
              className="max-w-2xl text-4xl leading-[1.05] text-white @3xl:text-6xl"
              style={{ fontFamily: "var(--font-head)" }}
            >
              {props.heading}
            </h1>
            <p className="max-w-lg text-base text-white/85 @3xl:text-lg">{props.subtext}</p>
            {props.buttonLabel && (
              <SiteButton className="mt-2 border-white text-white hover:bg-white hover:text-black">
                {props.buttonLabel}
              </SiteButton>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split-image") {
    return (
      <section className={spacingClasses(section.spacing)}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 @3xl:grid-cols-2 @3xl:gap-16 @3xl:px-10">
          <div className={cn("flex flex-col gap-5", align1)}>
            <Eyebrow>Atelier</Eyebrow>
            <h1 className="text-4xl leading-[1.05] @3xl:text-5xl" style={{ fontFamily: "var(--font-head)" }}>
              {props.heading}
            </h1>
            <p className="max-w-md text-base text-[var(--muted)] @3xl:text-lg">{props.subtext}</p>
            {props.buttonLabel && <SiteButton>{props.buttonLabel}</SiteButton>}
          </div>
          <SiteImage imageId={props.imageId} focal={props.focal} className="aspect-[4/5] w-full" />
        </div>
      </section>
    );
  }

  return (
    <section className={spacingClasses(section.spacing)}>
      <div className={cn("mx-auto flex max-w-4xl flex-col gap-5 px-6 @3xl:px-10", align1)}>
        <Eyebrow>Atelier</Eyebrow>
        <h1 className="text-4xl leading-[1.05] @3xl:text-6xl" style={{ fontFamily: "var(--font-head)" }}>
          {props.heading}
        </h1>
        <p className="max-w-xl text-base text-[var(--muted)] @3xl:text-lg">{props.subtext}</p>
        {props.buttonLabel && <SiteButton>{props.buttonLabel}</SiteButton>}
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 @3xl:px-10">
        <SiteImage imageId={props.imageId} focal={props.focal} className="aspect-[16/9] w-full" />
      </div>
    </section>
  );
}
