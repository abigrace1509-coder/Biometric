import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import VoterRegistrationPage from './pages/VoterRegistrationPage';
import VoterLoginPage from './pages/VoterLoginPage';
import BiometricVerificationPage from './pages/BiometricVerificationPage';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

const App = () => (
  <>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/voter/register" element={<VoterRegistrationPage />} />
      <Route path="/voter/login" element={<VoterLoginPage />} />
      <Route path="/voter/verify" element={<ProtectedRoute role="voter"><BiometricVerificationPage /></ProtectedRoute>} />
      <Route path="/voter/vote" element={<ProtectedRoute role="voter"><VotingPage /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute role="admin"><ResultsPage /></ProtectedRoute>} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </>
);

export default App;
