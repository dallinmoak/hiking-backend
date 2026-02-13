import { Context } from "hono";
import { db } from "../db/index.js";
import { hikes } from "../db/schema.js";

function baseCase(c: Context) {
    return c.json({ message: "Hello, World!" });
}

async function returnAllHikes(c: Context) {
    const hikeList = await db.select().from(hikes);
    return c.json(hikeList);
}

async function addHike(c: Context) {
    try {
        const input = await c.req.json();
        console.log(input);
        // Take the json, look inside hikes, and insert it
        const newhike = await db.insert(hikes).values(input);

        return c.json(newhike, 201);
        // Post test through terminal``
    }
    catch (e) {
        console.log(e);
    }
}

async function getHike(c: Context) {
    const id = await c.req.json();

    const hike = await db.select(id).from(hikes);
    return c.json(hike);
}

export { baseCase, returnAllHikes, addHike, getHike } 