import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();
const someValue = 12;

export default prisma;
