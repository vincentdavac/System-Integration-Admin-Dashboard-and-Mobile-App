import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AlertsContainerRef } from '../components/Alert/AlertsContainer';

interface UserRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const UserRoute = ({ children }: UserRouteProps) => {
  const { user } = useContext(AppContext)!;

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default UserRoute;
