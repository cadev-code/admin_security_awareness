import { RequestHandler, Router } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
} from '../middlewares';
import { createImage } from '../controllers';
import { imageSchema } from '../schemas';

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

export default router;
