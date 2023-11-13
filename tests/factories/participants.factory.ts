import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { ParticipantInput } from '@/utils';

export function generateParticipant(balance?: number) {
  const participant: ParticipantInput = {
    name: faker.person.fullName(),
    balance: balance || faker.number.int({ min: 1000, max: 1000000 }),
  };
  return participant;
}

export function buildParticipant(balance?: number) {
  return prisma.participant.create({ data: generateParticipant(balance) });
}
