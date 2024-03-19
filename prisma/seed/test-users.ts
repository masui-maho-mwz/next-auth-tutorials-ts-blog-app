import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTestUsers = async () => {
  await prisma.user.create({
    data: {
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password1',
      createdAt: new Date('2024-03-01 11:00:00'),
      updatedAt: new Date('2023-03-01 11:00:00'),
    },
  });
  await prisma.user.create({
    data: {
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password2',
      createdAt: new Date('2024-03-02 12:00:00'),
      updatedAt: new Date('2023-03-02 12:00:00'),
    },
  });
  await prisma.user.create({
    data: {
      name: 'User 3',
      email: 'user3@example.com',
      password: 'password3',
      createdAt: new Date('2024-03-03 13:00:00'),
      updatedAt: new Date('2023-03-03 13:00:00'),
    },
  });
  await prisma.user.create({
    data: {
      name: 'User 4',
      email: 'user4@example.com',
      password: 'password4',
      createdAt: new Date('2024-03-04 14:00:00'),
      updatedAt: new Date('2023-03-04 14:00:00'),
    },
  });
  await prisma.user.create({
    data: {
      name: 'User 5',
      email: 'user5@example.com',
      password: 'password5',
      createdAt: new Date('2024-03-05 15:00:00'),
      updatedAt: new Date('2023-03-05 15:00:00'),
    },
  });
};
