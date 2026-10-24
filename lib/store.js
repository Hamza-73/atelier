"use client";

import { createContext, useContext, useReducer } from "react";
import { templateById, defaultSectionProps, defaultVariant, FIXED_SECTION_TYPES } from "@/data/templates";

function cloneDesignFromTemplate(template) {
  const design = JSON.parse(JSON.stringify(template));
  design.templateId = template.id;
  design.colorOverrides = {};
  design.savedId = null;
  delete design.category;
  delete design.description;
  delete design.cover;
  return design;
}

const initialState = {
  screen: "gallery",
  templateId: null,
  design: null,
  selectedId: null,
  device: "desktop",
  dialog: null,
  drawer: null,
  savedDesigns: [],
};

function moveIndex(arr, from, to) {
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_TEMPLATE": {
      const template = templateById(action.id);
      return {
        ...state,
        screen: "editor",
        templateId: template.id,
        design: cloneDesignFromTemplate(template),
        selectedId: null,
        device: "desktop",
        dialog: null,
      };
    }

    // Loads a design fetched from the server (lib/actions/designs.js#getDesign)
    // straight into the editor.
    case "LOAD_SERVER_DESIGN": {
      const { savedId, name, templateId, updatedAt, ...data } = action.design;
      return {
        ...state,
        screen: "editor",
        templateId,
        design: { templateId, name, savedId, updatedAt, ...data },
        selectedId: null,
        device: "desktop",
        dialog: null,
      };
    }

    // Replaces the saved-designs list with what the server returned
    // (lib/actions/designs.js#listDesigns).
    case "HYDRATE_SAVED_DESIGNS":
      return { ...state, savedDesigns: action.designs };

    // Reflects a server rename (lib/actions/designs.js#renameDesign) in the
    // list, and in the open design if it's the one being renamed.
    case "RENAME_SAVED_DESIGN": {
      const savedDesigns = state.savedDesigns.map((d) =>
        d.savedId === action.savedId ? { ...d, name: action.name } : d
      );
      const design =
        state.design?.savedId === action.savedId ? { ...state.design, name: action.name } : state.design;
      return { ...state, savedDesigns, design };
    }

    // Reflects a publish/unpublish (lib/actions/designs.js#publishDesign /
    // #unpublishDesign) in the open design and its list entry.
    case "SET_PUBLISH_STATE": {
      const { savedId, isPublished, publicSlug } = action;
      const savedDesigns = state.savedDesigns.map((d) =>
        d.savedId === savedId ? { ...d, isPublished, publicSlug: publicSlug ?? d.publicSlug } : d
      );
      const design =
        state.design?.savedId === savedId
          ? { ...state.design, isPublished, publicSlug: publicSlug ?? state.design.publicSlug }
          : state.design;
      return { ...state, savedDesigns, design };
    }

    // Adds the server's duplicate (lib/actions/designs.js#duplicateDesign)
    // to the top of the list.
    case "ADD_SAVED_DESIGN": {
      const savedDesigns = [action.entry, ...state.savedDesigns];
      return { ...state, savedDesigns };
    }

    // Drops a design removed on the server (lib/actions/designs.js#deleteDesign).
    // If it was the one currently open, clear its savedId so a later Save
    // creates a fresh row instead of failing to find the deleted one.
    case "REMOVE_SAVED_DESIGN": {
      const savedDesigns = state.savedDesigns.filter((d) => d.savedId !== action.savedId);
      const design =
        state.design?.savedId === action.savedId ? { ...state.design, savedId: null } : state.design;
      return { ...state, savedDesigns, design };
    }

    // Records the id/updatedAt a server save returned, so later saves of
    // the same design update it instead of creating a new row.
    case "SAVE_DESIGN_RESULT": {
      if (!state.design) return state;
      const { savedId, updatedAt } = action.result;
      const name = state.design.name || templateById(state.design.templateId).name;
      const entry = { savedId, name, updatedAt, templateId: state.design.templateId };
      const exists = state.savedDesigns.some((d) => d.savedId === savedId);
      const savedDesigns = exists
        ? state.savedDesigns.map((d) => (d.savedId === savedId ? entry : d))
        : [entry, ...state.savedDesigns];
      return { ...state, savedDesigns, design: { ...state.design, savedId, name, updatedAt } };
    }

    case "OPEN_SAVED": {
      const saved = state.savedDesigns.find((d) => d.savedId === action.id);
      if (!saved) return state;
      return {
        ...state,
        screen: "editor",
        templateId: saved.design.templateId,
        design: JSON.parse(JSON.stringify(saved.design)),
        selectedId: null,
        device: "desktop",
        dialog: null,
      };
    }

    case "SET_SCREEN":
      return { ...state, screen: action.screen, dialog: null, drawer: null };

    case "SET_DIALOG":
      return { ...state, dialog: action.dialog };

    case "SET_DRAWER":
      return { ...state, drawer: action.drawer };

    case "SELECT":
      return { ...state, selectedId: action.id };

    case "SET_DEVICE":
      return { ...state, device: action.device };

    case "RENAME":
      return { ...state, design: { ...state.design, name: action.name } };

    case "SAVE_DESIGN": {
      if (!state.design) return state;
      const now = Date.now();
      const savedId = state.design.savedId || `saved-${now}`;
      const name = state.design.name || templateById(state.design.templateId).name;
      const entry = { savedId, name, updatedAt: now, design: { ...state.design, savedId, name } };
      const exists = state.savedDesigns.some((d) => d.savedId === savedId);
      const savedDesigns = exists
        ? state.savedDesigns.map((d) => (d.savedId === savedId ? entry : d))
        : [entry, ...state.savedDesigns];
      return { ...state, savedDesigns, design: { ...state.design, savedId, name } };
    }

    case "SET_PALETTE":
      return { ...state, design: { ...state.design, paletteId: action.paletteId } };

    case "SET_FONT":
      return { ...state, design: { ...state.design, fontId: action.fontId } };

    case "SET_COLOR_OVERRIDE": {
      const overrides = { ...state.design.colorOverrides };
      if (action.value) overrides[action.key] = action.value;
      else delete overrides[action.key];
      return { ...state, design: { ...state.design, colorOverrides: overrides } };
    }

    case "ADD_SECTION": {
      const section = {
        id: `${action.sectionType}-${Date.now()}`,
        type: action.sectionType,
        visible: true,
        variant: defaultVariant(action.sectionType),
        spacing: "M",
        props: defaultSectionProps(action.sectionType),
      };
      if (action.sectionType === "hero" || action.sectionType === "about") {
        section.align = "left";
      }
      const sections = state.design.sections.slice();
      const footerIndex = sections.findIndex((s) => s.type === "footer");
      const insertAt = footerIndex === -1 ? sections.length : footerIndex;
      sections.splice(insertAt, 0, section);
      return { ...state, design: { ...state.design, sections }, selectedId: section.id, dialog: null };
    }

    case "DELETE_SECTION": {
      const target = state.design.sections.find((s) => s.id === action.id);
      if (!target || FIXED_SECTION_TYPES.includes(target.type)) return state;
      const sections = state.design.sections.filter((s) => s.id !== action.id);
      return {
        ...state,
        design: { ...state.design, sections },
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      };
    }

    case "TOGGLE_VISIBLE": {
      const sections = state.design.sections.map((s) =>
        s.id === action.id ? { ...s, visible: !s.visible } : s
      );
      return { ...state, design: { ...state.design, sections } };
    }

    case "MOVE_SECTION": {
      const sections = state.design.sections;
      const index = sections.findIndex((s) => s.id === action.id);
      if (index === -1) return state;
      const target = action.direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= sections.length) return state;
      if (FIXED_SECTION_TYPES.includes(sections[index].type)) return state;
      if (FIXED_SECTION_TYPES.includes(sections[target].type)) return state;
      return { ...state, design: { ...state.design, sections: moveIndex(sections, index, target) } };
    }

    case "SET_VARIANT": {
      const sections = state.design.sections.map((s) =>
        s.id === action.id ? { ...s, variant: action.variant } : s
      );
      return { ...state, design: { ...state.design, sections } };
    }

    case "SET_SPACING": {
      const sections = state.design.sections.map((s) =>
        s.id === action.id ? { ...s, spacing: action.spacing } : s
      );
      return { ...state, design: { ...state.design, sections } };
    }

    case "SET_ALIGN": {
      const sections = state.design.sections.map((s) =>
        s.id === action.id ? { ...s, align: action.align } : s
      );
      return { ...state, design: { ...state.design, sections } };
    }

    case "UPDATE_PROPS": {
      const sections = state.design.sections.map((s) =>
        s.id === action.id ? { ...s, props: { ...s.props, ...action.patch } } : s
      );
      return { ...state, design: { ...state.design, sections } };
    }

    case "SET_IMAGE": {
      const sections = state.design.sections.map((s) => {
        if (s.id !== action.id) return s;
        if (typeof action.index === "number") {
          const images = s.props.images.slice();
          images[action.index] = { imageId: action.imageId, focal: action.focal || images[action.index].focal };
          return { ...s, props: { ...s.props, images } };
        }
        if (typeof action.itemIndex === "number") {
          const items = s.props.items.slice();
          items[action.itemIndex] = { ...items[action.itemIndex], imageId: action.imageId, focal: action.focal || items[action.itemIndex].focal };
          return { ...s, props: { ...s.props, items } };
        }
        return { ...s, props: { ...s.props, imageId: action.imageId, focal: action.focal || s.props.focal } };
      });
      return { ...state, design: { ...state.design, sections } };
    }

    default:
      return state;
  }
}

const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
