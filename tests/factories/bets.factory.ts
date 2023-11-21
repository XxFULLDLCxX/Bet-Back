import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { BetInput, BetParams } from '@/utils';

export function generateBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: Partial<BetParams>) {
  const bet: BetInput = {
    homeTeamScore: homeTeamScore || faker.number.int({ min: 0, max: 1000000 }),
    awayTeamScore: awayTeamScore || faker.number.int({ min: 0, max: 1000000 }),
    amountBet: amountBet,
    gameId,
    participantId,
  };

  return bet;
}

export function buildBet(
  gameId: number,
  amountBet: number,
  participantId: number,
  homeTeamScore?: number,
  awayTeamScore?: number,
) {
  return prisma.bet.create({ data: generateBet({ amountBet, gameId, participantId, homeTeamScore, awayTeamScore }) });
}

export function checkBets() {
  return prisma.bet.findMany({});
}
