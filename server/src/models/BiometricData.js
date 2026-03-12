import mongoose from 'mongoose';

const biometricDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    templateHash: { type: String, required: true },
    method: { type: String, enum: ['face', 'fingerprint-sim'], default: 'face' },
    verifiedAt: { type: Date }
  },
  { timestamps: true }
);

export const BiometricData = mongoose.model('BiometricData', biometricDataSchema);
