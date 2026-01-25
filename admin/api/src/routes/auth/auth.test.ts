import 'dotenv/config';
import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { PrismaClient } from '../../generated/prisma-client';
import { authService } from './auth.service';

let prisma: PrismaClient;

describe('Auth Service', () => {
  const testEmail = `test-${Date.now()}@admin.test`;
  const testPassword = 'Test@123456';

  beforeAll(async () => {
    prisma = new PrismaClient();
    // Create test admin user
    await authService.create(testEmail, testPassword, 'Test Admin');
  });

  afterAll(async () => {
    // Clean up test data
    if (prisma) {
      await prisma.adminUser.deleteMany({
        where: { email: testEmail },
      });
      await prisma.$disconnect();
    }
  });

  it('should hash and verify passwords', async () => {
    const password = 'TestPassword123!';
    const hash = await authService.hashPassword(password);

    expect(hash).not.toBe(password);

    const isValid = await authService.verifyPassword(password, hash);
    expect(isValid).toBe(true);

    const isInvalid = await authService.verifyPassword('WrongPassword', hash);
    expect(isInvalid).toBe(false);
  });

  it('should find admin by email', async () => {
    const admin = await authService.findByEmail(testEmail);

    expect(admin).toBeDefined();
    expect(admin?.email).toBe(testEmail);
    expect(admin?.isActive).toBe(true);
  });

  it('should verify password correctly', async () => {
    const admin = await authService.findByEmail(testEmail);
    expect(admin).toBeDefined();

    const isValid = await authService.verifyPassword(testPassword, admin!.passwordHash);
    expect(isValid).toBe(true);
  });

  it('should get admin by id', async () => {
    const created = await authService.findByEmail(testEmail);
    expect(created).toBeDefined();

    const admin = await authService.getById(created!.adminUserId);

    expect(admin).toBeDefined();
    expect(admin?.adminUserId).toBe(created?.adminUserId);
    expect(admin?.email).toBe(testEmail);
  });
});
