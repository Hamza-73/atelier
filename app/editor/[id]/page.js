import { Suspense } from "react";
import { redirect, notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getDesign } from "@/lib/actions/designs";
import EditorShell from "@/components/editor/EditorShell";

async function ExistingEditorGate({ params }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent(`/editor/${id}`)}`);
  }

  let design;
  try {
    design = await getDesign(id);
  } catch {
    // Not found, or owned by someone else — either way, nothing to show.
    notFound();
  }

  return <EditorShell initialDesign={design} />;
}

// A previously-saved design, loaded by its id — this is what makes a
// refresh (or sharing the URL with yourself) land back on the same
// design instead of bouncing to the homepage. Requires sign-in and
// ownership. Wrapped in Suspense because reading auth()/params and
// hitting the database is dynamic, required under cacheComponents.
export default function ExistingEditorPage({ params }) {
  return (
    <Suspense>
      <ExistingEditorGate params={params} />
    </Suspense>
  );
}
