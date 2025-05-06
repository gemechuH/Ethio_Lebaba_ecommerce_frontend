import React from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'
import UserStats from './UserStats'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


// ... existing imports ...

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);
  console.log(stats)

  if (isLoading) return <div className='text-center text-gray-500'>Loading....</div>;
  if (!stats) return <div className='text-center'>no data available</div>;

  const data = {
    labels: ["Total Payments", "Total Orders", "Total Products"],
    datasets: [
      {
        label: "User Statistics",
        data: [
          stats.stats.totalSpent  || 0,
          stats.stats.totalOrders * 10 || 0,
          stats.stats.recentOrders?.reduce((total, order) => total + order.products.length, 0) * 10 || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
     
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0 && context.dataIndex === 0) {
              label += `$${context.raw.toFixed(2)}`;
            } else {
              label += context.raw;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, values) {
            if (this.chart.getDatasetMeta(0).data[0] === this.chart.getDatasetMeta(0).data[index]) {
              return '$' + value.toFixed(2);
            }
            return value;
          }
        }
      }
    }
  };

  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-semibold">User Dashboard</h1>
        <p className="text-gray-500">
          Hello <strong>{user?.userName},</strong> Welcome to your dashboard
        </p>
      </div>
      <div className="mt-6">
        {" "}
        <UserStats stats={stats?.stats} />
      </div>
      <div className="mt-6 h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserDMain;
