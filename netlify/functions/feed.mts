import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { feedPosts } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async (req: Request) => {
  if (req.method === "GET") {
    const posts = await db
      .select()
      .from(feedPosts)
      .orderBy(desc(feedPosts.createdAt))
      .limit(20);
    return Response.json(posts);
  }

  if (req.method === "POST") {
    const { author, field, content } = await req.json();
    if (!author || !field || !content) {
      return Response.json({ error: "author, field, and content are required" }, { status: 400 });
    }
    const [post] = await db
      .insert(feedPosts)
      .values({ author: String(author).slice(0, 100), field: String(field).slice(0, 80), content: String(content).slice(0, 500) })
      .returning();
    return Response.json(post, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/feed",
};
