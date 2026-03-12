import { BiometricData } from '../models/BiometricData.js';
import { compareBiometricTemplate, createBiometricTemplate } from '../utils/biometric.js';

export const enrollBiometric = async (req, res) => {
  const { biometricInput, method = 'face' } = req.body;
  const templateHash = createBiometricTemplate(biometricInput);

  await BiometricData.findOneAndUpdate(
    { user: req.user._id },
    { templateHash, method },
    { upsert: true, new: true }
  );

  res.json({ message: 'Biometric enrolled successfully' });
};

export const verifyBiometric = async (req, res) => {
  const { biometricInput } = req.body;
  const data = await BiometricData.findOne({ user: req.user._id });
  if (!data) return res.status(404).json({ message: 'No biometric found for user' });

  const isMatch = compareBiometricTemplate(biometricInput, data.templateHash);
  if (!isMatch) return res.status(401).json({ message: 'Biometric mismatch' });

  data.verifiedAt = new Date();
  await data.save();

  res.json({ message: 'Biometric verification successful', verifiedAt: data.verifiedAt });
};
