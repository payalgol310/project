import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.js';
import { validateReq } from '../middlewares/validator/auth.js';

const router = Router();


router.get('/login', (req, res) => {
    res.render('login', { error: null });
  });
  
  router.get('/register', (req, res) => {
    res.render('register', { error: null });
  });
  

router.post('/register', validateReq, register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
