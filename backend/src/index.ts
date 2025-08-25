import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { getImage } from './controllers/image-controller.ts';

const app = new Hono()

app.get('/images/:folder', getImage);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
