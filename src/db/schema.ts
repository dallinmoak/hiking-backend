import {
  pgSchema,
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  primaryKey,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

// the user table already exists in the database, provided the db has neon auth enabled. In future drizzle lookups to the users table can be done through this table
export const neonAuth = pgSchema("neon_auth");

export const users = neonAuth.table("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const hikes = pgTable("hikes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const userFavorites = pgTable(
  "user_favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    hikeId: integer("hike_id")
      .notNull()
      .references(() => hikes.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.userId, table.hikeId],
      }),
    };
  },
);
