"use client";

import { motion } from "motion/react";
import { useEditor } from "@/lib/store";
import Toolbar from "./Toolbar";
import DeviceToolbar, { DEVICE_WIDTHS } from "./DeviceToolbar";
import LayersPanel from "./LayersPanel";
import PropertiesPanel from "./PropertiesPanel";
import Drawer from "./Drawer";
import Site from "@/components/canvas/Site";

const canvasVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function sideVariants(fromX, delay) {
  return {
    hidden: { opacity: 0, x: fromX },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] } },
  };
}

export default function Editor() {
  const { state, dispatch } = useEditor();
  const design = state.design;
  if (!design) return null;

  return (
    <div className="flex h-dvh min-h-0 w-full flex-col overflow-x-clip bg-paper">
      <Toolbar />
      <div className="flex min-h-0 flex-1">
        <motion.aside
          variants={sideVariants(-16, 0.18)}
          initial="hidden"
          animate="show"
          className="hidden w-72 shrink-0 border-r border-warmgrey bg-paper lg:block"
        >
          <LayersPanel />
        </motion.aside>

        <motion.div
          variants={canvasVariants}
          initial="hidden"
          animate="show"
          className="flex min-h-0 min-w-0 flex-1 flex-col"
        >
          <DeviceToolbar />
          <div
            className="min-w-0 flex-1 overflow-auto bg-surround px-4 py-8 sm:px-8"
            onClick={() => dispatch({ type: "SELECT", id: null })}
          >
            <div className="mx-auto flex w-fit max-w-full justify-center">
              <motion.div
                animate={{ width: DEVICE_WIDTHS[state.device] }}
                transition={{ type: "spring", stiffness: 280, damping: 32 }}
                className="min-w-0 max-w-full overflow-hidden bg-paper shadow-[0_24px_60px_-20px_rgba(34,35,31,0.3)]"
              >
                <Site
                  design={design}
                  editable
                  selectedId={state.selectedId}
                  onSelect={(id) => dispatch({ type: "SELECT", id })}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.aside
          variants={sideVariants(16, 0.3)}
          initial="hidden"
          animate="show"
          className="hidden w-80 shrink-0 border-l border-warmgrey bg-paper lg:block"
        >
          <PropertiesPanel />
        </motion.aside>
      </div>

      <Drawer
        open={state.drawer === "layers"}
        onClose={() => dispatch({ type: "SET_DRAWER", drawer: null })}
        side="left"
        title="Layers"
      >
        <LayersPanel />
      </Drawer>
      <Drawer
        open={state.drawer === "properties"}
        onClose={() => dispatch({ type: "SET_DRAWER", drawer: null })}
        side="right"
        title="Properties"
      >
        <PropertiesPanel />
      </Drawer>
    </div>
  );
}
