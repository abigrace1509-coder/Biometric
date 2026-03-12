import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [elections, setElections] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const load = async () => {
    const { data } = await api.get('/elections');
    setElections(data);
  };

  useEffect(() => {
    load();
  }, []);

  const createElection = async (e) => {
    e.preventDefault();
    await api.post('/elections', form);
    setForm({ title: '', description: '' });
    setMessage('Election created');
    load();
  };

  const updateStatus = async (id, action) => {
    await api.patch(`/elections/${id}/${action}`);
    load();
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <form className="card card-body mb-3" onSubmit={createElection}>
        <h5>Create Election</h5>
        <input className="form-control mb-2" value={form.title} placeholder="Election Title" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="form-control mb-2" value={form.description} placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn btn-dark w-auto">Create</button>
      </form>
      <h5>Elections</h5>
      {elections.map((election) => (
        <div className="card card-body mb-2" key={election._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{election.title}</strong> <span className="badge text-bg-secondary">{election.status}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={() => updateStatus(election._id, 'activate')}>Activate</button>
              <button className="btn btn-danger btn-sm" onClick={() => updateStatus(election._id, 'close')}>Close</button>
            </div>
          </div>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminDashboardPage;
