import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AppError } from '@/utils';

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
  if (!err.code) console.log(err);
  return res.status(err.code || httpStatus.INTERNAL_SERVER_ERROR).send(err.message || 'Erro interno do servidor.');
}
