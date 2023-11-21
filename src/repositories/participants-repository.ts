import { prisma } from '@/config';
import { ParticipantInput, ParticipantParams } from '@/utils';

const create = (params: ParticipantParams) => {
  return prisma.participant.create({ data: params });
};

const findMany = () => {
  return prisma.participant.findMany({ orderBy: { id: 'asc' } });
};

const updateById = (params: Partial<ParticipantInput>, id: number) => {
  return prisma.participant.update({ where: { id }, data: { ...params, updatedAt: new Date() } });
};

const findFirstById = (id: number) => {
  return prisma.participant.findFirst({ where: { id } });
};

export const participantsRepository = {
  create,
  findMany,
  updateById,
  findFirstById,
};
