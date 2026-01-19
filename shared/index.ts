import 'dotenv/config';
import { PrismaClient as _PrismaClient, Prisma } from './generated/prisma-client/index.js';
import { PrismaPg } from '@prisma/adapter-pg'

const {
  DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/band_together'
} = process.env;

// Change the adapter depending on the db used - in this case, PostgreSQL
const adapter = new PrismaPg({
  connectionString: DATABASE_URL
});

export const PrismaClient = (options?: Prisma.PrismaClientOptions) => new _PrismaClient({
  adapter,
  ...options
});

// Export all shared modules
export * from './types/index.ts';
export * from './generated/api-types/index.ts';
