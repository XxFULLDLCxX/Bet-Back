import Joi from 'joi';
import { GameFinishInput, GameStartInput } from '@/utils';

export const start = Joi.object<GameStartInput>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finish = Joi.object<GameFinishInput>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});

export const gameSchema = {
  start,
  finish,
};
