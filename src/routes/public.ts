import { Hono } from "hono";
import * as hikeController from "../controllers/hike.js";

const publicRoutes = new Hono();

// Default get return
publicRoutes.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});

// Get all hikes
publicRoutes.get("/hikes", hikeController.returnAllHikes);

// Get single hike
publicRoutes.get("/hikes/:id", hikeController.getHike);

// Add new hike to database
publicRoutes.post("/hikes", hikeController.addHike);

export default publicRoutes;



