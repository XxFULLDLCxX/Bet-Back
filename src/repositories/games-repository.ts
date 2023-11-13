import { prisma } from '@/config';
import { GameParams } from '@/utils';

const create = (params: GameParams) => {
  return prisma.game.create({ data: params });
};

const findFirstById = (id: number) => {
  return prisma.game.findFirst({ where: { id } });
};

export const gamesRepository = {
  create,
  findFirstById,
};
