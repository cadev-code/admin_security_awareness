import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { AppError } from '../utils';

export const validateQuery =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(
        new AppError(
          'Consulta inválida o incompleta',
          400,
          'INVALID_QUERY',
          `Query validation failed at ${req.method} ${req.originalUrl}: ${JSON.stringify(result.error.errors)}`,
        ),
      );
    }

    next();
  };
