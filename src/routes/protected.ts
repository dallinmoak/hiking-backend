import { Hono } from "hono";

const protectedRoutes = new Hono();

protectedRoutes.get('/', async (c)=> {
  return c.json({ message: "you are chill bro" });
});

export default protectedRoutes;