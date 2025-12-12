import { NextFunction, Request, Response } from 'express';
import { ImageBody } from '../schemas';
import prisma from '../prisma_client';
import { logger, removeUploadedFiles } from '../helpers';
import { AppError } from '../utils';

export const createImage = async (
  req: Request<object, object, ImageBody>,
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
        `Intento de creación de imagen fallido - El modulo indicado no existe (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    if (
      files.length === 0 ||
      files.filter((file) => file.fieldname === 'file').length === 0 ||
      files.filter((file) => file.fieldname === 'cover').length === 0
    ) {
      removeUploadedFiles(files);

      throw new AppError(
        `No se proporcionaron los archivos necesarios`,
        400,
        'FILES_MISSING',
        `Intento de creación de imagen fallido - No se proporcionaron los archivos necesarios (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingTitle = await prisma.image.findUnique({
      where: { title, idModule: Number(idModule) },
    });

    if (existingTitle) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe una imagen con el título ${title}`,
        400,
        'DUPLICATE_TITLE',
        `Intento de creación de imagen fallido - Ya existe una imagen con el título ${title} (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const existingExamURL = await prisma.image.findUnique({
      where: { examUrl, idModule: Number(idModule) },
    });

    if (existingExamURL) {
      removeUploadedFiles(files);

      throw new AppError(
        `Ya existe una imagen con la URL de examen ${examUrl}`,
        400,
        'IMAGE_EXAM_URL_EXISTS',
        `Intento de creación de imagen fallido - Ya existe una imagen con la URL de examen ${examUrl} (Intentado por: ${req.user?.username || 'Unknown'})`,
      );
    }

    const filename = files.find((file) => file.fieldname === 'file')?.filename;

    const cover = files.find((file) => file.fieldname === 'cover')?.filename;

    const newImage = await prisma.image.create({
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
      `Imagen creada exitosamente - ID: ${newImage.id} - Título: ${newImage.title} (Creado por: ${req.user?.username || 'Unknown'})`,
    );

    res
      .status(201)
      .json({ error: null, message: 'Imagen creada exitosamente' });
  } catch (error) {
    next(error);
  }
};
