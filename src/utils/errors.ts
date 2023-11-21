import httpStatus from 'http-status';
import { AppError, ErrorCodes } from './protocols';

export const setError = (code: number, message?: string): AppError => ({
  code,
  message: message || ERRORS[code].message,
});

const ERRORS: ErrorCodes = {
  [httpStatus.NOT_FOUND]: { message: 'Não encontrado.' },
  [httpStatus.CONFLICT]: { message: 'Conflito de dados.' },
  [httpStatus.BAD_REQUEST]: { message: 'Solicitação inválida.' },
  [httpStatus.UNPROCESSABLE_ENTITY]: { message: 'Entidade não processável.' },
  [httpStatus.INTERNAL_SERVER_ERROR]: { message: 'Erro interno do servidor.' },
};
