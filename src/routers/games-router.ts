import { Router } from 'express';
import { gamesController } from '@/controllers';
import { gameSchema } from '@/schemas';
import { validateBody } from '@/middlewares';

export const gamesRouter = Router();
gamesRouter
  .post('/', validateBody(gameSchema.start), gamesController.postStart)
  .post('/:id/finish', validateBody(gameSchema.finish), gamesController.postFinish)
  .get('/:id', gamesController.getGameAndBets)
  .get('/', gamesController.getGames);
