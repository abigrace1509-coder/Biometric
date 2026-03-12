import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/unauthorized" replace />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
