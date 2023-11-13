import { Request, Response } from 'express';
import { gameService } from '@/services';
import { GameFinishInput, GameStartInput } from '@/utils';

async function postStart(req: Request, res: Response) {
  const game = req.body as GameStartInput;
  const result = await gameService.start(game);
  return res.status(201).send(result);
}

async function postFinish(req: Request, res: Response) {
  const game = req.body as GameFinishInput;
  const result = await gameService.finish(game, Number(req.params.id));
  return res.status(201).send(result);
}

async function getGames(_req: Request, res: Response) {
  const result = await gameService.read();
  return res.send(result);
}

async function getGameAndBets(req: Request, res: Response) {
  const result = await gameService.readGameAndBets(Number(req.params.id));
  return res.send(result);
}

export const gamesController = {
  postStart,
  postFinish,
  getGames,
  getGameAndBets,
};
