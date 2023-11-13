import { prisma } from '@/config';
import { GameParams } from '@/utils';

const create = (params: GameParams) => {
  return prisma.game.create({ data: params });
};

export const gamesRepository = {
  create,
};
