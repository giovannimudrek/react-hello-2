import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // While restoring session from localStorage, render nothing
  if (isLoading) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
