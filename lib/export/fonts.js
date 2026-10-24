// In the editor, fonts come from next/font — each a CSS variable
// (--font-cormorant, etc.) injected by Next's build. A standalone export
// has no Next build, so this maps the same four fonts to real
// Google Fonts <link> tags and literal font-family stacks.

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display&family=Inter&family=DM+Sans&display=swap";

const FONT_FAMILIES = {
  "--font-cormorant": '"Cormorant Garamond", serif',
  "--font-playfair": '"Playfair Display", serif',
  "--font-inter": '"Inter", sans-serif',
  "--font-dm-sans": '"DM Sans", sans-serif',
};

// Resolves a themes.js font pairing's "var(--font-x)" head/body values to
// literal font-family strings for export.
export function resolveFontFamily(cssVarExpr) {
  const match = cssVarExpr.match(/var\((--[\w-]+)\)/);
  const name = match ? FONT_FAMILIES[match[1]] : null;
  return name || "sans-serif";
}

export function googleFontsLinkHref() {
  return GOOGLE_FONTS_HREF;
}
