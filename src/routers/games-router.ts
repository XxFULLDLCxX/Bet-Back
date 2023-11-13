import { Router } from 'express';
import { gamesController } from '@/controllers';
import { gameSchema } from '@/schemas';
import { validateBody } from '@/middlewares';

export const gamesRouter = Router();
gamesRouter.post('/', validateBody(gameSchema), gamesController.post);
