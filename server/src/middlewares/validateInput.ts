import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { AppError } from '../utils';
import fs from 'fs';

export const validateInput =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const files = Object.values(
        (req.files as { [field: string]: Express.Multer.File[] }) || {},
      );

      if (files && files.length > 0) {
        files.forEach((file) => {
          fs.unlink(file[0].path, (err) => {
            if (err) throw err;
          });
        });
      }

      return next(
        new AppError(
          'Datos inválidos o incompletos',
          400,
          'INVALID_INPUT',
          `Validation failed at ${req.method} ${req.originalUrl}: ${JSON.stringify(result.error.errors)}`,
        ),
      );
    }

    req.body = result.data;
    next();
  };
