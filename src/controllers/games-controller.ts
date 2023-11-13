import { Request, Response } from 'express';
import { gameService } from '@/services';
import { GameFinishInput, GameStartInput } from '@/utils';

async function postStart(req: Request, res: Response) {
  const game = req.body as GameStartInput;
  const result = await gameService.create(game);
  return res.status(201).send(result);
}

async function postFinish(req: Request, res: Response) {
  const game = req.body as GameFinishInput;
  const result = await gameService.finish(game, Number(req.params.id));
  return res.status(201).send(result);
}

export const gamesController = {
  postStart,
  postFinish,
};
