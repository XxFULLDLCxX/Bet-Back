import Joi from 'joi';
import { BetInput } from '@/utils';

export const betSchema = Joi.object<BetInput>({
  homeTeamScore: Joi.number().greater(0).required(),
  awayTeamScore: Joi.number().greater(0).required(),
  amountBet: Joi.number().greater(0).required(),
  gameId: Joi.number().greater(0).required(),
  participantId: Joi.number().greater(0).required(),
});
