import { GameInput } from '@/utils';
import { gamesRepository } from '@/repositories';

const create = ({ homeTeamName, awayTeamName }: GameInput) => {
  return gamesRepository.create({
    homeTeamName,
    awayTeamName,
    homeTeamScore: 0,
    awayTeamScore: 0,
    isFinished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const gameService = {
  create,
};
