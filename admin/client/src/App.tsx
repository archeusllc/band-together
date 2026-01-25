import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EnvironmentProvider } from './contexts/EnvironmentContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Tracks } from './pages/Tracks';
import { Tags } from './pages/Tags';
import { Import } from './pages/Import';

export const App = () => {
  return (
    <BrowserRouter>
      <EnvironmentProvider>
        <AuthProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tracks"
            element={
              <ProtectedRoute>
                <Tracks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tags"
            element={
              <ProtectedRoute>
                <Tags />
              </ProtectedRoute>
            }
          />
          <Route
            path="/import"
            element={
              <ProtectedRoute>
                <Import />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </AuthProvider>
      </EnvironmentProvider>
    </BrowserRouter>
  );
};
