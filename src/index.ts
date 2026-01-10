import { Hono } from "hono";
import { handle } from "hono/vercel";

import { db } from "./db/index.js";
import { hikes } from "./db/schema.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("/hikes", async (c) => {
  const hikeList = await db.select().from(hikes);
  return c.json(hikeList);
});

export default handle(app);
