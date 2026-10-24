"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/db";
import { designsTable } from "@/db/schema";
import { saveDesignInputSchema, migrateDesign, CURRENT_SCHEMA_VERSION } from "@/lib/validation/design";

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
    ...migrated.data,
  };
}

export async function listDesigns() {
  const userId = await requireUserId();
  const rows = await db
    .select()
    .from(designsTable)
    .where(eq(designsTable.userId, userId))
    .orderBy(desc(designsTable.updatedAt));

  return rows.map((row) => ({
    savedId: row.id,
    name: row.name,
    templateId: row.templateId,
    updatedAt: row.updatedAt,
  }));
}

export async function getDesign(savedId) {
  const userId = await requireUserId();
  const [row] = await db
    .select()
    .from(designsTable)
    .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
    .limit(1);

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
    const [existing] = await db
      .select({ id: designsTable.id })
      .from(designsTable)
      .where(and(eq(designsTable.id, parsed.savedId), eq(designsTable.userId, userId)))
      .limit(1);

    if (!existing) throw new Error("Design not found");

    const [updated] = await db
      .update(designsTable)
      .set({
        name: parsed.name,
        data: parsed.data,
        schemaVersion: CURRENT_SCHEMA_VERSION,
        updatedAt: new Date(),
      })
      .where(and(eq(designsTable.id, parsed.savedId), eq(designsTable.userId, userId)))
      .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt });

    return updated;
  }

  const [created] = await db
    .insert(designsTable)
    .values({
      userId,
      name: parsed.name,
      templateId: parsed.templateId,
      data: parsed.data,
      schemaVersion: CURRENT_SCHEMA_VERSION,
    })
    .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt });

  return created;
}

export async function renameDesign(savedId, name) {
  const userId = await requireUserId();
  const cleanName = String(name).trim().slice(0, 120) || "Untitled Project";

  const [updated] = await db
    .update(designsTable)
    .set({ name: cleanName, updatedAt: new Date() })
    .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
    .returning({ id: designsTable.id });

  if (!updated) throw new Error("Design not found");
  return updated;
}

export async function duplicateDesign(savedId) {
  const userId = await requireUserId();
  const [row] = await db
    .select()
    .from(designsTable)
    .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
    .limit(1);

  if (!row) throw new Error("Design not found");

  const [created] = await db
    .insert(designsTable)
    .values({
      userId,
      name: `${row.name} (Copy)`,
      templateId: row.templateId,
      data: row.data,
      schemaVersion: row.schemaVersion,
    })
    .returning({ id: designsTable.id, updatedAt: designsTable.updatedAt });

  return created;
}

export async function deleteDesign(savedId) {
  const userId = await requireUserId();
  const deleted = await db
    .delete(designsTable)
    .where(and(eq(designsTable.id, savedId), eq(designsTable.userId, userId)))
    .returning({ id: designsTable.id });

  if (deleted.length === 0) throw new Error("Design not found");
  return { ok: true };
}
