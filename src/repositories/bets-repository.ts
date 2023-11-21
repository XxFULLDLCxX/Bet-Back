import { PrismaPromise } from '@prisma/client';
import { prisma } from '@/config';
import { BetParams } from '@/utils';

const create = (params: BetParams) => {
  return prisma.bet.create({ data: params });
};

const updateById = ({ status, amountWon }: Partial<BetParams>, id: number) => {
  return prisma.bet.update({
    where: { id },
    data: { status, amountWon, updatedAt: new Date(), Participant: { update: { balance: { increment: amountWon } } } },
  });
};

const findManyByGameIdIncludeParticipant = (gameId: number) => {
  return prisma.bet.findMany({ where: { gameId }, include: { Participant: true } });
};

const executeActions = <P extends PrismaPromise<unknown>[]>(...actions: [...P]) => {
  return prisma.$transaction([...actions]);
};

export const betsRepository = {
  create,
  executeActions,
  findManyByGameIdIncludeParticipant,
  updateById,
};
