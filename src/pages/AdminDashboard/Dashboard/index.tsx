import CardDataStats from '../../../components/CardDataStats';
import { IdCardLanyard, FolderOpen, Handshake, Wallet } from 'lucide-react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';

interface DashboardProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

const Dashboard = ({ alertsRef }: DashboardProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Employees" total=" 24 " rate="0.43%" levelUp>
          <IdCardLanyard />
        </CardDataStats>

        <CardDataStats title="Leave Approval" total=" 10 " rate="0.43%" levelUp>
          <FolderOpen />
        </CardDataStats>
        <CardDataStats
          title="Employee Relations"
          total=" 10 "
          rate="0.43%"
          levelUp
        >
          <Handshake />
        </CardDataStats>

        <CardDataStats title="Loan Approval" total=" 10 " rate="0.43%" levelUp>
          <Wallet />
        </CardDataStats>
      </div>
    </>
  );
};
export default Dashboard;
