import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";


// import { db } from "./db/index.js";
// import { hikes } from "./db/schema.js";
import { baseCase, returnAllHikes, addHike, getHike }  from "./controllers/hike.js";

export const config = {
  runtime: "edge",
};

const app = new Hono();

// which address are acceptable. * means all
app.use("/*", cors());


// Default get return
app.get("/", baseCase);

// Get all hikes
app.get("/hikes", returnAllHikes);

// Get single hike
app.get("/hikes/:id", getHike)

// Add new hike to database
app.post("/hikes", addHike)


export default handle(app);
