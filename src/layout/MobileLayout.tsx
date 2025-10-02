import { Outlet } from 'react-router-dom';
import MobileButton from '../pages/MobileApplication/Button/MobileButton';
import { AlertsContainerRef } from '../components/Alert/AlertsContainer';

interface MobileLayoutProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const MobileLayout = ({ alertsRef }: MobileLayoutProps) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="">
              <Outlet />
            </div>

            <MobileButton />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
