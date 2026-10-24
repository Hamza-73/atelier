"use client";

import { MotionConfig } from "motion/react";
import Gallery from "@/components/gallery/Gallery";

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <Gallery />
    </MotionConfig>
  );
}
