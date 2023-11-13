import { prisma } from '@/config';
import { ParticipantParams } from '@/utils';

const create = (params: ParticipantParams) => {
  console.log(params);

  return prisma.participant.create({ data: params });
};

export const participantsRepository = {
  create,
};
