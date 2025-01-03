import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { Hono } from 'hono';
import urls from './routers/urls';

const app = new Hono();

export const db = drizzle({
   connection: {
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
   },
});

const routes = app.route('/', urls);

export type AppType = typeof routes;

app.get('/', c => {
   return c.html(
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <title>Kutto</title>
            {import.meta.env.PROD ? (
               <>
                  <link href="/static/index.css" rel="stylesheet" />
                  <script type="module" src="/static/client.js" />
               </>
            ) : (
               <>
                  <link href="/src/index.css" rel="stylesheet" />
                  <script type="module" src="/src/client.tsx" />
               </>
            )}
         </head>
         <body>
            <div id="root" />
         </body>
      </html>
   );
});

export default app;
