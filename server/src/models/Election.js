import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'active', 'closed'], default: 'draft', index: true },
    startsAt: { type: Date },
    endsAt: { type: Date }
  },
  { timestamps: true }
);

export const Election = mongoose.model('Election', electionSchema);
