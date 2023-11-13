import { PrismaPromise } from '@prisma/client';
import { prisma } from '@/config';
import { BetParams } from '@/utils';

const create = (params: BetParams) => {
  return prisma.bet.create({ data: params });
};

const updateById = (params: Partial<BetParams>, id: number) => {
  return prisma.bet.update({ where: { id }, data: { ...params, updatedAt: new Date() } });
};

const findManyByGameIdIncludeParticipant = (gameId: number) => {
  return prisma.bet.findMany({ where: { gameId }, include: { Participant: true } });
};

async function executeActions<T1 extends PrismaPromise<unknown>, T2 extends PrismaPromise<unknown>>(
  action1: T1,
  action2: T2,
) {
  return await prisma.$transaction([action1, action2]);
}

export const betsRepository = {
  executeActions,
  findManyByGameIdIncludeParticipant,
  updateById,
  create,
};
