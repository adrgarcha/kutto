import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import createDb from '../db/db';
import { urlsTable } from '../db/schema';

const app = new Hono()
   .post('/urls', zValidator('json', z.object({ link: z.string() })), async c => {
      const db = createDb(c.env);

      let { link } = (await c.req.json()) as { link: string };
      link = link.endsWith('/') ? link.slice(0, -1) : link;

      const hashData = link + Date.now();
      const hash = createHash('sha256').update(hashData).digest('hex').slice(0, 8);

      const query = await db.select().from(urlsTable).where(eq(urlsTable.hash, hash));
      const urlExists = query.length > 0;
      if (urlExists) throw new HTTPException(400, { message: 'URL already exists' });

      const shortUrl = `${c.req.url.replace('/urls', '')}/${hash}`;
      await db.insert(urlsTable).values({ hash, fullUrl: link, shortUrl });

      return c.json({ shortUrl }, 201);
   })
   .get('/:hash', async c => {
      const db = createDb(c.env);

      const { fullUrl } = (
         await db
            .select()
            .from(urlsTable)
            .where(eq(urlsTable.hash, c.req.param('hash')))
      )[0];

      if (!fullUrl) return c.notFound();

      return c.redirect(fullUrl);
   });

export default app;
