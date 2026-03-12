import { Router } from 'express';
import { login, registerVoter } from '../controllers/authController.js';

const router = Router();

router.post('/register-voter', registerVoter);
router.post('/login', login);

export default router;
