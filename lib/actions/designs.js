"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db";
import { designsTable } from "@/db/schema";
import { saveDesignInputSchema, migrateDesign, CURRENT_SCHEMA_VERSION } from "@/lib/validation/design";
import { withDbRetry } from "@/lib/db-retry";
import { slugify, randomSuffix } from "@/lib/validation/slug";

async function requireUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not signed in");
  return userId;
}

function toClientDesign(row) {
  const migrated = migrateDesign(row);
  return {
    savedId: migrated.id,
    name: migrated.name,
    templateId: migrated.templateId,
    updatedAt: migrated.updatedAt,
    isPublished: migrated.isPublished,
    publicSlug: migrated.publicSlug,
    ...migrated.data,
  };
}

export async function listDesigns() {
  const userId = await requireUserId();
  const rows = await withDbRetry(() =>
    db.select().from(designsTable).where(eq(designsTable.userId, userId)).orderBy(desc(designsTable.updatedAt))
  );

  return rows.map((row) => ({
    savedId: row.id,
    name: row.name,
    templateId: row.templateId,
    updatedAt: row.updatedAt,
    isPublished: row.isPublished,
    publicSlug: row.publicSlug,
  }));
}

export async function getDesign(savedId) {
  const userId = await requireUserId();
  const [row] = await withDbRetry(() =>
    db
      .select()
      .from(designsTable)
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .limit(1)
  );

  if (!row) throw new Error("Design not found");
  return toClientDesign(row);
}

// Creates a new design row, or updates an existing one the caller owns.
// Returns the saved row's id and updatedAt so the editor can keep its
// local "savedId" and detect concurrent edits from another tab.
export async function saveDesign(input) {
  const userId = await requireUserId();
  const parsed = saveDesignInputSchema.parse(input);

  if (parsed.savedId) {
    const [existing] = await withDbRetry(() =>
      db
        .select({ id: designsTable.id })
        .from(designsTable)
        .where(and(eq(designsTable.id, parsed.savedId), eq(designsTable.userId, userId)))
        .limit(1)
    );

    if (!existing) throw new Error("Design not found");

    const [updated] = await withDbRetry(() =>
      db
        .update(designsTable)
        .set({
          name: parsed.name,
          data: parsed.data,
          schemaVersion: CURRENT_SCHEMA_VERSION,
          updatedAt: new Date(),
        })
        .where(and(eq(designsTable.id, parsed.savedId), eq(designsTable.userId, userId)))
        .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt })
    );

    return updated;
  }

  const [created] = await withDbRetry(() =>
    db
      .insert(designsTable)
      .values({
        userId,
        name: parsed.name,
        templateId: parsed.templateId,
        data: parsed.data,
        schemaVersion: CURRENT_SCHEMA_VERSION,
      })
      .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt })
  );

  return created;
}

export async function renameDesign(savedId, name) {
  const userId = await requireUserId();
  const cleanName = String(name).trim().slice(0, 120) || "Untitled Project";

  const [updated] = await withDbRetry(() =>
    db
      .update(designsTable)
      .set({ name: cleanName, updatedAt: new Date() })
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .returning({ id: designsTable.id })
  );

  if (!updated) throw new Error("Design not found");
  return updated;
}

export async function duplicateDesign(savedId) {
  const userId = await requireUserId();
  const [row] = await withDbRetry(() =>
    db
      .select()
      .from(designsTable)
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .limit(1)
  );

  if (!row) throw new Error("Design not found");

  const [created] = await withDbRetry(() =>
    db
      .insert(designsTable)
      .values({
        userId,
        name: `${row.name} (Copy)`,
        templateId: row.templateId,
        data: row.data,
        schemaVersion: row.schemaVersion,
      })
      .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt })
  );

  return created;
}

// Makes a saved design viewable by anyone at /s/[publicSlug]. Keeps the
// existing slug if the design is already published (so re-publishing
// after an unpublish doesn't hand out a new link). The page always
// reflects the design's current saved state, not a frozen copy.
export async function publishDesign(savedId) {
  const userId = await requireUserId();
  const [row] = await withDbRetry(() =>
    db
      .select({ id: designsTable.id, name: designsTable.name, publicSlug: designsTable.publicSlug })
      .from(designsTable)
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .limit(1)
  );
  if (!row) throw new Error("Design not found");

  if (row.publicSlug) {
    await withDbRetry(() =>
      db
        .update(designsTable)
        .set({ isPublished: true, publishedAt: new Date() })
        .where(eq(designsTable.id, savedId))
    );
    return { publicSlug: row.publicSlug };
  }

  const base = slugify(row.name);
  for (let attempt = 0; attempt < 6; attempt++) {
    const publicSlug = attempt === 0 ? base : `${base}-${randomSuffix()}`;
    try {
      await withDbRetry(() =>
        db
          .update(designsTable)
          .set({ isPublished: true, publicSlug, publishedAt: new Date() })
          .where(eq(designsTable.id, savedId))
      );
      return { publicSlug };
    } catch (error) {
      // Unique-constraint violation on publicSlug: try another suffix.
      const isSlugConflict = String(error?.cause?.message || error?.message || "").includes("designs_public_slug_idx");
      if (!isSlugConflict || attempt === 5) throw error;
    }
  }
}

export async function unpublishDesign(savedId) {
  const userId = await requireUserId();
  const [updated] = await withDbRetry(() =>
    db
      .update(designsTable)
      .set({ isPublished: false })
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .returning({ id: designsTable.id })
  );
  if (!updated) throw new Error("Design not found");
  return { ok: true };
}

// Public lookup  no auth. Used by the /s/[slug] page anyone can view.
// Only returns designs currently marked published.
export async function getPublishedDesign(slug) {
  const [row] = await withDbRetry(() =>
    db
      .select()
      .from(designsTable)
      .where(and(eq(designsTable.publicSlug, slug), eq(designsTable.isPublished, true)))
      .limit(1)
  );
  if (!row) return null;
  return toClientDesign(row);
}

export async function deleteDesign(savedId) {
  const userId = await requireUserId();
  const deleted = await withDbRetry(() =>
    db
      .delete(designsTable)
      .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
      .returning({ id: designsTable.id })
  );

  if (deleted.length === 0) throw new Error("Design not found");
  return { ok: true };
}
