"use client";

import { EditorProvider, useEditor } from "@/lib/store";
import Editor from "./Editor";
import PreviewMode from "@/components/publish/PreviewMode";
import PublishDialog from "@/components/publish/PublishDialog";
import ShareDialog from "@/components/publish/ShareDialog";

function Inner() {
  const { state } = useEditor();
  return state.previewing ? <PreviewMode /> : <Editor />;
}

// Mounted by both app/editor/new/page.js and app/editor/[id]/page.js, each
// with the design for that route already resolved server-side (a fresh
// clone of a template, or a saved design fetched by id).
export default function EditorShell({ initialDesign }) {
  return (
    <EditorProvider initialDesign={initialDesign}>
      <Inner />
      <PublishDialog />
      <ShareDialog />
    </EditorProvider>
  );
}
