import { PrismaClient } from '../../config/prisma';
import bcrypt from 'bcrypt';

const prisma = PrismaClient;

export const authService = {
  async findByEmail(email: string) {
    return prisma.adminUser.findUnique({
      where: { email },
      select: {
        adminUserId: true,
        email: true,
        displayName: true,
        passwordHash: true,
        isActive: true,
      },
    });
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  },

  async getById(adminUserId: string) {
    return prisma.adminUser.findUnique({
      where: { adminUserId },
      select: {
        adminUserId: true,
        email: true,
        displayName: true,
        isActive: true,
        createdAt: true,
      },
    });
  },

  async create(email: string, password: string, displayName?: string) {
    const passwordHash = await this.hashPassword(password);

    return prisma.adminUser.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
      select: {
        adminUserId: true,
        email: true,
        displayName: true,
        isActive: true,
      },
    });
  },
};
