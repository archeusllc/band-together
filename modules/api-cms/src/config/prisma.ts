import { PrismaClient as _PrismaClient, Prisma } from '../generated/prisma-client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/band_together';

if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL environment variable is required in production');
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

export const getPrismaClient = (options?: Prisma.PrismaClientOptions) =>
  new _PrismaClient({
    adapter,
    ...options,
  });

// Export a singleton instance for convenience
export const PrismaClient = getPrismaClient();
