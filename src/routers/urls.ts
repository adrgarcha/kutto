import { Hono } from 'hono';

const app = new Hono()
   .get('/urls', c => c.json('list urls'))
   .post('/urls', c => c.json('create url'))
   .get('/:id', c => c.json('get url'));

export default app;
