// Canvas-scoped theme tokens. Section components read only these CSS variables.
export const PALETTES = [
  {
    id: "ivory-olive",
    name: "Ivory & Olive",
    bg: "#F4F0E7",
    surface: "#FBFAF6",
    text: "#22231F",
    muted: "#777D50",
    accent: "#B55E42",
    border: "#D9D5CC",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    bg: "#FFFFFF",
    surface: "#F6F6F4",
    text: "#17181A",
    muted: "#6B6B66",
    accent: "#17181A",
    border: "#DCDCD8",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    bg: "#FBF4EE",
    surface: "#FFFFFF",
    text: "#2A1D17",
    muted: "#9B7A6A",
    accent: "#B55E42",
    border: "#E8D9CC",
  },
  {
    id: "forest",
    name: "Forest",
    bg: "#F1F2EB",
    surface: "#F8F9F4",
    text: "#1E2318",
    muted: "#5C6650",
    accent: "#4B5A3A",
    border: "#D4D9C8",
  },
  {
    id: "warm-minimal",
    name: "Warm Minimal",
    bg: "#FAF9F7",
    surface: "#FFFFFF",
    text: "#262521",
    muted: "#8A867D",
    accent: "#C98A4B",
    border: "#E5E2DB",
  },
];

export const FONT_PAIRINGS = [
  {
    id: "editorial-serif",
    name: "Editorial Serif + Modern Sans",
    head: "var(--font-cormorant)",
    body: "var(--font-inter)",
  },
  {
    id: "contemporary-sans",
    name: "Contemporary Sans",
    head: "var(--font-dm-sans)",
    body: "var(--font-inter)",
  },
  {
    id: "refined-classic",
    name: "Refined Classic",
    head: "var(--font-playfair)",
    body: "var(--font-dm-sans)",
  },
  {
    id: "minimal-architectural",
    name: "Minimal Architectural",
    head: "var(--font-inter)",
    body: "var(--font-inter)",
  },
];

export function paletteById(id) {
  return PALETTES.find((p) => p.id === id) || PALETTES[0];
}

export function fontPairingById(id) {
  return FONT_PAIRINGS.find((f) => f.id === id) || FONT_PAIRINGS[0];
}

// Builds the inline CSS custom properties consumed by the canvas root.
export function themeToCssVars(paletteId, fontId, overrides = {}) {
  const palette = paletteById(paletteId);
  const fonts = fontPairingById(fontId);
  return {
    "--bg": overrides.bg || palette.bg,
    "--surface": palette.surface,
    "--text": overrides.text || palette.text,
    "--muted": palette.muted,
    "--accent": overrides.accent || palette.accent,
    "--border": palette.border,
    "--font-head": fonts.head,
    "--font-body": fonts.body,
  };
}
