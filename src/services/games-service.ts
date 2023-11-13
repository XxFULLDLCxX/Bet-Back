import httpStatus from 'http-status';
import { GameFinishInput, GameStartInput, setError } from '@/utils';
import { betsRepository, gamesRepository, participantsRepository } from '@/repositories';

const start = ({ homeTeamName, awayTeamName }: GameStartInput) => {
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
  if (!game) throw setError(httpStatus.NOT_FOUND, 'O id fornecido não corresponde a um jogo válido.');

  const bets = await betsRepository.findManyByGameIdIncludeParticipant(gameId);

  const winAmountBet = bets.reduce((m, { amountBet, ...bet }) => {
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      return m + amountBet;
    }
    return m;
  }, 0);

  const totalAmountBet = bets.reduce((m, { amountBet }) => {
    return m + amountBet;
  }, 0);

  for (let i = 0; i < bets.length; i++) {
    const { Participant: p, ...bet } = bets[i];
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      const winnings = (bet.amountBet / winAmountBet) * totalAmountBet * (1 - 0.3);
      await betsRepository.updateById({ status: 'WON', amountWon: winnings }, bet.id);
      await participantsRepository.updateById({ balance: p.balance + winnings }, p.id);
    } else {
      await betsRepository.updateById({ status: 'LOST', amountWon: 0 }, bet.id);
    }
  }

  return gamesRepository.updateById({ homeTeamScore, awayTeamScore, isFinished: true }, gameId);
};

const read = () => {
  return gamesRepository.findMany();
};

const readGameAndBets = async (id: number) => {
  if (isNaN(id)) throw setError(httpStatus.UNPROCESSABLE_ENTITY, 'id não é válido');
  const result = await gamesRepository.findByIdIncludeBet(id);
  if (!result) throw setError(httpStatus.NOT_FOUND);
  const { Bet, ...game } = result;
  return { ...game, bets: Bet };
};

export const gameService = {
  readGameAndBets,
  read,
  start,
  finish,
};
