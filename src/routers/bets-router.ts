import { Router } from 'express';
import { betsController } from '@/controllers';
import { betSchema } from '@/schemas';
import { validateBody } from '@/middlewares';

export const betsRouter = Router();
betsRouter.post('/', validateBody(betSchema), betsController.post);
