import httpStatus from 'http-status';
import xss from 'xss';
import { ParticipantInput, setError } from '@/utils';
import { participantsRepository } from '@/repositories';

const MIN_INITIAL_BALANCE = 1000;

const create = ({ name, balance }: ParticipantInput) => {
  balance = Number(balance);
  if (Number(balance) < MIN_INITIAL_BALANCE)
    throw setError(httpStatus.BAD_REQUEST, 'O saldo inicial deve ser maior ou igual a R$ 10,00');
  return participantsRepository.create({
    name: xss(name),
    balance,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const read = () => {
  return participantsRepository.findMany();
};

export const participantService = {
  create,
  read,
};
