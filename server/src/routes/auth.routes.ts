import { Router } from 'express';
import { login } from '../controllers';
import { validateInput } from '../middlewares';
import { loginSchema } from '../schemas';

const router = Router();

router.post('/auth/login', validateInput(loginSchema), login);

export default router;
