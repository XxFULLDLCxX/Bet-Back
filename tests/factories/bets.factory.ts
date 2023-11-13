import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { BetInput } from '@/utils';

export function generateBet({ amountBet, gameId, participantId }: Omit<BetInput, 'homeTeamScore' | 'awayTeamScore'>) {
  const bet: BetInput = {
    homeTeamScore: faker.number.int({ min: 0, max: 1000000 }),
    awayTeamScore: faker.number.int({ min: 0, max: 1000000 }),
    amountBet: amountBet,
    gameId,
    participantId,
  };

  return bet;
}

export function buildBet(amountBet: number, gameId: number, participantId: number) {
  prisma.bet.create({ data: generateBet({ amountBet, gameId, participantId }) });
}
