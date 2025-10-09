import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AlertsContainerRef } from '../components/Alert/AlertsContainer';

interface UserRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileUserRoute = ({ children }: UserRouteProps) => {
  const { token } = useContext(AppContext)!;

  if (token) {
    return <Navigate to="/mobile/home" replace />;
  }

  return <>{children}</>;
};

export default MobileUserRoute;
