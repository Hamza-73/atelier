"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { gsap } from "@/lib/gsap";
import DarkModeToggle from "@/components/DarkModeToggle";
import { cn } from "@/lib/utils";

function NavLink({ active, onClick, children, className, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...rest}
      className={cn(
        "relative text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
        active ? "text-ink" : "text-ink/50 hover:text-ink",
        className
      )}
    >
      {children}
      {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-terracotta" />}
    </button>
  );
}

// Shared header for the homepage and /saved. Not tied to the editor's
// store — each editor route mounts its own, scoped instance of that
// instead (see lib/store.js), so this stays usable outside it.
export default function HomeNav({ ready, onNewProject }) {
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-nav-item]", {
        y: -14,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, [ready]);

  function goToWork() {
    if (pathname === "/") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#work");
    }
  }

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <button
          type="button"
          data-nav-item
          onClick={() => router.push("/")}
          className="shrink-0 text-lg tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          style={{ fontFamily: "var(--font-playfair, var(--font-serif))" }}
        >
          ATELIER
        </button>

        <nav className="flex items-center gap-5 sm:gap-7">
          <NavLink data-nav-item active={pathname === "/"} onClick={goToWork} className="hidden sm:inline-block">
            Selected Work
          </NavLink>
          <NavLink data-nav-item active={pathname === "/saved"} onClick={() => router.push("/saved")}>
            Saved
          </NavLink>
          <button
            type="button"
            data-nav-item
            onClick={onNewProject}
            className="group flex items-center gap-1.5 border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          >
            New Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <span data-nav-item>
            <DarkModeToggle />
          </span>
          <span data-nav-item className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-[11px] uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="border border-ink px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
                >
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton afterSignOutUrl="/" />
            </Show>
          </span>
        </nav>
      </div>
    </header>
  );
}
