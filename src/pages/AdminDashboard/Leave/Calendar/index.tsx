import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { AlertsContainerRef } from '../../../../components/Alert/AlertsContainer';
import API_BASE_URL from '../../../../config/api';
import { AppContext } from '../../../../context/AppContext';

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef>;
}

interface LeaveCountResponse {
  month: number;
  year: number;
  days: Record<string, number>;
}

const LeaveCalendar = ({ alertsRef }: Props) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [leaveCounts, setLeaveCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);

  const { user, token } = useContext(AppContext)!;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Fetch approved leave counts from backend
  const fetchLeaveCounts = async (month: number, year: number) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/leaves/approved-count-by-day/?month=${
          month + 1
        }&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      const data: LeaveCountResponse = await response.json();

      if (response.ok && data.days) {
        const parsedCounts: Record<number, number> = {};
        Object.entries(data.days).forEach(([day, count]) => {
          parsedCounts[parseInt(day)] = count;
        });
        setLeaveCounts(parsedCounts);
      } else {
        console.error('Failed to fetch leave data:', data);
      }
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveCounts(selectedMonth, year);
  }, [selectedMonth, year]);

  const handleMonthChange = (e: any) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Generate calendar structure dynamically
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(year, selectedMonth, 1).getDay();
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

    const days: JSX.Element[] = [];

    // Add empty cells before the 1st day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <td
          key={`empty-${i}`}
          className="border border-stroke p-4 text-center dark:text-white"
        ></td>,
      );
    }

    // Add each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const count = leaveCounts[day] ?? 0;
      days.push(
        <td
          key={day}
          className={`border border-stroke p-4 text-center ${
            count > 0
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 font-semibold'
              : 'text-gray-800 dark:text-white'
          }`}
        >
          <div>{day}</div>
          {count > 0 && (
            <div className="text-xs text-green-700 dark:text-green-300">
              {count} on leave
            </div>
          )}
        </td>,
      );
    }

    // Break into weeks (rows of 7 days)
    const weeks: JSX.Element[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <tr key={i} className="grid grid-cols-7">
          {days.slice(i, i + 7)}
        </tr>,
      );
    }

    return weeks;
  };

  return (
    <>
      <Breadcrumb pageName="Leave Calendar" />

      <div className="w-full">
        {/* ===== Dropdown for Month Selection ===== */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Approved Leave Requests
          </h2>

          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rounded-md border border-stroke bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 dark:bg-boxdark dark:text-white"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* ===== Calendar Section ===== */}
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {loading ? (
            <div className="p-6 text-center text-gray-600 dark:text-white">
              Loading Calenda Data...
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="grid grid-cols-7 rounded-t-sm bg-green-600 text-white">
                  {[
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ].map((day, i) => (
                    <th
                      key={i}
                      className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5"
                    >
                      <span className="hidden lg:block">{day}</span>
                      <span className="block lg:hidden">{day.slice(0, 3)}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>{generateCalendarDays()}</tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveCalendar;
