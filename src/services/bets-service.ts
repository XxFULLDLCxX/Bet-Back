import httpStatus from 'http-status';
import { BetInput, setError } from '@/utils';
import { betsRepository, gamesRepository, participantsRepository } from '@/repositories';

// test
/*
La vida
*/

const create = async ({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: BetInput) => {
  const participant = await participantsRepository.findFirstById(participantId);
  const game = await gamesRepository.findFirstById(gameId);
  if (!game) throw setError(httpStatus.NOT_FOUND, 'gameId não existe!');
  if (!participant) throw setError(httpStatus.NOT_FOUND, 'participantId não existe!');
  if (game.isFinished) throw setError(httpStatus.CONFLICT, 'Jogo já finalizado, aposta não permitida.');
  if (amountBet <= 0) throw setError(httpStatus.BAD_REQUEST, 'O Valor da aposta tem que ser maior que zero.');
  if (participant.balance < amountBet) throw setError(httpStatus.BAD_REQUEST, 'Saldo insuficiente para a aposta.');

  const createdBet = betsRepository.create({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
  const updatedBalance = participantsRepository.updateById({ balance: participant.balance - amountBet }, participantId);
  await betsRepository.executeActions(createdBet, updatedBalance);
  return createdBet;
};

export const betService = {
  create,
};
