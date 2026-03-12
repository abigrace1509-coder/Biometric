import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { fileToBase64 } from '../utils/file';

const BiometricVerificationPage = () => {
  const [biometricInput, setBiometricInput] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const verify = async (e) => {
    e.preventDefault();
    try {
      await api.post('/biometric/verify', { biometricInput });
      setMessage('Biometric verification successful');
      setTimeout(() => navigate('/voter/vote'), 600);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 550 }}>
      <h2>Biometric Verification</h2>
      <form className="card card-body" onSubmit={verify}>
        <label className="form-label">Upload live face image</label>
        <input
          className="form-control mb-3"
          type="file"
          accept="image/*"
          onChange={async (e) => setBiometricInput(await fileToBase64(e.target.files?.[0]))}
          required
        />
        <button className="btn btn-warning">Verify</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default BiometricVerificationPage;
