import { Request, Response, Router } from 'express';
import { login } from '../controllers';
import { authMiddleware, validateInput } from '../middlewares';
import { loginSchema } from '../schemas';

const router = Router();

router.post('/auth/login', validateInput(loginSchema), login);

router.get('/auth/me', authMiddleware, (req: Request, res: Response) => {
  res.json({
    ...req.user,
  });
});

export default router;
