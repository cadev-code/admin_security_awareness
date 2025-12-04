import { Router, RequestHandler } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
} from '../middlewares';
import { createModule } from '../controllers';
import { moduleSchema } from '../schemas';

const router = Router();

router.post(
  '/modules',
  authMiddleware,
  uploadMiddleware({
    fields: [
      { name: 'bgImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ],
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  }) as RequestHandler,
  validateInput(moduleSchema),
  createModule,
);

export default router;
