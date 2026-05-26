import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { submissions } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { name, email, area, message } = await req.json();
  if (!name || !email || !area || !message) {
    return Response.json({ error: "name, email, area, and message are required" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email))) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const [submission] = await db
    .insert(submissions)
    .values({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 200),
      area: String(area).slice(0, 100),
      message: String(message).slice(0, 2000),
    })
    .returning();

  return Response.json({ success: true, id: submission.id }, { status: 201 });
};

export const config: Config = {
  path: "/api/collaborate",
};
