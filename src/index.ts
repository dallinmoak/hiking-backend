import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import { db } from "./db/index.js";
import { hikes } from "./db/schema.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("/hikes", async (c) => {
  const hikeList = await db.select().from(hikes);
  return c.json(hikeList);
});

app.post("/hikes", async(c) => {
  // JSON or HTML form submit 
  const input = await c.req.json();
  // Take the json, look inside hikes, and insert it
  const newhike = db.insert(hikes).values(input);

  return c.json(newhike, 201);
  // Post test through terminal
});

export default handle(app);
