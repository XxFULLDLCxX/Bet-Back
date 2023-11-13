import { prisma } from '@/config';
import { GameParams } from '@/utils';

const create = (params: GameParams) => {
  return prisma.game.create({ data: params });
};

const updateById = (params: Partial<GameParams>, id: number) => {
  return prisma.game.update({ where: { id }, data: { ...params, updatedAt: new Date() } });
};

const findFirstById = (id: number) => {
  return prisma.game.findFirst({ where: { id } });
};

export const gamesRepository = {
  create,
  updateById,
  findFirstById,
};
