import CardDataStats from '../../../components/CardDataStats';
import { IdCardLanyard, FolderOpen, Handshake, Wallet } from 'lucide-react';
import { AlertsContainerRef } from '../../../components/Alert/AlertsContainer';
import ChartOne from '../../../components/Charts/ChartOne';
import ChartTwo from '../../../components/Charts/ChartTwo';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext'; // Adjust path as needed

interface DashboardProps {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

interface DashboardData {
  users: {
    count: number;
    rating: number;
    target: number;
  };
  leaveRequestsApprovedThisWeek: {
    count: number;
    rating: number;
    total: number;
  };
  employeeRelationsThisWeek: {
    count: number;
    rating: number;
    target: number;
  };
  loanApprovalsApprovedThisWeek: {
    count: number;
    rating: number;
    total: number;
  };
}

const Dashboard = ({ alertsRef }: DashboardProps) => {
  const { token } = useContext(AppContext)!;
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  async function fetchDashboardSummary() {
    try {
      setLoading(true);

      const res = await fetch('/api/dashboards/summary', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alertsRef.current?.addAlert(
          'error',
          data.message || 'Failed to fetch dashboard data',
        );
        return;
      }

      if (data.errors) {
        Object.values(data.errors).forEach((messages) => {
          (messages as string[]).forEach((msg) => {
            alertsRef.current?.addAlert('error', msg);
          });
        });
        console.log(data.errors);
      } else {
        console.log(data);
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      alertsRef.current?.addAlert(
        'error',
        'An error occurred while fetching dashboard data',
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Registered Emplooyes"
          total={dashboardData.users.count.toString()}
          rate={`${dashboardData.users.rating} %`}
          levelUp
        >
          <IdCardLanyard />
        </CardDataStats>

        <CardDataStats
          title="Leave Request Approved"
          total={dashboardData.leaveRequestsApprovedThisWeek.count.toString()}
          rate={`${dashboardData.leaveRequestsApprovedThisWeek.rating}%`}
          levelUp
        >
          <FolderOpen />
        </CardDataStats>

        <CardDataStats
          title="Employee Relations"
          total={dashboardData.employeeRelationsThisWeek.count.toString()}
          rate={`${dashboardData.employeeRelationsThisWeek.rating}%`}
          levelUp
        >
          <Handshake />
        </CardDataStats>

        <CardDataStats
          title="Loan Approvals"
          total={dashboardData.loanApprovalsApprovedThisWeek.count.toString()}
          rate={`${dashboardData.loanApprovalsApprovedThisWeek.rating}%`}
          levelUp
        >
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
