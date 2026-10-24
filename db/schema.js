import { pgTable, uuid, text, jsonb, integer, timestamp, index } from "drizzle-orm/pg-core";

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
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("designs_user_id_idx").on(table.userId)]
);
