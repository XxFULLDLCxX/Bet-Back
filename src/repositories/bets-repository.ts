import { PrismaPromise } from '@prisma/client';
import { prisma } from '@/config';
import { BetParams } from '@/utils';

const create = (params: BetParams) => {
  return prisma.bet.create({ data: params });
};

async function executeActions<T1 extends PrismaPromise<unknown>, T2 extends PrismaPromise<unknown>>(
  action1: T1,
  action2: T2,
) {
  return await prisma.$transaction([action1, action2]);
}

export const betsRepository = {
  executeActions,
  create,
};
