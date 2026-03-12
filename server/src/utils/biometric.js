import crypto from 'crypto';

export const createBiometricTemplate = (rawInput) => {
  if (!rawInput || typeof rawInput !== 'string') {
    throw new Error('Biometric input is required');
  }

  return crypto.createHash('sha256').update(rawInput.trim()).digest('hex');
};

export const compareBiometricTemplate = (input, storedTemplate) => {
  const incomingTemplate = createBiometricTemplate(input);
  return incomingTemplate === storedTemplate;
};
