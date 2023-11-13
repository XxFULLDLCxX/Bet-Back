import { Request, Response } from 'express';
import { betService } from '@/services';
import { BetInput } from '@/utils';

async function post(req: Request, res: Response) {
  const bet = req.body as BetInput;
  const result = await betService.create(bet);
  return res.status(201).send(result);
}

export const betsController = {
  post,
};
