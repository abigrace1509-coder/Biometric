import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true, index: true },
    name: { type: String, required: true, trim: true },
    manifesto: { type: String, default: '' },
    department: { type: String, default: '' },
    avatarUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

candidateSchema.index({ election: 1, name: 1 }, { unique: true });

export const Candidate = mongoose.model('Candidate', candidateSchema);
