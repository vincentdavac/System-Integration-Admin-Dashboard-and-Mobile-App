import CardDataStats from '../../../components/CardDataStats';
import { IdCardLanyard, FolderOpen, Handshake, Wallet } from 'lucide-react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import ChartOne from '../../../components/Charts/ChartOne';
import ChartTwo from '../../../components/Charts/ChartTwo';

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

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">{/* <TableOne /> */}</div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};
export default Dashboard;
