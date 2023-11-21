import httpStatus from 'http-status';
import { BetInput, GameFinishInput, GameStartInput, setError } from '@/utils';
import { betsRepository, gamesRepository } from '@/repositories';

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
  if (game.isFinished) throw setError(httpStatus.CONFLICT, 'O jogo já foi finalizado!');

  const isWinBet = (b: Partial<BetInput>) => homeTeamScore === b.homeTeamScore && awayTeamScore === b.awayTeamScore;
  const bets = await betsRepository.findManyByGameIdIncludeParticipant(gameId);
  const winAmountBet = bets.reduce((m, { amountBet, ...bet }) => m + (isWinBet(bet) ? amountBet : 0), 0);
  const totalAmountBet = bets.reduce((m, { amountBet }) => m + amountBet, 0);

  const updatingBets = bets.map((bet) => {
    const amountWon = isWinBet(bet) ? (bet.amountBet / winAmountBet) * totalAmountBet * (1 - 0.3) : 0;
    return betsRepository.updateById({ status: isWinBet(bet) ? 'WON' : 'LOST', amountWon }, bet.id);
  });

  await betsRepository.executeActions(...updatingBets);
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
