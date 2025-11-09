import { Router } from 'express';
import { login, refresh, logout, me } from '../controllers/auth.controller.js';
import { verifyAccess } from '../middleware/verifyAccessToken.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', verifyAccess, me);

export default router;
