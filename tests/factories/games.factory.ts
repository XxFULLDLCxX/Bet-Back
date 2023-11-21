import { faker } from '@faker-js/faker';
import { prisma } from '@/config';
import { GameStartInput, GameParams, GameFinishInput } from '@/utils';

export function generateStartGameInput() {
  const game: GameStartInput = {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
  };
  return game;
}

export function generateFinishGameInput() {
  const game: GameFinishInput = {
    homeTeamScore: faker.number.int({ min: 1000, max: 1000000 }),
    awayTeamScore: faker.number.int({ min: 1000, max: 1000000 }),
  };
  return game;
}
export function generateStartGame() {
  const input = generateStartGameInput();
  const params: GameParams = {
    ...input,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return { params, input };
}

export function generateFinishGame() {
  const input = generateFinishGameInput();
  const params: GameParams = {
    homeTeamName: faker.company.name(),
    awayTeamName: faker.company.name(),
    ...input,
    isFinished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return { params, input };
}

export function buildFinishGame(params?: GameParams) {
  return prisma.game.create({ data: params || generateFinishGame().params });
}

export function buildStartGame(params?: GameParams) {
  return prisma.game.create({ data: params || generateStartGameInput() });
}
