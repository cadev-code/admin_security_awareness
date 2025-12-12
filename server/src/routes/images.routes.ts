import { RequestHandler, Router } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
  validateQuery,
} from '../middlewares';
import { createImage, getImagesByModule } from '../controllers';
import { imageQuerySchema, imageSchema } from '../schemas';

const router = Router();

router.post(
  '/images',
  authMiddleware,
  uploadMiddleware({
    fields: [
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ],
    allowedMimeTypesByField: {
      file: ['image/jpeg', 'image/png', 'image/webp'],
      cover: ['image/jpeg', 'image/png', 'image/webp'],
    },
  }) as RequestHandler,
  validateInput(imageSchema),
  createImage,
);

router.get(
  '/images',
  authMiddleware,
  validateQuery(imageQuerySchema),
  getImagesByModule,
);

export default router;
