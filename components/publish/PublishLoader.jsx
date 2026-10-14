"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Compass, Check } from "lucide-react";

const SIZE = 84;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PublishLoader({ step, totalSteps, complete }) {
  const circleRef = useRef(null);
  const iconRef = useRef(null);
  const checkRef = useRef(null);
  const rotateTween = useRef(null);

  useEffect(() => {
    rotateTween.current = gsap.to(iconRef.current, {
      rotate: 360,
      duration: 3.2,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    return () => {
      rotateTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    const progress = totalSteps > 1 ? step / (totalSteps - 1) : 0;
    gsap.to(circleRef.current, {
      strokeDashoffset: CIRCUMFERENCE * (1 - progress),
      duration: 0.6,
      ease: "power2.out",
    });
  }, [step, totalSteps]);

  useEffect(() => {
    if (!complete) return;
    rotateTween.current?.kill();
    gsap.to(iconRef.current, { opacity: 0, scale: 0.6, duration: 0.25, ease: "power1.in" });
    gsap.fromTo(
      checkRef.current,
      { opacity: 0, scale: 0.3, rotate: -24 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(2.4)", delay: 0.15 }
    );
  }, [complete]);

  return (
    <div className="relative mx-auto flex h-[84px] w-[84px] items-center justify-center">
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          style={{ stroke: "var(--color-warmgrey)" }}
        />
        <circle
          ref={circleRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          style={{ stroke: "var(--color-terracotta)" }}
        />
      </svg>
      <div ref={iconRef} className="absolute inset-0 flex items-center justify-center text-ink/70">
        <Compass className="h-7 w-7" />
      </div>
      <div ref={checkRef} className="absolute inset-0 flex items-center justify-center text-olive opacity-0">
        <Check className="h-8 w-8" />
      </div>
    </div>
  );
}
