import { NextFunction, Request, Response } from 'express';
import { LoginBody } from '../schemas';
import prisma from '../prisma_client';
import { AppError } from '../utils';
import { logger, verifyPassword } from '../helpers';
import jwt from 'jsonwebtoken';

export const login = async (
  req: Request<object, object, LoginBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AppError(
        'Credenciales inválidas',
        404,
        'USER_NOT_FOUND',
        `Intento de autenticación fallido - El nombre de usuario '${username}' no existe`,
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError(
        'Credenciales inválidas',
        401,
        'INVALID_CREDENTIALS',
        `Intento de autenticación fallido - Contraseña incorrecta para el usuario '${username}'`,
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET || 'default_secret',
      {
        expiresIn: '1h', // 1 hora
      },
    );

    logger.info(`Usuario autenticado exitosamente - User: ${username}`);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60, // 1 hora
      })
      .json({
        id: user.id,
        username: user.username,
      });
  } catch (error) {
    next(error);
  }
};
