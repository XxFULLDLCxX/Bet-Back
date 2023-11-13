import httpStatus from 'http-status';
import { ParticipantInput, setError } from '@/utils';
import { participantsRepository } from '@/repositories';

const create = ({ name, balance }: ParticipantInput) => {
  balance = Number(balance);
  if (Number(balance) < 1000)
    throw setError(httpStatus.BAD_REQUEST, 'O saldo inicial deve ser maior ou igual a R$ 10,00');
  return participantsRepository.create({
    name,
    balance,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const participantService = {
  create,
};
