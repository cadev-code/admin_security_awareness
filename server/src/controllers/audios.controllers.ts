import { NextFunction, Request, Response } from 'express';
import { AudioBody, audioQuery } from '../schemas';
import prisma from '../prisma_client';
import { logger, removeUploadedFiles } from '../helpers';
import { AppError } from '../utils';

export const createAudio = async (
  req: Request<object, object, AudioBody>,
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
        `Intento de creación de audio fallido - El modulo indicado no existe (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    if (
      files.length === 0 ||
      files.filter((file) => file.fieldname === 'file').length === 0
    ) {
      removeUploadedFiles(files);

      throw new AppError(
        `No se proporcionaron los archivos necesarios`,
        400,
        'FILES_MISSING',
        `Intento de creación de audio fallido - No se proporcionaron los archivos necesarios (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingTitle = await prisma.audio.findUnique({
      where: { title, idModule: Number(idModule) },
    });

    if (existingTitle) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un audio con el título ${title}`,
        400,
        'DUPLICATE_TITLE',
        `Intento de creación de audio fallido - Ya existe un audio con el título ${title} (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingExamURL = await prisma.audio.findUnique({
      where: { examUrl, idModule: Number(idModule) },
    });

    if (existingExamURL) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe un audio con la URL de examen ${examUrl}`,
        400,
        'AUDIO_EXAM_URL_EXISTS',
        `Intento de creación de audio fallido - Ya existe un audio con la URL de examen ${examUrl} (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const filename = files.find((file) => file.fieldname === 'file')?.filename;

    const newAudio = await prisma.audio.create({
      data: {
        title,
        availability: new Date(availability),
        examUrl,
        filename,
        idModule: Number(idModule),
      },
    });

    logger.info(
      `Imagen creada exitosamente - ID: ${newAudio.id} - Título: ${newAudio.title} (Creado por: ${req.user?.username || 'Unknown'})`,
    );

    res
      .status(201)
      .json({ error: null, message: 'Imagen creada exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const getAudiosByModule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { idModule } = req.query as unknown as audioQuery;

    const audios = await prisma.audio.findMany({
      where: { idModule: Number(idModule) },
    });

    res.status(200).json({ error: null, data: audios });
  } catch (error) {
    next(error);
  }
};
