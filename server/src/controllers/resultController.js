import { Candidate } from '../models/Candidate.js';
import { Election } from '../models/Election.js';
import { Vote } from '../models/Vote.js';

export const liveResults = async (req, res) => {
  const activeOrClosed = await Election.findOne({ status: { $in: ['active', 'closed'] } }).sort({ updatedAt: -1 });
  if (!activeOrClosed) return res.status(404).json({ message: 'No election found' });

  const candidates = await Candidate.find({ election: activeOrClosed._id });
  const voteCounts = await Vote.aggregate([
    { $match: { election: activeOrClosed._id } },
    { $group: { _id: '$candidate', count: { $sum: 1 } } }
  ]);

  const mapped = candidates.map((candidate) => ({
    candidateId: candidate._id,
    name: candidate.name,
    department: candidate.department,
    votes: voteCounts.find((v) => String(v._id) === String(candidate._id))?.count || 0
  }));

  const winner = mapped.reduce((max, current) => (current.votes > (max?.votes || -1) ? current : max), null);

  res.json({ election: activeOrClosed, results: mapped, winner });
};
