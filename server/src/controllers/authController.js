import { User } from '../models/User.js';
import { BiometricData } from '../models/BiometricData.js';
import { createBiometricTemplate } from '../utils/biometric.js';
import { signToken } from '../utils/jwt.js';

export const registerVoter = async (req, res) => {
  const { name, email, password, biometricInput } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password, role: 'voter' });

  if (biometricInput) {
    await BiometricData.create({
      user: user._id,
      templateHash: createBiometricTemplate(biometricInput),
      method: 'face'
    });
  }

  res.status(201).json({ message: 'Voter registered successfully' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user._id, role: user.role });
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};
