import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getImage, uploadImage } from "./controllers/image-controller.ts";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import orders from "./controllers/paymentOrder.ts"
import verifyPayment from "./controllers/verify-payment.ts"
import { insertFoodCourt } from "./db/index.ts";
import { CloudinaryService } from "./utils/cloudinary-service.ts";
import { foodCourtForm } from "./controllers/foodCourtForm.ts";


const app = new Hono();
app.use(secureHeaders());

const allowedOrigin = "http://127.0.0.1:5173"

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

app.get("/images/:folder", getImage);
app.route('/api/orders', orders)
app.route('/api/verify-payment', verifyPayment);

app.post('/test', async(c) => {
  try {
    const data = await c.req.parseBody()
    const insertedData = await insertFoodCourt(data);
    return c.json({message: 'Food Court Table uploaded success!', data: insertedData}, 201);
  }
  catch(error) {
    console.error('Error at /test route', error);
    return c.json({message: 'failed to add food court'}, 500);
  }
})

app.post('/foodCourtTable', foodCourtForm);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
