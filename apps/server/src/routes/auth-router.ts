import { me, refreshToken, register, signin } from '@/controllers/user/user-auth';
import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { Router } from 'express';
import { registerRequestSchema, signinRequestSchema, validate } from 'mp-validation';

const router = Router();

router.post('/login', validate(signinRequestSchema), signin);
router.post('/register', validate(registerRequestSchema), register);
router.post('/refresh', refreshToken);
router.get('/me', isAuthenticated, me);

export default router;
