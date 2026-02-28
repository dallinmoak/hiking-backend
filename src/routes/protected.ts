import { Hono } from "hono";
import * as hikeController  from "../controllers/hike.js";

const protectedRoutes = new Hono();

protectedRoutes.get('/', async (c)=> {
  return c.json({ message: "you are chill bro" });
});

protectedRoutes.delete('/hikes/:id', hikeController.deleteHike);

export default protectedRoutes;