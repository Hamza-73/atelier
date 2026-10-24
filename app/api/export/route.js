import { readFile } from "node:fs/promises";
import path from "node:path";
import { strToU8, zipSync } from "fflate";
import { auth } from "@clerk/nextjs/server";
import { buildExportHtml, exportSiteJs, exportReadme } from "@/lib/export/render";

function slugify(name) {
  return (
    (name || "project")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "project"
  );
}

export async function POST(request) {
  // Exporting is gated to signed-in users (matches the rest of the app's
  // save/load actions), even though the HTML itself arrives from the
  // client rather than being re-rendered on the server.
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, bodyHtml } = body || {};
  if (typeof bodyHtml !== "string" || bodyHtml.length === 0) {
    return Response.json({ error: "Missing rendered HTML" }, { status: 400 });
  }
  // The captured markup is the editor's own render output, not user text
  // input, but cap its size defensively against a malformed client call.
  if (bodyHtml.length > 2_000_000) {
    return Response.json({ error: "Design is too large to export" }, { status: 413 });
  }

  const html = buildExportHtml({ name, bodyHtml });

  let siteCss;
  try {
    siteCss = await readFile(path.join(process.cwd(), "lib/export/site.css"), "utf8");
  } catch {
    return Response.json({ error: "Export stylesheet missing — run `npm run build:export-css`" }, { status: 500 });
  }

  const zipped = zipSync(
    {
      "index.html": strToU8(html),
      "assets/site.css": strToU8(siteCss),
      "assets/site.js": strToU8(exportSiteJs()),
      "README.txt": strToU8(exportReadme(name)),
    },
    { level: 6 }
  );

  const filename = `${slugify(name)}.zip`;
  return new Response(zipped, {
    headers: {
      "content-type": "application/zip",
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
