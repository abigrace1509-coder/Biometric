import { Election } from '../models/Election.js';
import { AuditLog } from '../models/AuditLog.js';

export const createElection = async (req, res) => {
  const { title, description, startsAt, endsAt } = req.body;
  const election = await Election.create({ title, description, startsAt, endsAt });
  await AuditLog.create({ actor: req.user._id, action: 'CREATE_ELECTION', metadata: { electionId: election._id } });
  res.status(201).json(election);
};

export const listElections = async (req, res) => {
  const elections = await Election.find().sort({ createdAt: -1 });
  res.json(elections);
};

export const activateElection = async (req, res) => {
  const { id } = req.params;
  await Election.updateMany({ status: 'active' }, { status: 'closed' });
  const election = await Election.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  if (!election) return res.status(404).json({ message: 'Election not found' });
  await AuditLog.create({ actor: req.user._id, action: 'ACTIVATE_ELECTION', metadata: { electionId: election._id } });
  res.json(election);
};

export const closeElection = async (req, res) => {
  const election = await Election.findByIdAndUpdate(req.params.id, { status: 'closed' }, { new: true });
  if (!election) return res.status(404).json({ message: 'Election not found' });
  await AuditLog.create({ actor: req.user._id, action: 'CLOSE_ELECTION', metadata: { electionId: election._id } });
  res.json(election);
};
