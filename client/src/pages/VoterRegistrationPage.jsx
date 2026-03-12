import { useState } from 'react';
import api from '../services/api';
import { fileToBase64 } from '../utils/file';

const VoterRegistrationPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [biometricInput, setBiometricInput] = useState('');
  const [message, setMessage] = useState('');

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBiometricInput(await fileToBase64(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register-voter', { ...form, biometricInput });
      setMessage('Registration successful. Please login.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 550 }}>
      <h2>Voter Registration</h2>
      <form className="card card-body" onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <label className="form-label">Upload Face Image</label>
        <input className="form-control mb-3" type="file" accept="image/*" onChange={onFileChange} required />
        <button className="btn btn-primary">Register</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default VoterRegistrationPage;
