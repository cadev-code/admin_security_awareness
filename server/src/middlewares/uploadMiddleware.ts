import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { AppError } from '../utils';

// Ruta del directorio de subidas
const uploadsDir = path.join(__dirname, '../../uploads');

// Crear el directorio una sola vez al cargar el servidor
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${sanitizedOriginalName}`);
  },
});

// Función genérica para crear filtros de tipos de archivo
const createFileFilter =
  (allowedMimeTypes: string[]): multer.Options['fileFilter'] =>
  (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Solo se permiten archivos en formato ${JSON.stringify(allowedMimeTypes)}`,
          400,
          'FILE_FORMAT_INVALID',
          `Formato de archivo no permitido: ${file.mimetype}`,
        ),
      );
    }
  };

// Factory genérica de upload
export const uploadMiddleware = (options: {
  fields?: multer.Field[];
  allowedMimeTypes: string[];
}) => {
  const { fields, allowedMimeTypes } = options;

  const upload = multer({
    storage,
    fileFilter: createFileFilter(allowedMimeTypes),
  });

  if (fields) {
    return upload.fields(fields);
  }
  return upload;
};
