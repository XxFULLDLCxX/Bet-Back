import Joi from 'joi';
import { ParticipantInput } from '@/utils';

export const participantSchema = Joi.object<ParticipantInput>({
  name: Joi.string().required(),
  balance: Joi.number().required(),
});
