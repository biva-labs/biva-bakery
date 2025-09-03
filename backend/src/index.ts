import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getImage } from "./controllers/image-controller.ts";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import orders from "./controllers/paymentOrder.ts"
import verifyPayment from "./controllers/verify-payment.ts"

const app = new Hono();
app.use(secureHeaders())
app.use("*", cors());

app.get("/images/:folder", getImage);
app.route('/api/orders', orders)
app.route('/api/verify-payment', verifyPayment);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
