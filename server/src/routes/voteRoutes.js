import { Router } from 'express';
import { castVote, getMyVoteStatus } from '../controllers/voteController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/status', protect, authorize('voter'), getMyVoteStatus);
router.post('/', protect, authorize('voter'), castVote);

export default router;
