import httpStatus from 'http-status';
import { GameFinishInput, GameStartInput, setError } from '@/utils';
import { betsRepository, gamesRepository, participantsRepository } from '@/repositories';

const create = ({ homeTeamName, awayTeamName }: GameStartInput) => {
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

const finish = async ({ homeTeamScore, awayTeamScore }: GameFinishInput, gameId: number) => {
  const game = await gamesRepository.findFirstById(gameId);
  const bets = await betsRepository.findManyByGameIdIncludeParticipant(gameId);
  // balance = (p.balance / wp.balance) * all.balance * (1 - 0.3);

  const win_participant_balance = bets.reduce((m, { Participant: { balance }, ...bet }) => {
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      return m + balance;
    }
  }, 0);

  const total_balance = bets.reduce((m, { Participant: { balance } }) => {
    return m + balance;
  }, 0);

  for (let i = 0; i < bets.length; i++) {
    const { Participant: p, ...bet } = bets[i];
    let balance = 0;
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      balance = (p.balance / win_participant_balance) * total_balance * (1 - 0.3);
      await betsRepository.updateById({ status: 'WON', amountWon: balance }, bet.id);
      await participantsRepository.updateById({ balance }, p.id);
    } else {
      await betsRepository.updateById({ status: 'LOST', amountWon: 0 }, bet.id);
    }
  }
  if (!game) throw setError(httpStatus.NOT_FOUND, 'O id fornecido não corresponde a um jogo válido.');
  return gamesRepository.updateById({ homeTeamScore, awayTeamScore, isFinished: true }, gameId);
};

export const gameService = {
  create,
  finish,
};
