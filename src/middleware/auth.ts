import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify, JWTPayload } from "jose";

export type AuthVariables = {
  user: JWTPayload;
};

const keySet = createRemoteJWKSet(
  new URL(`${process.env.NEON_AUTH_URL}/.well-known/jwks.json`),
);

export const authMiddleware = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const { payload } = await jwtVerify(token, keySet);
      c.set("user", payload);
      await next();
    } catch (e) {
      return c.json({ message: "Unauthorized" }, 401);
    }
  },
);
