import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export default function createDb(env: any) {
   const db = drizzle(
      createClient({
         url: env.TURSO_DATABASE_URL,
         authToken: env.TURSO_AUTH_TOKEN,
      }),
      { schema }
   );

   return db;
}
