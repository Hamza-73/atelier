import { z } from "zod";

// Loose but safe schema for a saved design's JSON. Keeps colours restricted
// to hex codes and caps sizes so a save can't be used to smuggle in
// oversized or malformed data.
const hexColor = z.string().regex(/^#[0-9a-fA-F]{3,8}$/);

const sectionSchema = z
  .object({
    id: z.string().min(1).max(200),
    type: z.string().min(1).max(50),
    visible: z.boolean().optional(),
    variant: z.string().max(50).optional(),
    spacing: z.string().max(10).optional(),
    align: z.string().max(10).optional(),
    props: z.record(z.string(), z.any()).optional(),
  })
  .passthrough();

export const designDataSchema = z.object({
  paletteId: z.string().max(50),
  fontId: z.string().max(50),
  colorOverrides: z.record(z.string(), hexColor).default({}),
  sections: z.array(sectionSchema).max(60),
});

export const saveDesignInputSchema = z.object({
  savedId: z.string().uuid().nullable().optional(),
  name: z.string().trim().min(1).max(120),
  templateId: z.string().min(1).max(100),
  data: designDataSchema,
});

// Bumped whenever the shape of `data` changes in a way older saved
// designs won't already satisfy.
export const CURRENT_SCHEMA_VERSION = 1;

// Upgrades an older saved design's data to the current shape. No-op today;
// add version-specific transforms here as the schema evolves.
export function migrateDesign(row) {
  if (row.schemaVersion === CURRENT_SCHEMA_VERSION) return row;
  return { ...row, schemaVersion: CURRENT_SCHEMA_VERSION };
}
