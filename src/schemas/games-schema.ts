import Joi from 'joi';
import { GameInput } from '@/utils';

export const gameSchema = Joi.object<GameInput>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
