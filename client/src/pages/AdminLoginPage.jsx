import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      if (data.user.role !== 'admin') throw new Error('Not an admin account');
      login(data);
      navigate('/admin/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 450 }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit} className="card card-body">
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-dark">Login</button>
      </form>
      {message && <p className="text-danger mt-2">{message}</p>}
    </div>
  );
};

export default AdminLoginPage;
