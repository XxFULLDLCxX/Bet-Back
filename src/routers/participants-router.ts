import { Router } from 'express';
import { participantController } from '@/controllers';
import { participantSchema } from '@/schemas';
import { validateBody } from '@/middlewares';

export const participantsRouter = Router();
participantsRouter.post('/', validateBody(participantSchema), participantController.post);
