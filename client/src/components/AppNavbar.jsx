import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">BioVote</Link>
        <div className="d-flex align-items-center gap-2">
          {user && <span className="text-light small">{user.name} ({user.role})</span>}
          {user ? (
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/admin/login">Admin</Link>
              <Link className="btn btn-primary btn-sm" to="/voter/login">Voter</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
