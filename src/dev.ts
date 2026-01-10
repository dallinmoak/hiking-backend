import 'dotenv/config';

import { serve } from "@hono/node-server";
import app from "./index.js";

console.log("running a dev server at http://localhost:3000");
serve({
  fetch: app,
  port: 3000,
});
