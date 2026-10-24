import { pgTable, uuid, text, jsonb, integer, boolean, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";

// One row per saved design. Starter templates stay in data/templates.js;
// this table only holds designs a signed-in user has saved.
export const designsTable = pgTable(
  "designs",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Clerk user id
    name: text().notNull().default("Untitled Project"),
    templateId: text("template_id").notNull(),
    data: jsonb().notNull(), // { paletteId, fontId, colorOverrides, sections }
    schemaVersion: integer("schema_version").notNull().default(1),
    // When published, the design is viewable by anyone at /s/[publicSlug],
    // rendered live from this row (not a frozen snapshot — editing and
    // saving updates the live published page too).
    isPublished: boolean("is_published").notNull().default(false),
    publicSlug: text("public_slug"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("designs_user_id_idx").on(table.userId), uniqueIndex("designs_public_slug_idx").on(table.publicSlug)]
);
