import { Router } from 'express';
import { liveResults } from '../controllers/resultController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/live', protect, authorize('admin'), liveResults);

export default router;
