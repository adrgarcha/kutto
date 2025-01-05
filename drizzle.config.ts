import { defineConfig } from 'drizzle-kit';

export default defineConfig({
   out: './drizzle',
   schema: './src/db/schema.ts',
   dialect: 'turso',
   dbCredentials: {
      url: import.meta.env.VITE_TURSO_DATABASE_URL!,
      authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN,
   },
});
