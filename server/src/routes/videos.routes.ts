import { RequestHandler, Router } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
  validateQuery,
} from '../middlewares';
import { createVideo, getVideosByModule } from '../controllers';
import { videoQuerySchema, videoSchema } from '../schemas';

const router = Router();

router.post(
  '/videos',
  authMiddleware,
  uploadMiddleware({
    fields: [
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ],
    allowedMimeTypesByField: {
      file: ['video/mp4', 'video/webm'],
      cover: ['image/jpeg', 'image/png', 'image/webp'],
    },
  }) as RequestHandler,
  validateInput(videoSchema),
  createVideo,
);

router.get(
  '/videos',
  authMiddleware,
  validateQuery(videoQuerySchema),
  getVideosByModule,
);

export default router;
