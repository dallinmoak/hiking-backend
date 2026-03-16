import { Context } from "hono";
import { db } from "../db/index.js";
import { userFavorites, hikes, users } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

const getUser = async (c: Context) => {
  try {
    const id = c.req.param("userId");
    const res = await db.select().from(users).where(eq(users.id, id));
    if (res.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }
    const user = res[0];
    return c.json(user);
  } catch (e) {
    console.error(e);
    return c.json({ error: "Failed to get user" }, 500);
  }
}

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

export { getFavorites, addFavorite, removeFavorite, getUser };
