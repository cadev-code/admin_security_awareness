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

// allowedMimeTypes por fieldname
type PerFieldMimeTypes = Record<string, string[]>;

const createFileFilter =
  (allowedMimeTypesByField: PerFieldMimeTypes): multer.Options['fileFilter'] =>
  (_req, file, cb) => {
    const allowedForField = allowedMimeTypesByField[file.fieldname];

    if (allowedForField.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(
      new AppError(
        `Solo se permiten archivos en formato ${JSON.stringify(allowedForField)} para el campo "${file.fieldname}"`,
        400,
        'FILE_FORMAT_INVALID',
        `Formato de archivo no permitido: ${file.mimetype} en campo ${file.fieldname} - Intentado por '${_req.user?.username}'`,
      ),
    );
  };

// Factory genérica de upload
export const uploadMiddleware = (options: {
  fields?: multer.Field[];
  allowedMimeTypesByField: PerFieldMimeTypes;
}) => {
  const { fields, allowedMimeTypesByField } = options;

  const upload = multer({
    storage,
    fileFilter: createFileFilter(allowedMimeTypesByField),
  });

  if (fields) {
    return upload.fields(fields);
  }
  return upload;
};
