import { NextFunction, Request, Response } from 'express';
import { ModuleBody } from '../schemas';
import prisma from '../prisma_client';
import { AppError } from '../utils';
import { logger, removeUploadedFiles } from '../helpers';

export const createModule = async (
  req: Request<object, object, ModuleBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, type, url, bgColor } = req.body;

    const files = Object.values(req.files || {}).map((file) => ({
      fieldname: file[0].fieldname,
      filename: file[0].filename,
      path: file[0].path,
    }));

    const bgImage = files.find(
      (file) => file.fieldname === 'bgImage',
    )?.filename;

    const logo = files.find((file) => file.fieldname === 'logo')?.filename;

    const existingTitle = await prisma.module.findUnique({
      where: { title },
    });

    if (existingTitle) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un modulo con el título ${title}`,
        400,
        'MODULE_TITLE_EXISTS',
        `Intento de creación de módulo fallido - El titulo '${title}' ya esta en uso (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingUrl = await prisma.module.findUnique({
      where: { url },
    });

    if (existingUrl) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un modulo con el título ${title}`,
        400,
        'MODULE_TITLE_EXISTS',
        `Intento de creación de módulo fallido - El titulo '${title}' ya esta en uso (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const newModule = await prisma.module.create({
      data: {
        title,
        type,
        url,
        bgColor,
        bgImage,
        logo,
      },
    });

    logger.info(
      `Módulo creado exitosamente: ID ${newModule.id} - Título: ${newModule.title} (Creado por: ${req.user?.username || 'Unknown'})`,
    );

    res
      .status(201)
      .json({ error: null, message: 'Modulo creado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const getModules = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({ error: null, data: modules });
  } catch (error) {
    next(error);
  }
};
