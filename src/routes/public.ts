import { Hono } from "hono";
import * as hikeController from "../controllers/hike.js";

import { swaggerUI } from "@hono/swagger-ui"; // This has an issue with serverless artitechture
import { hikedocs } from "./routing.js";

const publicRoutes = new Hono();

// Default get return
publicRoutes.get("/", (c) => {
  return c.json({ message: "Hello, World!" }, 200);
});

// Get all hikes
publicRoutes.get("/hikes", hikeController.returnAllHikes);

// Get single hike
publicRoutes.get("/hikes/:id", hikeController.getHike);

// Documentation route
publicRoutes.get('/ui', swaggerUI({ spec: hikedocs, url: [] }))

export default publicRoutes;



