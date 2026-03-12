import { Router } from 'express';
import { activateElection, closeElection, createElection, listElections } from '../controllers/electionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, listElections);
router.post('/', protect, authorize('admin'), createElection);
router.patch('/:id/activate', protect, authorize('admin'), activateElection);
router.patch('/:id/close', protect, authorize('admin'), closeElection);

export default router;
