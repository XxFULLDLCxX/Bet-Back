import Joi from 'joi';
import { BetInput } from '@/utils';

export const betSchema = Joi.object<BetInput>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required(),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});
