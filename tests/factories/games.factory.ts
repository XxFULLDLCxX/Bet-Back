import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { GameInput, GameParams } from '@/utils';

export function generateGame() {
  const game: GameInput = {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
  };
  return game;
}

export function buildGame({ isFinished }: Partial<GameParams> = {}) {
  return prisma.game.create({ data: { ...generateGame(), isFinished } });
}
