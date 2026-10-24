"use client";

import { ArrowLeft, PanelLeft, SlidersHorizontal, Save, Download, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useEditor } from "@/lib/store";
import { saveDesign } from "@/lib/actions/designs";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Toolbar() {
  const { state, dispatch } = useEditor();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [justSaved, setJustSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSave() {
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    const { savedId, name, templateId, colorOverrides, paletteId, fontId, sections } = state.design;
    setSaving(true);
    setError(null);
    try {
      const result = await saveDesign({
        savedId: savedId || null,
        name: name || "Untitled Project",
        templateId,
        data: { paletteId, fontId, colorOverrides, sections },
      });
      dispatch({ type: "SAVE_DESIGN_RESULT", result });
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1600);
    } catch (e) {
      setError(e.message || "Couldn't save");
      setTimeout(() => setError(null), 2400);
    } finally {
      setSaving(false);
    }
  }

  return (
    <header className="flex items-center justify-between gap-3 border-b border-warmgrey bg-paper px-4 py-3 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_SCREEN", screen: "gallery" })}
          aria-label="Back to gallery"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="h-5 w-px bg-warmgrey" />
        <input
          value={state.design?.name || ""}
          onChange={(e) => dispatch({ type: "RENAME", name: e.target.value })}
          aria-label="Project name"
          className="min-w-0 flex-1 truncate bg-transparent font-serif text-lg text-ink outline-none focus-visible:ring-0"
        />
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          aria-label="Open layers panel"
          onClick={() => dispatch({ type: "SET_DRAWER", drawer: state.drawer === "layers" ? null : "layers" })}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Open properties panel"
          onClick={() => dispatch({ type: "SET_DRAWER", drawer: state.drawer === "properties" ? null : "properties" })}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        <DarkModeToggle className="hidden sm:flex" />

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          aria-label={error ? error : justSaved ? "Saved" : "Save"}
          className="ml-1 flex h-8 items-center gap-1.5 rounded-sm border border-warmgrey px-2.5 text-[11px] uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta disabled:opacity-60 sm:px-3"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : justSaved ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">
            {error ? error : saving ? "Saving" : justSaved ? "Saved" : "Save"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "SET_DIALOG", dialog: "publish" })}
          aria-label="Export"
          className="flex h-8 items-center gap-1.5 rounded-sm bg-ink px-2.5 text-[11px] uppercase tracking-[0.15em] text-paper transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 sm:px-3"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  );
}
