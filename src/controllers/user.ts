import { Context } from "hono";
import { db } from "../db/index.js";
import { userFavorites, hikes } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

const getFavorites = async (c: Context) => {
  try {
    const userId = c.get("user").sub;
    const favorites = await db
      .select({ hike: hikes })
      .from(userFavorites)
      .innerJoin(hikes, eq(userFavorites.hikeId, hikes.id))
      .where(eq(userFavorites.userId, userId));
    const favoritesWithDetails = favorites.map((row) => row.hike);
    return c.json(favoritesWithDetails);
  } catch (e) {
    console.error(e);
  }
};

const addFavorite = async (c: Context) => {
  try {
    const userId = c.get("user").sub;
    const hikeId = c.req.param("hikeId");
    const result = await db
      .insert(userFavorites)
      .values({ userId, hikeId: parseInt(hikeId) })
      .returning();
    return c.json({ result }, 201);
  } catch (e) {
    console.error(e);
  }
};

const removeFavorite = async (c: Context) => {
  try {
    const userId = c.get("user").sub;
    const hikeId = c.req.param("hikeId");
    const res = await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.hikeId, parseInt(hikeId)),
        ),
      )
      .returning();
    return c.json({
      deletedRecord: res[0],
    });
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to remove favorite" }, 500);
  }
};

export { getFavorites, addFavorite, removeFavorite };
