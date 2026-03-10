import { Hono } from "hono";
import { JWTPayload } from "jose";
import * as hikeController  from "../controllers/hike.js";
import * as user from "../controllers/user.js";

type Variables = {
  user: JWTPayload;
}

const protectedRoutes = new Hono<{ Variables: Variables }>();

protectedRoutes.get("/", async (c) => {
  const user = c.get("user");
  return c.json({ message: `thanks for the authorized request, ${user.name}`, user });
});
protectedRoutes.get('/my-favorites', user.getFavorites);


protectedRoutes.delete('/hikes/:id', hikeController.deleteHike);

export default protectedRoutes;
