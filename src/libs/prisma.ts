import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

/* @type {{ prisma?: PrismaClient }} */

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
