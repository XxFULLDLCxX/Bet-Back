import httpStatus from 'http-status';
import { AppError } from './protocols';

export const setError = (code: number): AppError => ({ ...ERRORS[code], code });

const ERRORS = {
  [httpStatus.CONFLICT]: { message: 'Conflito de dados.' },
  [httpStatus.NOT_FOUND]: { message: 'Recurso não encontrado.' },
  [httpStatus.BAD_REQUEST]: { message: 'Solicitação inválida.' },
  [httpStatus.UNPROCESSABLE_ENTITY]: { message: 'Entidade não processável.' },
  [httpStatus.INTERNAL_SERVER_ERROR]: { message: 'Erro interno do servidor.' },
};
