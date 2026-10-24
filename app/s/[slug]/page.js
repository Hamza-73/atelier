import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPublishedDesign } from "@/lib/actions/designs";
import Site from "@/components/canvas/Site";

async function PublishedSite({ params }) {
  const { slug } = await params;
  const design = await getPublishedDesign(slug);
  if (!design) notFound();

  return <Site design={design} editable={false} />;
}

// Public, unauthenticated: anyone with the link can view a published
// design, rendered live from its current saved state (not a frozen
// snapshot — editing and re-saving updates this page too). Wrapped in
// Suspense because reading `params` and hitting the database is dynamic,
// required under this project's cacheComponents setting.
export default function PublishedSitePage({ params }) {
  return (
    <Suspense>
      <PublishedSite params={params} />
    </Suspense>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const design = await getPublishedDesign(slug);
  if (!design) return { title: "Not found" };
  return {
    title: design.name || "A site built with Atelier",
    description: `${design.name || "A site"}, built with Atelier.`,
  };
}
