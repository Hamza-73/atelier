"use client";

import { SiteImage, spacingClasses } from "../shared";
import { cn } from "@/lib/utils";

export default function Gallery({ section }) {
  const { variant, props } = section;
  const images = props.images || [];

  return (
    <section className={spacingClasses(section.spacing)}>
      <div className="mx-auto max-w-6xl px-6 @3xl:px-10">
        <div className="mb-8 flex items-end justify-between gap-4 @3xl:mb-12">
          <h2 className="text-3xl @3xl:text-4xl" style={{ fontFamily: "var(--font-head)" }}>
            {props.heading}
          </h2>
          <div className="hidden h-px flex-1 bg-[var(--border)] @3xl:block" />
        </div>

        {variant === "grid" && (
          <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
            {images.map((img, i) => (
              <SiteImage key={i} imageId={img.imageId} focal={img.focal} className="aspect-[4/5] w-full" />
            ))}
          </div>
        )}

        {variant === "masonry" && (
          <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
            {images.map((img, i) => (
              <SiteImage
                key={i}
                imageId={img.imageId}
                focal={img.focal}
                className={cn(
                  "w-full",
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
                  i % 2 === 1 && "@md:mt-8"
                )}
              />
            ))}
          </div>
        )}

        {variant === "filmstrip" && (
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 @3xl:-mx-10 @3xl:px-10">
            {images.map((img, i) => (
              <SiteImage
                key={i}
                imageId={img.imageId}
                focal={img.focal}
                className="aspect-[4/5] w-56 shrink-0 @3xl:w-72"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
