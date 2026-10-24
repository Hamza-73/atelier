import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { templateById, TEMPLATES } from "@/data/templates";
import { cloneDesignFromTemplate } from "@/lib/clone-design";
import EditorShell from "@/components/editor/EditorShell";

async function NewEditorGate({ searchParams }) {
  const sp = await searchParams;
  const { userId } = await auth();
  if (!userId) {
    const redirectTo = `/editor/new${sp.template ? `?template=${sp.template}` : ""}`;
    redirect(`/sign-in?redirect_url=${encodeURIComponent(redirectTo)}`);
  }

  // templateById falls back to the first template for an unknown id, so
  // this never 404s on a stale or malformed ?template= value.
  const template = templateById(sp.template || TEMPLATES[0].id);
  const design = cloneDesignFromTemplate(template);
  return <EditorShell initialDesign={design} />;
}

// A fresh, unsaved draft from a starter template. Requires sign-in — see
// NewEditorGate. Wrapped in Suspense because reading auth()/searchParams
// is dynamic, required under cacheComponents.
export default function NewEditorPage({ searchParams }) {
  return (
    <Suspense>
      <NewEditorGate searchParams={searchParams} />
    </Suspense>
  );
}
