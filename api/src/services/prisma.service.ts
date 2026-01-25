import { PrismaClient } from "@band-together/shared-runtime";

export const prisma = PrismaClient();

export async function checkDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
