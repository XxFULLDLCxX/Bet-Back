import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';
import { setError } from '@/utils';

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const messages = validation.error.details.reduce((message, detail) => message + detail.message + '\n ', '');
      console.log(validation.error);
      throw setError(httpStatus.UNPROCESSABLE_ENTITY, messages);
    }

    res.locals = validation.value;

    next();
  };
}
