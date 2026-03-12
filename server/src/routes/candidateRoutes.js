import { Router } from 'express';
import { addCandidate, listCandidatesByElection } from '../controllers/candidateController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/election/:electionId', protect, listCandidatesByElection);
router.post('/', protect, authorize('admin'), addCandidate);

export default router;
