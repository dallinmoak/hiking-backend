import { Hono } from "hono";
import { JWTPayload } from "jose";

type Variables = {
  user: JWTPayload;
}

const protectedRoutes = new Hono<{ Variables: Variables }>();

protectedRoutes.get("/", async (c) => {
  const user = c.get("user");
  return c.json({ message: `thanks for the authorized request, ${user.name}`, user });
});

export default protectedRoutes;
