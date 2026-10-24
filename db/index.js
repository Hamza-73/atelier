import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Next.js loads .env.local itself at runtime; this covers scripts run
// outside Next (drizzle-kit, one-off node scripts).
if (!process.env.DATABASE_URL) config({ path: ".env.local" });

// HTTP driver: fits Vercel's serverless functions (short-lived, no
// long-held TCP connections) better than node-postgres/pg.
export const db = drizzle(process.env.DATABASE_URL, { schema });
