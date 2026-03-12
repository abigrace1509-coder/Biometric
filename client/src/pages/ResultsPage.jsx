import { useEffect, useState } from 'react';
import api from '../services/api';
import ResultChart from '../components/ResultChart';

const ResultsPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/results/live').then((res) => setData(res.data)).catch((err) => setError(err.response?.data?.message || 'Unable to load results'));
  }, []);

  if (error) return <div className="container"><p className="text-danger">{error}</p></div>;
  if (!data) return <div className="container"><p>Loading results...</p></div>;

  return (
    <div className="container">
      <h2>Results Page</h2>
      <p>Election: <strong>{data.election.title}</strong></p>
      {data.winner && <div className="alert alert-info">Current Winner: {data.winner.name}</div>}
      <ResultChart results={data.results} />
    </div>
  );
};

export default ResultsPage;
