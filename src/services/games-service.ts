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

  const win_participant_balance = bets.reduce((m, { amountBet, ...bet }) => {
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      return m + amountBet;
    }
    return m;
  }, 0);

  const total_balance = bets.reduce((m, { Participant: { balance } }) => {
    return m + balance;
  }, 0);

  for (let i = 0; i < bets.length; i++) {
    const { Participant: p, ...bet } = bets[i];
    let balance = 0;
    if (homeTeamScore === bet.homeTeamScore && awayTeamScore === bet.awayTeamScore) {
      balance = (bet.amountBet / win_participant_balance) * total_balance * (1 - 0.3);
      await betsRepository.updateById({ status: 'WON', amountWon: balance }, bet.id);
      await participantsRepository.updateById({ balance: p.balance + balance }, p.id);
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
