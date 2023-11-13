import { prisma } from '@/config';
import { GameParams } from '@/utils';

const create = (params: GameParams) => {
  return prisma.game.create({ data: params });
};

const findMany = () => {
  return prisma.game.findMany({});
};

const findByIdIncludeBet = (id: number) => {
  console.log(id);

  return prisma.game.findFirst({ where: { id }, include: { Bet: true } });
};

const updateById = (params: Partial<GameParams>, id: number) => {
  return prisma.game.update({ where: { id }, data: { ...params, updatedAt: new Date() } });
};

const findFirstById = (id: number) => {
  return prisma.game.findFirst({ where: { id } });
};

export const gamesRepository = {
  create,
  findMany,
  updateById,
  findFirstById,
  findByIdIncludeBet,
};
