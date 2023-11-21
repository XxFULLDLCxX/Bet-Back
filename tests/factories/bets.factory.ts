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

type BuildBetParams = {
  gameId: number;
  amountBet: number;
  participantId: number;
  homeTeamScore?: number;
  awayTeamScore?: number;
};

export function buildBet(params: BuildBetParams) {
  return prisma.bet.create({ data: generateBet(params) });
}

export function checkBets() {
  return prisma.bet.findMany({});
}
