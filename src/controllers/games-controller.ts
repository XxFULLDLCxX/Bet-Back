import { Request, Response } from 'express';
import { gameService } from '@/services';
import { GameInput } from '@/utils';

async function post(req: Request, res: Response) {
  const game = req.body as GameInput;
  const { id, createdAt, updatedAt, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, isFinished } =
    await gameService.create(game);
  return res.status(201).send({
    id,
    createdAt,
    updatedAt,
    homeTeamName,
    awayTeamName,
    homeTeamScore,
    awayTeamScore,
    isFinished,
  });
}

export const gamesController = {
  post,
};
