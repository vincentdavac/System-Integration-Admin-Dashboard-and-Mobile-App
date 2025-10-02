import React, { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { AppContext } from '../../context/AppContext'; // Adjust path as needed
import TableLoader from '../../common/Loader/TableLoader';

interface ChartData {
  labels: string[];
  attendance: number[];
  leaveRequests: number[];
}

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

type ChartType = 'day' | 'week' | 'month';

const ChartOne: React.FC = () => {
  const { token } = useContext(AppContext)!;
  const [selectedType, setSelectedType] = useState<ChartType>('day');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Employee Attendance',
        data: [],
      },
      {
        name: 'Employee Leave Request',
        data: [],
      },
    ],
  });
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    fetchChartData(selectedType);
  }, [selectedType]);

  const fetchChartData = async (type: ChartType) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/dashboards/chart-one?type=${type}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await res.json();

      if (!res.ok) {
        console.error('Failed to fetch chart data:', response.message);
        return;
      }

      const chartData: ChartData = response.data;

      // Update chart series
      setState({
        series: [
          {
            name: 'Employee Attendance',
            data: chartData.attendance,
          },
          {
            name: 'Employee Leave Request',
            data: chartData.leaveRequests,
          },
        ],
      });

      // Update labels
      setLabels(chartData.labels);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: ChartType) => {
    setSelectedType(type);
  };

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
    },
  };

  const getDateRange = () => {
    if (labels.length === 0) return '';
    return `${labels[0]} - ${labels[labels.length - 1]}`;
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Employee Attendance</p>
              <p className="text-sm font-medium">{getDateRange()}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Employee Leave</p>
              <p className="text-sm font-medium">{getDateRange()}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className={`rounded py-1 px-3 text-xs font-medium ${
                selectedType === 'day'
                  ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                  : 'text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark'
              }`}
              onClick={() => handleTypeChange('day')}
              disabled={loading}
            >
              Day
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium ${
                selectedType === 'week'
                  ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                  : 'text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark'
              }`}
              onClick={() => handleTypeChange('week')}
              disabled={loading}
            >
              Week
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium ${
                selectedType === 'month'
                  ? 'bg-white text-black shadow-card dark:bg-boxdark dark:text-white'
                  : 'text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark'
              }`}
              onClick={() => handleTypeChange('month')}
              disabled={loading}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div>
            <TableLoader />
          </div>
        ) : (
          <div id="chartOne" className="-ml-5">
            <ReactApexChart
              options={options}
              series={state.series}
              type="area"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartOne;
