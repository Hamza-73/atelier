import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { listDesigns } from "@/lib/actions/designs";
import SavedPageClient from "@/components/saved/SavedPageClient";

async function SavedDesignsGate() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=%2Fsaved");

  const initialDesigns = await listDesigns();
  return <SavedPageClient initialDesigns={initialDesigns} />;
}

// Requires sign-in — wrapped in Suspense because reading auth() and
// hitting the database is dynamic, required under cacheComponents.
export default function SavedPage() {
  return (
    <Suspense>
      <SavedDesignsGate />
    </Suspense>
  );
}
