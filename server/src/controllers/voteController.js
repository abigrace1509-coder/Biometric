import { Candidate } from '../models/Candidate.js';
import { Election } from '../models/Election.js';
import { BiometricData } from '../models/BiometricData.js';
import { Vote } from '../models/Vote.js';

export const castVote = async (req, res) => {
  const { candidateId } = req.body;
  const activeElection = await Election.findOne({ status: 'active' });
  if (!activeElection) return res.status(400).json({ message: 'No active election' });

  const existingVote = await Vote.findOne({ election: activeElection._id, voter: req.user._id });
  if (existingVote) return res.status(400).json({ message: 'You have already voted in this election' });

  const biometric = await BiometricData.findOne({ user: req.user._id });
  if (!biometric?.verifiedAt || Date.now() - biometric.verifiedAt.getTime() > 5 * 60 * 1000) {
    return res.status(401).json({ message: 'Biometric verification required before voting' });
  }

  const candidate = await Candidate.findOne({ _id: candidateId, election: activeElection._id });
  if (!candidate) return res.status(404).json({ message: 'Candidate not found in active election' });

  const vote = await Vote.create({
    election: activeElection._id,
    candidate: candidate._id,
    voter: req.user._id
  });

  res.status(201).json({ message: 'Vote cast successfully', voteId: vote._id });
};

export const getMyVoteStatus = async (req, res) => {
  const activeElection = await Election.findOne({ status: 'active' });
  if (!activeElection) return res.json({ hasVoted: false, election: null });

  const vote = await Vote.findOne({ election: activeElection._id, voter: req.user._id });
  res.json({ hasVoted: Boolean(vote), election: activeElection });
};
