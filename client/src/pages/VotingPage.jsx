import { useEffect, useState } from 'react';
import api from '../services/api';

const VotingPage = () => {
  const [state, setState] = useState({ candidates: [], hasVoted: false, election: null, message: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const status = await api.get('/votes/status');
        const election = status.data.election;
        if (!election) return setState((s) => ({ ...s, message: 'No active election right now.' }));
        const candidates = await api.get(`/candidates/election/${election._id}`);
        setState((s) => ({ ...s, hasVoted: status.data.hasVoted, election, candidates: candidates.data }));
      } catch (error) {
        setState((s) => ({ ...s, message: error.response?.data?.message || 'Failed to load election' }));
      }
    };
    load();
  }, []);

  const castVote = async (candidateId) => {
    try {
      await api.post('/votes', { candidateId });
      setState((s) => ({ ...s, hasVoted: true, message: 'Vote cast successfully. Confirmation has been recorded.' }));
    } catch (error) {
      setState((s) => ({ ...s, message: error.response?.data?.message || 'Vote failed' }));
    }
  };

  return (
    <div className="container">
      <h2>Voting Page</h2>
      {state.election && <p>Active Election: <strong>{state.election.title}</strong></p>}
      {state.hasVoted && <div className="alert alert-success">You already voted. Thank you!</div>}
      <div className="row g-3">
        {state.candidates.map((candidate) => (
          <div className="col-md-6" key={candidate._id}>
            <div className="card card-body">
              <h5>{candidate.name}</h5>
              <p className="mb-1"><small>{candidate.department}</small></p>
              <p>{candidate.manifesto}</p>
              <button className="btn btn-primary" disabled={state.hasVoted} onClick={() => castVote(candidate._id)}>Vote</button>
            </div>
          </div>
        ))}
      </div>
      {state.message && <p className="mt-3">{state.message}</p>}
    </div>
  );
};

export default VotingPage;
