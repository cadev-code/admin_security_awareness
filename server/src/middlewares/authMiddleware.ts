import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';
import jwt from 'jsonwebtoken';
import { User } from '../types';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.access_token;

  if (!token) {
    throw new AppError(
      'Usuario no autenticado',
      401,
      'UNAUTHORIZED',
      'Intento de acción sin token de autenticación',
    );
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret',
    ) as User;

    req.user = {
      id: payload.id,
      username: payload.username,
    };

    next();
  } catch {
    throw new AppError(
      'Token inválido o expirado',
      401,
      'UNAUTHORIZED',
      'Intento de acción con token inválido o expirado',
    );
  }
};
