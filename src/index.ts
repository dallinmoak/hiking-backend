import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import protectedRoutes from "./routes/protected.js";
import publicRoutes from "./routes/public.js";
import { authMiddleware } from "./middleware/auth.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use("/*", cors());

app.route("/", publicRoutes);

app.use("/protected/*", authMiddleware);

// When you use app.route("/protected/*", protectedRoutes), 
// Hono (and many other frameworks) 
// appends the paths defined inside the router to that prefix.
// is what LLM said about have * after protected/ so I got rid of it and it works
// when using REST client to test the delete route. 
app.route("/protected/", protectedRoutes);


export default handle(app);
