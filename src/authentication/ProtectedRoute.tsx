// ProtectedRoute.tsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AlertsContainerRef } from '../components/Alert/AlertsContainer';

interface ProtectedRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AppContext)!; // 👈 also read loading

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
