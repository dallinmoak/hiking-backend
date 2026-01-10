import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hikes } from "./schema.js";

const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql, {
  schema: { hikes },
});
