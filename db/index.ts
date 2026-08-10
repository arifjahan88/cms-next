import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const globalForDb = globalThis as unknown as {
  pgPool: Pool | undefined;
};

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  return new Pool({ connectionString });
}

function getPool() {
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = createPool();
  }
  return globalForDb.pgPool;
}

export const db = drizzle({ client: getPool() });
