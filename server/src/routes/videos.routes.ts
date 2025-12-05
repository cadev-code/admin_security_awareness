import { RequestHandler, Router } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
} from '../middlewares';
import { createVideo } from '../controllers';
import { videoSchema } from '../schemas';

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

export default router;
