import { resolveFontFamily, googleFontsLinkHref } from "./fonts";

const NAV_TOGGLE_SCRIPT = `
// Toggles the mobile nav menu exported from components/canvas/sections/Nav.jsx.
// Mirrors its useState open/close  the only interactive bit on the page.
document.querySelectorAll("[data-nav-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var menu = document.getElementById(btn.getAttribute("data-nav-toggle"));
    if (!menu) return;
    var opening = menu.classList.contains("hidden");
    menu.classList.toggle("hidden", !opening);
    menu.classList.toggle("flex", opening);
    btn.setAttribute("aria-expanded", opening ? "true" : "false");
    var menuIcon = btn.querySelector('[data-icon="menu"]');
    var closeIcon = btn.querySelector('[data-icon="close"]');
    if (menuIcon) menuIcon.classList.toggle("hidden", opening);
    if (closeIcon) closeIcon.classList.toggle("hidden", !opening);
  });
});
`.trim();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Replaces the var(--font-x) references next/font injects (captured
// verbatim in the client-rendered markup) with literal font-family
// strings, since the exported site has no Next build to supply them.
function resolveFontVars(html) {
  return html.replace(/var\((--font-(?:cormorant|playfair|inter|dm-sans))\)/g, (whole, varName) =>
    resolveFontFamily(`var(${varName})`)
  );
}

// Builds the full standalone index.html from the design's already-rendered
// markup (captured from the live DOM  see components/publish/ExportDialog.jsx)
// plus site metadata. No server-side React rendering happens here.
export function buildExportHtml({ name, bodyHtml, description }) {
  const title = escapeHtml(name || "Untitled Project");
  const desc = escapeHtml(description || `${name || "A site"}, built with Atelier.`);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="${googleFontsLinkHref()}" />
<link rel="stylesheet" href="assets/site.css" />
</head>
<body>
${resolveFontVars(bodyHtml)}
<script src="assets/site.js"></script>
</body>
</html>
`;
}

export function exportSiteJs() {
  return NAV_TOGGLE_SCRIPT;
}

export function exportReadme(name) {
  return `${name || "Your site"}  exported from Atelier
========================================

This is a static site: index.html, assets/site.css, assets/site.js.
No build step, no server required.

Deploy it anywhere that serves static files:

  Netlify Drop    https://app.netlify.com/drop
                   Drag this folder onto the page.

  Vercel          npx vercel --prod
                   Run from inside this folder (needs a free Vercel account).

  GitHub Pages    Push this folder's contents to a repo, then enable
                   Pages in the repo's Settings > Pages, source: main branch.

Images are linked to Unsplash, not bundled  keep an internet connection
when viewing the exported site, or swap in your own image URLs in
index.html.
`;
}
