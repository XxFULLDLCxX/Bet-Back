import { Request, Response } from 'express';
import { participantService } from '@/services';
import { ParticipantInput } from '@/utils';

export async function post(req: Request, res: Response) {
  console.log('test');

  const participant = req.body as ParticipantInput;
  const result = await participantService.create(participant);
  return res.status(201).send(result);
}

export const participantController = {
  post,
};
