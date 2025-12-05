import { Router, RequestHandler } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
} from '../middlewares';
import { createModule, getModules } from '../controllers';
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
    allowedMimeTypesByField: {
      bgImage: ['image/jpeg', 'image/png', 'image/webp'],
      logo: ['image/jpeg', 'image/png', 'image/webp'],
    },
  }) as RequestHandler,
  validateInput(moduleSchema),
  createModule,
);

router.get('/modules', authMiddleware, getModules);

export default router;
