"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { EditorProvider, useEditor } from "@/lib/store";
import Gallery from "@/components/gallery/Gallery";
import Editor from "@/components/editor/Editor";
import PreviewMode from "@/components/publish/PreviewMode";
import PublishDialog from "@/components/publish/PublishDialog";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
};

function ScreenSwitch() {
  const { state } = useEditor();

  return (
    <AnimatePresence mode="wait">
      {state.screen === "gallery" && (
        <motion.div key="gallery" {...fade}>
          <Gallery />
        </motion.div>
      )}
      {state.screen === "editor" && (
        <motion.div key="editor" {...fade} className="h-dvh">
          <Editor />
        </motion.div>
      )}
      {state.screen === "preview" && (
        <motion.div key="preview" {...fade}>
          <PreviewMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <EditorProvider>
        <ScreenSwitch />
        <PublishDialog />
      </EditorProvider>
    </MotionConfig>
  );
}
