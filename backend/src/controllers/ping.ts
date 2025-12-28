import type { Context } from "hono";

export function Ping(c: Context) {
  console.log("Pinged");
  return c.json({ message: "server alive!" }, 200);
}
