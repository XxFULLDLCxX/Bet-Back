import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { GameInput } from '@/utils';

export function generateGame() {
  const game: GameInput = {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
  };
  return game;
}

export function buildGame() {
  prisma.game.create({ data: generateGame() });
}
