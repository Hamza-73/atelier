"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { imageById } from "@/data/images";
import { cn } from "@/lib/utils";

export function spacingClasses(spacing) {
  switch (spacing) {
    case "S":
      return "py-10 @3xl:py-14";
    case "L":
      return "py-20 @3xl:py-32";
    default:
      return "py-14 @3xl:py-22";
  }
}

export function alignClasses(align) {
  if (align === "center") return "text-center items-center";
  return "text-left items-start";
}

const FOCAL_POSITION = {
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
  center: "50% 50%",
};

export function SiteImage({ imageId, focal = "center", className, alt }) {
  const [broken, setBroken] = useState(false);
  const image = imageById(imageId);

  if (broken) {
    return (
      <div
        className={cn(
          "flex min-h-28 w-full flex-col items-center justify-center gap-2 bg-[var(--border)] text-[var(--muted)]",
          className
        )}
      >
        <ImageOff className="h-5 w-5 opacity-60" aria-hidden="true" />
        <span className="text-[11px] uppercase tracking-wider opacity-70">{image.label}</span>
      </div>
    );
  }

  return (
    <img
      src={image.url}
      alt={alt || image.label}
      onError={() => setBroken(true)}
      className={cn("h-full w-full object-cover", className)}
      style={{ objectPosition: FOCAL_POSITION[focal] || FOCAL_POSITION.center }}
      loading="lazy"
    />
  );
}

export function Eyebrow({ children, className }) {
  return (
    <p className={cn("text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]", className)}>
      {children}
    </p>
  );
}

export function SiteButton({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-fit items-center gap-2 border border-[var(--text)] px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--text)] transition-colors hover:bg-[var(--text)] hover:text-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
