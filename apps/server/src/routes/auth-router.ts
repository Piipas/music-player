import { refreshToken, register, signin } from '@/controllers/user/user-auth';
import { Router } from 'express';

const router = Router();

router.post('/login', signin);
router.post('/register', register);
router.post('/refresh', refreshToken);

export default router;
