import { Context } from "hono";
import { db } from "../db/index.js";
import { hikes } from "../db/schema.js";
import { eq } from "drizzle-orm";

function baseCase(c: Context) {
  return c.json({ message: "Hello, World!" });
}

async function returnAllHikes(c: Context) {
  const hikeList = await db.select().from(hikes);
  return c.json(hikeList);
}

async function addHike(c: Context) {
  try {
    const input = await c.req.json();
    const newhike = await db.insert(hikes).values(input);

    return c.json(newhike, 201);
  }
  catch (e) {
    console.log(e);
  }
}

async function getHike(c: Context) {
  console.log('attemping request')
  try {
    const id = Number(c.req.param('id'));
    
    const [hike] = await db.select().from(hikes).where(eq(hikes.id, id));
    return c.json(hike);
  }
  catch (e) {
    console.log(e)
  }

}

export { baseCase, returnAllHikes, addHike, getHike } 