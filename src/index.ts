import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";


import * as controller  from "./controllers/hike.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

// which address are acceptable. * means all
app.use("/*", cors());


// Default get return
app.get("/", controller.baseCase);

// Get all hikes
app.get("/hikes", controller.returnAllHikes);

// Get single hike
app.get("/hikes/:id", controller.getHike)

// Add new hike to database
app.post("/hikes", controller.addHike)


export default handle(app);
