import 'dotenv/config';
import { PrismaClient } from '../config/prisma';
import { authService } from '../routes/auth/auth.service';

async function main() {
  console.log('🌱 Seeding admin user...');
  const prisma = PrismaClient;

  const existingAdmin = await prisma.adminUser.findFirst();
  if (existingAdmin) {
    console.log('✓ Admin user already exists');
    return;
  }

  const admin = await authService.create(
    'admin@bandtogether.dev',
    'ChangeMeInProduction123!',
    'Admin'
  );

  console.log('✓ Admin user created:');
  console.log(`  Email: ${admin.email}`);
  console.log(`  Display Name: ${admin.displayName}`);
  console.log('⚠️  Please change the password in production!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
