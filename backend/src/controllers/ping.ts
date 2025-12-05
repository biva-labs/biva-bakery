import type { Context } from "hono";

export function Ping(c: Context) {
  return c.json({ message: "server alive!" }, 200);
}
