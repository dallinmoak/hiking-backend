import { Hono } from "hono";
import * as hikeController from "../controllers/hike.js";
import { appendFile } from "fs";
import { xid } from "zod"

import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const publicRoutes = new OpenAPIHono();

// Default get return
publicRoutes.get("/", (c) => {
  return c.json({ message: "Hello, World!" }, 200);
});

// Get all hikes
publicRoutes.get("/hikes", hikeController.returnAllHikes);

// Get single hike
publicRoutes.get("/hikes/:id", hikeController.getHike);

// Documentation route
publicRoutes.get("/ui", swaggerUI({ url: "/routing.yaml" }))

export default publicRoutes;



