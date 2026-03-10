import { Context } from "hono";
import { db } from "../db/index.js";
import { hikes } from "../db/schema.js";
import { eq } from "drizzle-orm";

const returnAllHikes = async (c: Context) => {
  const hikeList = await db.select().from(hikes);
  return c.json(hikeList);
};

const addHike = async (c: Context) => {
  try {
    const input = await c.req.json();
    const hikeData = {
      ...input,
      authorId: input.userId,
    };
    const newhike = await db.insert(hikes).values(hikeData).returning();

    return c.json(newhike, 201);
  } catch (e) {
    console.error(e);
  }
};

const getHike = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));

    const [hike] = await db.select().from(hikes).where(eq(hikes.id, id));
    return c.json(hike);
  } catch (e) {
    console.error(e);
  }
};

const deleteHike = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));

    const [hike] = await db.select().from(hikes).where(eq(hikes.id, id));
    if (!hike) {
      return c.json({ message: "Hike not found" }, 404);
    } else {
      await db.delete(hikes).where(eq(hikes.id, id));
      return c.json({ message: "Hike deleted successfully" });
    }
  } catch (e) {
    console.error(e);
  }
};

export { returnAllHikes, addHike, getHike, deleteHike };
