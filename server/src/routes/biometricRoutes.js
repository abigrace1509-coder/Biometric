import { Router } from 'express';
import { enrollBiometric, verifyBiometric } from '../controllers/biometricController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/enroll', protect, authorize('voter'), enrollBiometric);
router.post('/verify', protect, authorize('voter'), verifyBiometric);

export default router;
