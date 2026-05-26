import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const feedPosts = pgTable("feed_posts", {
  id: serial().primaryKey(),
  author: text().notNull(),
  field: text().notNull(),
  content: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const submissions = pgTable("submissions", {
  id: serial().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  area: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
