import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import protectedRoutes from "./routes/protected.js";
import publicRoutes from "./routes/public.js";
import { authMiddleware } from "./middleware/auth.js";
import { OpenAPIHono } from "@hono/zod-openapi";

export const config = {
  runtime: "edge",
};

const app = new OpenAPIHono;

app.use("/*", cors());

app.route("/", publicRoutes);

app.use("/protected/*", authMiddleware);

app.route("/protected/", protectedRoutes);

export default handle(app);
