import { Context } from "hono";
import { db } from "../db/index.js";
import { hikes, userFavorites, hikesWithDetails } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import { isAuthor } from "../lib/utils.js";

const returnAllHikes = async (c: Context) => {
  const hikeList = await db.select().from(hikesWithDetails);
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

    const [hike] = await db.select().from(hikesWithDetails).where(eq(hikesWithDetails.id, id));
    return c.json(hike);
  } catch (e) {
    console.error(e);
  }
};

const deleteHike = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const userId = c.get("user").sub;
    const isAuthorCheck = await isAuthor(id, userId);
    if (!isAuthorCheck) {
      return c.json({ message: "Unauthorized" }, 403);
    }
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

const isFavorite = async (c: Context) => {
  try {
    const userId = c.get("user").sub;
    const hikeId = Number(c.req.param("hikeId"));

    const favorite = await db
      .select()
      .from(userFavorites)
      .where(
        and(eq(userFavorites.userId, userId), eq(userFavorites.hikeId, hikeId)),
      );

    return c.json({ isFavorite: favorite.length > 0 });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to check favorite status" }, 500);
  }
};

export { returnAllHikes, addHike, getHike, deleteHike, isFavorite };
