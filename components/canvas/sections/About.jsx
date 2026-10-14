"use client";

import { SiteImage, Eyebrow, spacingClasses, alignClasses } from "../shared";
import { cn } from "@/lib/utils";

export default function About({ section }) {
  const { variant, props, align } = section;

  if (variant === "text-only") {
    return (
      <section className={spacingClasses(section.spacing)}>
        <div className={cn("mx-auto flex max-w-3xl flex-col gap-5 px-6 @3xl:px-10", alignClasses(align))}>
          <Eyebrow>About</Eyebrow>
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
          <p className="text-base text-[var(--muted)] @3xl:text-lg">{props.body}</p>
        </div>
      </section>
    );
  }

  const imageFirst = variant === "image-left";

  return (
    <section className={spacingClasses(section.spacing)}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 @3xl:grid-cols-2 @3xl:gap-16 @3xl:px-10">
        <div className={cn("flex flex-col gap-5", imageFirst && "@3xl:order-2")}>
          <Eyebrow>About</Eyebrow>
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
          <p className="text-base text-[var(--muted)] @3xl:text-lg">{props.body}</p>
        </div>
        <SiteImage
          imageId={props.imageId}
          focal={props.focal}
          className={cn("aspect-[4/3] w-full", imageFirst && "@3xl:order-1")}
        />
      </div>
    </section>
  );
}
