import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@archeusllc/types/prisma-client';

const {
  DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/band_together'
} = process.env;

const adapter = new PrismaPg({
  connectionString: DATABASE_URL
});

export const prisma = new PrismaClient({
  adapter
});

export async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
