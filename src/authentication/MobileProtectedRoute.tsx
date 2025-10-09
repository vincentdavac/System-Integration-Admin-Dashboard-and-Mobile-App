// ProtectedRoute.tsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AlertsContainerRef } from '../components/Alert/AlertsContainer';

interface ProtectedRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AppContext)!;

  if (!user) {
    return <Navigate to="/mobile/login" replace />;
  }
  return <>{children}</>;
};

export default MobileProtectedRoute;
