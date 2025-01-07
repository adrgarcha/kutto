import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const urlsTable = sqliteTable('urls_table', {
   id: int().primaryKey({ autoIncrement: true }),
   hash: text().unique(),
   fullUrl: text('full_url'),
   shortUrl: text('short_url'),
});
