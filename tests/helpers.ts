import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.participant.deleteMany({});
  await prisma.game.deleteMany({});
}
