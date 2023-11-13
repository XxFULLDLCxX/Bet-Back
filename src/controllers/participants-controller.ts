import { Request, Response } from 'express';
import { participantService } from '@/services';
import { ParticipantInput } from '@/utils';

async function post(req: Request, res: Response) {
  const participant = req.body as ParticipantInput;
  const { id, createdAt, updatedAt, name, balance } = await participantService.create(participant);
  return res.status(201).send({ id, createdAt, updatedAt, name, balance });
}

async function get(_req: Request, res: Response) {
  const result = await participantService.read();
  return res.send(result);
}

export const participantController = {
  post,
  get,
};
