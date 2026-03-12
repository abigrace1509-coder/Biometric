import { Candidate } from '../models/Candidate.js';

export const addCandidate = async (req, res) => {
  const { election, name, manifesto, department, avatarUrl } = req.body;
  const candidate = await Candidate.create({ election, name, manifesto, department, avatarUrl });
  res.status(201).json(candidate);
};

export const listCandidatesByElection = async (req, res) => {
  const candidates = await Candidate.find({ election: req.params.electionId }).sort({ name: 1 });
  res.json(candidates);
};
