import { NextFunction, Request, Response } from 'express';
import { VideoBody } from '../schemas';
import { logger, removeUploadedFiles } from '../helpers';
import { AppError } from '../utils';
import prisma from '../prisma_client';

export const createVideo = async (
  req: Request<object, object, VideoBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, availability, examUrl, idModule } = req.body;

    const files = Object.values(req.files || {}).map((file) => ({
      fieldname: file[0].fieldname,
      filename: file[0].filename,
      path: file[0].path,
    }));

    const existingModule = await prisma.module.findUnique({
      where: { id: idModule },
    });

    if (!existingModule) {
      removeUploadedFiles(files);

      throw new AppError(
        `El modulo indicado no existe`,
        400,
        'NON_EXISTENT_MODULE',
        `Intento de creación de video fallido - El modulo indicado no existe (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    if (
      files.length === 0 ||
      files.filter((file) => file.fieldname === 'cover').length === 0 ||
      files.filter((file) => file.fieldname === 'file').length === 0
    ) {
      removeUploadedFiles(files);

      throw new AppError(
        `No se proporcionaron los archivos necesarios`,
        400,
        'FILES_MISSING',
        `Intento de creación de video fallido - No se proporcionaron los archivos necesarios (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingTitle = await prisma.video.findUnique({
      where: { title, idModule: Number(idModule) },
    });

    if (existingTitle) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un video con el título ${title}`,
        400,
        'VIDEO_TITLE_EXISTS',
        `Intento de creación de módulo fallido - El titulo '${title}' ya esta en uso (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingExamURL = await prisma.video.findUnique({
      where: { examUrl, idModule: Number(idModule) },
    });

    if (existingExamURL) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un video con la URL de examen ${examUrl}`,
        400,
        'VIDEO_EXAM_URL_EXISTS',
        `Intento de creación de módulo fallido - La URL de examen '${examUrl}' ya esta en uso (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const filename = files.find((file) => file.fieldname === 'file')?.filename;

    const cover = files.find((file) => file.fieldname === 'cover')?.filename;

    const newVideo = await prisma.video.create({
      data: {
        title,
        availability: new Date(availability),
        examUrl,
        filename,
        cover,
        idModule: Number(idModule),
      },
    });

    logger.info(
      `Video creado exitosamente: ID ${newVideo.id} - Título: ${newVideo.title} (Creado por: ${req.user?.username || 'Unknown'})`,
    );

    res.status(201).json({ error: null, message: 'Video creado exitosamente' });
  } catch (error) {
    next(error);
  }
};
