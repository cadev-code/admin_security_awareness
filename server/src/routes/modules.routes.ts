import { Router, RequestHandler } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
  validateParam,
} from '../middlewares';
import { createModule, getModules, updateModule } from '../controllers';
import {
  moduleParamSchema,
  moduleAddSchema,
  moduleEditSchema,
} from '../schemas';

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
  validateInput(moduleAddSchema),
  createModule,
);

router.get('/modules', authMiddleware, getModules);

router.put(
  '/modules/:id',
  authMiddleware,
  validateParam(moduleParamSchema),
  validateInput(moduleEditSchema),
  updateModule,
);

export default router;
