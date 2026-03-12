import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { BiometricData } from '../models/BiometricData.js';
import { Election } from '../models/Election.js';
import { Candidate } from '../models/Candidate.js';
import { createBiometricTemplate } from '../utils/biometric.js';

dotenv.config();

const run = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    BiometricData.deleteMany({}),
    Election.deleteMany({}),
    Candidate.deleteMany({})
  ]);

  const admin = await User.create({
    name: 'System Admin',
    email: 'admin@college.edu',
    password: 'Admin@123',
    role: 'admin'
  });

  const voter = await User.create({
    name: 'Alice Voter',
    email: 'alice@college.edu',
    password: 'Voter@123',
    role: 'voter'
  });

  await BiometricData.create({
    user: voter._id,
    method: 'face',
    templateHash: createBiometricTemplate('sample-face-input')
  });

  const election = await Election.create({
    title: 'Student Club President 2026',
    description: 'Annual leadership election',
    status: 'active'
  });

  await Candidate.insertMany([
    { election: election._id, name: 'Rahul Mehta', department: 'Computer Science', manifesto: 'Transparency and innovation' },
    { election: election._id, name: 'Sneha Iyer', department: 'ECE', manifesto: 'Inclusive events and strong club culture' }
  ]);

  console.log('✅ Sample data seeded');
  console.log({ adminEmail: admin.email, voterEmail: voter.email });
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
