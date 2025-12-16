import { RequestHandler, Router } from 'express';
import {
  authMiddleware,
  uploadMiddleware,
  validateInput,
  validateQuery,
} from '../middlewares';
import { audioQuerySchema, audioSchema } from '../schemas';
import { createAudio, getAudiosByModule } from '../controllers';

const router = Router();

router.post(
  '/audios',
  authMiddleware,
  uploadMiddleware({
    fields: [{ name: 'file', maxCount: 1 }],
    allowedMimeTypesByField: {
      file: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    },
  }) as RequestHandler,
  validateInput(audioSchema),
  createAudio,
);

router.get(
  '/audios',
  authMiddleware,
  validateQuery(audioQuerySchema),
  getAudiosByModule,
);

export default router;
