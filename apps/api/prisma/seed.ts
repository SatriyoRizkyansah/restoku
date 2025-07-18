// prisma/seed.ts

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, hanya untuk development)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        code: 'K-01',
        name: 'Sate Ayam',
        price: 10000,
        its_ready: true,
        best_seller: true,
        img: 'sate-ayam.jpg',
      },
      {
        code: 'K-02',
        name: 'Nasi Goreng',
        price: 12000,
        its_ready: true,
        best_seller: true,
        img: 'nasi-goreng-telor.jpg',
      },
      {
        code: 'K-03',
        name: 'Nasi Remes',
        price: 15000,
        its_ready: true,
        best_seller: true,
        img: 'nasi-remes.jpg',
      },
    ],
  });

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed-password-123',
      },
      {
        username: 'kasir1',
        email: 'kasir1@example.com',
        password: 'hashed-password-456',
      },
    ],
  });

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
