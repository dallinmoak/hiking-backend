import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import protectedRoutes from "./routes/protected.js";
import publicRoutes from "./routes/public.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

// which address are acceptable. * means all
app.use("/*", cors());

app.route("/", publicRoutes);

const authMiddleware = async (c: any, next: any) => {
  // TODO: use jose verify the JWT token and then add the user info to the context for the next handlers to use.
  if (c.req.header("Is-Chill") == "true") {
    return await next();
  } else {
    return c.json({ message: "not chill bro" }, 401);
  }
};

app.use("/protected/*", authMiddleware);

app.route("/protected/*", protectedRoutes);


export default handle(app);
