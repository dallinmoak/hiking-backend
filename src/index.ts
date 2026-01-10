import { Hono } from "hono";
import { handle } from "hono/vercel";
import { serve } from "@hono/node-server";

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


// hacky, but any time it's not a vercel env, imma assume it's local dev and start a local server
if (!process.env.VERCEL) {
  console.log("running a dev server at http://localhost:3000");
  serve({
    fetch: app.fetch,
    port: 3000
  })
}

export default handle(app);
