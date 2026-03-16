import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

const isAuthor = async (hikeId: number, userId: string) => {  const res = await db.query.hikes.findFirst({
    where: (hikes) => eq(hikes.id, hikeId),
  });
  return res?.authorId === userId;
};

export { isAuthor };
