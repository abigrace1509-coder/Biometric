import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const VoterLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== 'voter') throw new Error('Not a voter account');
      login(data);
      navigate('/voter/verify');
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 450 }}>
      <h2>Voter Login</h2>
      <form className="card card-body" onSubmit={onSubmit}>
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary">Login</button>
      </form>
      {message && <p className="text-danger mt-2">{message}</p>}
    </div>
  );
};

export default VoterLoginPage;
