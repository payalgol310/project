import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.js';
import { validateReq } from '../middlewares/validator/auth.js';

const router = Router();

router.post('/register', validateReq, register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
