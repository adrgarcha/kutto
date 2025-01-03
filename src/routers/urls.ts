import { zValidator } from '@hono/zod-validator';
import { desc, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import crypto from 'node:crypto';
import { z } from 'zod';
import { db } from '..';
import { urlsTable } from '../db/schema';

const app = new Hono()
   .get('/urls', async c => {
      const urls = await db.select().from(urlsTable).orderBy(desc(urlsTable.createdAt)).limit(3);
      return c.json(urls);
   })
   .post('/urls', zValidator('json', z.object({ link: z.string() })), async c => {
      const { link } = await c.req.json();
      const hash = crypto.createHash('sha256').update(link).digest('hex').slice(0, 8);

      const query = await db.select().from(urlsTable).where(eq(urlsTable.hash, hash));
      const urlExists = query.length > 0;
      if (urlExists) throw new HTTPException(400, { message: 'URL already exists' });

      const shortUrl = `${c.req.url.replace('/urls', '')}/${hash}`;
      await db.insert(urlsTable).values({ hash, fullUrl: link, shortUrl });

      return c.json({ shortUrl }, 201);
   })
   .get('/:hash', async c => {
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
