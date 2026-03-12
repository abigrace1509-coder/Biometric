import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="container">
    <div className="p-5 mb-4 bg-light rounded-3">
      <h1>Biometric-Based Secure Online Voting System</h1>
      <p>One person - one vote with JWT security and biometric verification.</p>
      <div className="d-flex gap-2">
        <Link className="btn btn-primary" to="/voter/register">Register as Voter</Link>
        <Link className="btn btn-outline-secondary" to="/voter/login">Voter Login</Link>
      </div>
    </div>
  </div>
);

export default HomePage;
