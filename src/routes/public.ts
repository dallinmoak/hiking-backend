import { Hono } from "hono";
import * as hikeController from "../controllers/hike.js";
import { appendFile } from "fs";
import { xid } from "zod"

// Documentation imports
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute } from "@hono/zod-openapi";
import { z } from "@hono/zod-openapi";


const HikeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
}).openapi("Hike")

const publicRoutes = new OpenAPIHono();

// Default get return
publicRoutes.get("/", (c) => {
  return c.json({ message: "Hello, World!" });
});


const routeAll = createRoute({
  method: 'get',
  path: '/hikes',
  responses: {
    200: {
      description: 'return all hikes',
      content: {
        'application/json': {
          schema: z.array(HikeSchema)
        }
        }
      }
    }
  });

// Get all hikes
// publicRoutes.get("/hikes", hikeController.returnAllHikes);
publicRoutes.openapi(routeAll, hikeController.returnAllHikes);

// Get single hike
publicRoutes.get("/hikes/:id", hikeController.getHike);

// Add new hike to database
publicRoutes.post("/hikes", hikeController.addHike);

publicRoutes.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Hikes API",
    version: "1.0.0"
  }
})

publicRoutes.get("/ui", swaggerUI({ url: "/doc" }))

export default publicRoutes;



