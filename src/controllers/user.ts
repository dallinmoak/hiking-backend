import { Context } from "hono";
import { db } from "../db/index.js";
import { userFavorites, hikes } from "../db/schema.js";
import { eq } from "drizzle-orm";

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

export { getFavorites };
